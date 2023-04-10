import React, { Component } from "react";
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import * as workspaceActions from "./actions"

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTableList } from '@fortawesome/free-solid-svg-icons'
import { faScroll, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons'
import DropdownWithSearch from "../Elements/DropdownWithSearch";

import { history } from '../../helpers/history';

class WorkspaceSideBar extends Component {

    componentDidMount() {
        this.props.actions.getProjects();
    }

    componentDidUpdate() {
        const { workspace } = this.props;
        const lastSelectedProjectId = localStorage.getItem("lastSelectedProjectId");

        const isCurrentSelectedProjectEmpty = workspace.selectedProject === null;
        const lastSelectedProject = lastSelectedProjectId ?
            workspace.projects.find(item => item.id === lastSelectedProjectId) : null;

        if (isCurrentSelectedProjectEmpty && lastSelectedProject) {
            this.props.actions.setSelectedProject(lastSelectedProject);
        }
    }

    handleSelectProject(project) {
        this.props.actions.setSelectedProject(project);
        localStorage.setItem("lastSelectedProjectId", project.id);
        history.replace("/backlog");
    }

    render() {
        const { workspace } = this.props;

        const confluenceUrl = "/confluence";
        const backlogUrl = "/backlog";
        const dashboardUrl = "/dashboard";
        const controlPanelUrl = "/controlPanel";

        return <div className="side-bar-container">
            <div className="sidebar-dropdown">
                <DropdownWithSearch values={workspace.projects} selected={workspace.selectedProject}
                    onClick={this.handleSelectProject.bind(this)}
                />
            </div>

            <hr className="sidebar-separate-line" />

            <div className="sidebar-links">

                <Link to={confluenceUrl} className="nav-link link-container">
                    <FontAwesomeIcon icon={faStarHalfStroke} className="link-icon" />
                    <span>Справочник</span>
                </Link>

                <Link to={backlogUrl} className="nav-link link-container">
                    <FontAwesomeIcon icon={faTableList} className="link-icon" />
                    <span>Очередь задач</span>
                </Link>

                <Link to={dashboardUrl} className="nav-link link-container">
                    <FontAwesomeIcon icon={faScroll} className="link-icon" />
                    <span>Панель задач</span>
                </Link>

                <Link to={controlPanelUrl} className="nav-link link-container">
                    <FontAwesomeIcon icon={faStarHalfStroke} className="link-icon" />
                    <span>Тестирование</span>
                </Link>

                <Link to={controlPanelUrl} className="nav-link link-container">
                    <FontAwesomeIcon icon={faStarHalfStroke} className="link-icon" />
                    <span>Релизы</span>
                </Link>

                <Link to={controlPanelUrl} className="nav-link link-container">
                    <FontAwesomeIcon icon={faStarHalfStroke} className="link-icon" />
                    <span>Статистика</span>
                </Link>
            </div>

        </div>
    }
}

function mapStateToProps(state) {
    const { workspace } = state;

    return {
        workspace
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(workspaceActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WorkspaceSideBar)
