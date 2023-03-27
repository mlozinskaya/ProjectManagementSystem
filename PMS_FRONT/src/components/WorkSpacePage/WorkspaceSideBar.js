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
        const lastSelectedProject = localStorage.getItem("lastSelectedProject");

        const isCurrentSelectedProjectEmpty = workspace.selectedProject === null;
        const isProjectExists = workspace.projects.find(item => item.name === lastSelectedProject);

        if (isCurrentSelectedProjectEmpty && lastSelectedProject && isProjectExists) {
            this.props.actions.setSelectedProject(lastSelectedProject);
        } 
    }

    handleSelectProject(project) {
        this.props.actions.setSelectedProject(project);
        history.replace("/" + project + "/backlog");
        localStorage.setItem("lastSelectedProject", project);
    }

    render() {
        const { workspace } = this.props;
        const selectedProject = workspace.selectedProject || "Выберите проект";
        const projectNames = workspace.projects.map(item => item.name);

        const confluenceUrl = workspace.selectedProject ? "/" + workspace.selectedProject + "/confluence" : "/"
        const backlogUrl = workspace.selectedProject ? "/" + workspace.selectedProject + "/backlog" : "/"
        const dashboardUrl = workspace.selectedProject ? "/" + workspace.selectedProject + "/dashboard" : "/"
        const controlPanelUrl = workspace.selectedProject ? "/" + workspace.selectedProject + "/controlPanel" : "/"

        return <div className="side-bar-container">
            <div className="sidebar-dropdown">
                <DropdownWithSearch values={projectNames} selected={selectedProject}
                    onClick={this.handleSelectProject.bind(this)}
                />
            </div>

            <hr className="sidebar-separate-line" />

            <div className="sidebar-links">

                <Link to={confluenceUrl} className="nav-link link-container">
                    <FontAwesomeIcon icon={faStarHalfStroke} className="link-icon" />
                    <span>Информация</span>
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
