import React, { Component, useState } from "react";
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import * as actions from "../actions"
import AdminSideBar from "../../Main/AdminSideBar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faPen, faTrash, faEye, faRotateRight } from '@fortawesome/free-solid-svg-icons'

class ProjectsPage extends Component {
    componentDidMount() {
        this.props.actions.getProjects();
    }

    handleOnClickProject(project) {
        this.props.actions.setSelectedProject(project);
    }

    renderManageButtons() {
        const buttons = [];
        buttons.push(
            <Link to={"/admin/projects/create"}>
                <FontAwesomeIcon icon={faPlusCircle} className="action-icon-btn"/>
            </Link>
        )
        buttons.push(
            <Link to={"/admin/projects/create"}>
                <FontAwesomeIcon icon={faPen} className="action-icon-btn"/>
            </Link>
        )
        buttons.push(<Link to={"/admin/projects/create"}>
            <FontAwesomeIcon icon={faTrash} className="action-icon-btn"/>
        </Link>)
        buttons.push(<Link to={"/admin/projects/create"} >
            <FontAwesomeIcon icon={faEye} className="action-icon-btn"/>
        </Link>)
        buttons.push(<Link to={"/admin/projects/create"} >
            <FontAwesomeIcon icon={faRotateRight} className="action-icon-btn"/>
        </Link>)
        return buttons;
    }

    renderProjects() {
        const projects = this.props.adminPage.projects;
        let tableRows = [];

        projects.forEach(item => {
            let itemClassName = "project-row";
            if (item === this.props.adminPage.selectedProject) {
                itemClassName += " row-selected";
            }
            tableRows.push(<div className={itemClassName} onClick={() => this.handleOnClickProject(item)}>{item.name}</div>)
            tableRows.push(<hr className="separate-line" />)
        })

        return tableRows;
    }

    renderContent() {
        return <div className="admin-page-container">
            <div className="admin-page-title-container">
                <div className="admin-page-label"> Проекты </div>
                <button type="button" class="btn btn-primary">
                    <Link to={"/admin/projects/create"} className="">
                        <FontAwesomeIcon icon={faPlusCircle} className="link-icon" />
                        <span>Создать проект</span>
                    </Link>
                </button>
            </div>

            <div style={{ marginTop: "20px" }}></div>
            <hr className="title-separate-line" />
            {this.renderManageButtons()}
            <br/>
            <br/>
            <hr className="separate-line" />
            {this.renderProjects()}
        </div>
    }

    render() {
        return <div className="page-container">
            <AdminSideBar />
            {this.renderContent()}
        </div>
    }
}

function mapStateToProps(state) {
    const { auth, session, adminPage } = state;

    return {
        auth,
        session,
        adminPage
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectsPage)