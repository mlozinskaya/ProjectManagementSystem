import React, { Component, useState } from "react";
import { bindActionCreators } from 'redux'
import * as acts from "./actions"
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTableList } from '@fortawesome/free-solid-svg-icons'
import { faScroll, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons'
import DropdownWithSearch from "../Elements/DropdownWithSearch";

class SideBar extends Component {

    componentDidMount() {
        console.log(this.props)
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

        return <div>
            <div className="sidebar-dropdown">
                <DropdownWithSearch values={session.projects} selected={selectedProject}
                    onClick={this.handleSelectProject.bind(this)}
                />
            </div>

            <hr className="sidebar-separate-line"/>

            <div className="sidebar-links">
                <Link to={"/"} className="nav-link">
                    <FontAwesomeIcon icon={faTableList}/>
                    <span style={{ marginLeft: 20 }}>Backlog</span>
                </Link>

                <Link to={"/"} className="nav-link">
                    <FontAwesomeIcon icon={faScroll} />
                    <span style={{ marginLeft: 20 }}>Dashboard</span>
                </Link>

                <Link to={"/"} className="nav-link">
                    <FontAwesomeIcon icon={faStarHalfStroke} />
                    <span style={{ marginLeft: 20 }}>Control panel</span>
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
)(SideBar)
