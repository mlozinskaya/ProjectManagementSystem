import React, { Component, useState } from "react";
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import * as actions from "../actions"
import * as workspaceActions from "../../WorkSpacePage/actions"
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

    handleOnClickTrash() {
        if (!this.props.adminPage.selectedProject) {
            return;
        }

        const selectedProject = this.props.adminPage.selectedProject;
        const workspaceSelectedProject = this.props.workspace.selectedProject;

        if (selectedProject && selectedProject.id) {
            if (window.confirm("Вы действительно хотите удалить проект \"" + selectedProject.name + "\"?")) {
                this.props.actions.removeProject(selectedProject);
            }
        }

        if (workspaceSelectedProject === selectedProject.name) {
            this.props.workspaceActions.clearSelectedProject();
            localStorage.removeItem("lastSelectedProject");
        }

    }

    handleOpenSubmitForm(mode, url) {
        if ((mode === "EDIT" || mode === "READ") && !this.props.adminPage.selectedProject) {
            return;
        }

        if ((mode === "EDIT" || mode === "READ") && this.props.adminPage.selectedProject) {
            this.props.actions.setProjectForEdit(this.props.adminPage.selectedProject);
        }

        this.props.actions.setSubmitFormMode(mode);
        this.props.history.replace(url);
    }

    renderManageButtons() {
        const buttons = [];

        buttons.push(
            <span onClick={this.handleOpenSubmitForm.bind(this, "EDIT", "/admin/projects/edit")}>
                <FontAwesomeIcon icon={faPen} className="action-icon-btn" disabled />
            </span>
        )
        buttons.push(<span onClick={this.handleOpenSubmitForm.bind(this, "READ", "/admin/projects/read")}>
            <FontAwesomeIcon icon={faEye} className="action-icon-btn" />
        </span>)

        buttons.push(<span onClick={this.handleOnClickTrash.bind(this)}>
            <FontAwesomeIcon icon={faTrash} className="action-icon-btn" />
        </span>)

        buttons.push(<button type="button" class="btn btn-primary" 
                onClick={this.handleOpenSubmitForm.bind(this, "CREATE", "/admin/projects/create")}>
            <span>
                <FontAwesomeIcon icon={faPlusCircle} className="link-icon" />
                <span>Создать проект</span>
            </span>
        </button>)

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
                <div>
                    {this.renderManageButtons()}

                </div>

            </div>

            <div style={{ marginTop: "20px" }}></div>
            <hr className="title-separate-line" />
            <br />
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
    const { auth, adminPage, workspace } = state;

    return {
        auth,
        adminPage,
        workspace
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
        workspaceActions: bindActionCreators(workspaceActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectsPage)