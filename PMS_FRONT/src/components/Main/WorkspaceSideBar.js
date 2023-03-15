import React, { Component, useState } from "react";
import { bindActionCreators } from 'redux'
import * as acts from "./actions"
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTableList } from '@fortawesome/free-solid-svg-icons'
import { faScroll, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons'
import DropdownWithSearch from "../Elements/DropdownWithSearch";

class WorkspaceSideBar extends Component {

    componentDidMount() {
        this.props.actions.getProjects();
        const lastSelectedProject = localStorage.getItem("lastSelectedProject");

        if (lastSelectedProject) {
            this.props.actions.setSelectedProject(lastSelectedProject);
        }
    }

    handleSelectProject(project) {
        this.props.actions.setSelectedProject(project);
        localStorage.setItem("lastSelectedProject", project);
    }

    render() {
        const { session } = this.props;
        const selectedProject = session.selectedProject || "Выберите проект";
        const projectNames = session.projects.map(item => item.name);

        return <div className="side-bar-container">
            <div className="sidebar-dropdown">
                <DropdownWithSearch values={projectNames} selected={selectedProject}
                    onClick={this.handleSelectProject.bind(this)}
                />
            </div>

            <hr className="sidebar-separate-line" />

            <div className="sidebar-links">
                
                <Link to={"/"} className="nav-link link-container">
                    <FontAwesomeIcon icon={faStarHalfStroke} className="link-icon" />
                    <span>Confluence</span>
                </Link>

                <Link to={"/"} className="nav-link link-container">
                    <FontAwesomeIcon icon={faTableList} className="link-icon"/>
                    <span>Backlog</span>
                </Link>

                <Link to={"/"} className="nav-link link-container">
                    <FontAwesomeIcon icon={faScroll} className="link-icon"/>
                    <span>Dashboard</span>
                </Link>

                <Link to={"/"} className="nav-link link-container">
                    <FontAwesomeIcon icon={faStarHalfStroke} className="link-icon"/>
                    <span>Control panel</span>
                </Link>
            </div>

        </div>
    }
}

function mapStateToProps(state) {
    const { auth, session } = state;

    return {
        auth,
        session
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(acts, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WorkspaceSideBar)
