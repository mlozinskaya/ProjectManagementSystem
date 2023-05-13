import React, { Component } from "react";
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import * as workspaceActions from "./actions"

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVial, faTh, faStarHalfStroke, faSortAmountUpAlt, faVoteYea, faBalanceScaleLeft } from '@fortawesome/free-solid-svg-icons'
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

    getClassName(baseUrl){
        if (window.location.href.includes(baseUrl)) {
            return "nav-link link-container side-bar-tab-selected";
        } else {
            return "nav-link link-container"
        }
    }

    render() {
        const { workspace } = this.props;

        const confluenceUrl = "/confluence";
        const backlogUrl = "/backlog";
        const dashboardUrl = "/dashboard";
        const controlPanelUrl = "/controlPanel";
        const testingUrl = "/testing";

        return <div className="side-bar-container">
            <div className="sidebar-dropdown">
                <DropdownWithSearch values={workspace.projects} selected={workspace.selectedProject}
                    onClick={this.handleSelectProject.bind(this)}
                />
            </div>

            <hr className="sidebar-separate-line" />

            <div className="sidebar-links">

                <Link to={confluenceUrl} className={this.getClassName(confluenceUrl)}>
                    <FontAwesomeIcon icon={faStarHalfStroke} className="link-icon sidebar-row" />
                    <span>Справочник</span>
                </Link>

                <Link to={backlogUrl} className={this.getClassName(backlogUrl)}>
                    <FontAwesomeIcon icon={faSortAmountUpAlt} className="link-icon sidebar-row" />
                    <span>Очередь задач</span>
                </Link>

                <Link to={dashboardUrl} className={this.getClassName(dashboardUrl)}>
                    <FontAwesomeIcon icon={faTh} className="link-icon sidebar-row" />
                    <span>Панель задач</span>
                </Link>

                <Link to={testingUrl} className={this.getClassName(testingUrl)}>
                    <FontAwesomeIcon icon={faVial} className="link-icon sidebar-row" />
                    <span>Тестирование</span>
                </Link>

                <Link to={controlPanelUrl} className={this.getClassName(controlPanelUrl)}>
                    <FontAwesomeIcon icon={faVoteYea} className="link-icon sidebar-row" />
                    <span>Релизы</span>
                </Link>

                <Link to={controlPanelUrl} className={this.getClassName(controlPanelUrl)}>
                    <FontAwesomeIcon icon={faBalanceScaleLeft} className="link-icon sidebar-row" />
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
