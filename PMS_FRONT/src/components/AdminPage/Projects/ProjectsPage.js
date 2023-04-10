import React, { Component } from "react";
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import * as actions from "../actions"
import * as workspaceActions from "../../WorkSpacePage/actions"
import AdminSideBar from "../../Main/AdminSideBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faPen, faTrash, faEye } from '@fortawesome/free-solid-svg-icons'

class ProjectsPage extends Component {
    componentDidMount() {
        this.props.actions.getProjects();
    }

    handleOnClickTrash(item) {
        const workspaceSelectedProject = this.props.workspace.selectedProject;

        if (item && item.id) {
            if (window.confirm("Вы действительно хотите удалить проект \"" + item.name + "\"?")) {
                this.props.actions.removeProject(item);
            }
        }

        if (workspaceSelectedProject === item.name) {
            this.props.workspaceActions.clearSelectedProject();
            localStorage.removeItem("lastSelectedProjectId");
        }
    }

    handleOpenProjectForm(mode, item) {
        const url = "/admin/projects/" + mode;

        if (mode === "read" || mode === "edit") {
            this.props.actions.setOpenedProject(item);
        }

        this.props.history.replace(url);
    }

    renderManageButtons(item) {
        const buttons = [];

        buttons.push(
            <span onClick={this.handleOpenProjectForm.bind(this, "edit", item)}>
                <FontAwesomeIcon icon={faPen} />
            </span>
        )

        buttons.push(
            <span onClick={this.handleOpenProjectForm.bind(this, "read", item)}>
                <FontAwesomeIcon icon={faEye} />
            </span>
        )

        buttons.push(
            <span onClick={this.handleOnClickTrash.bind(this, item)}>
                <FontAwesomeIcon icon={faTrash} />
            </span>
        )

        return buttons;
    }

    renderCreateButton() {
        return <button type="button" class="btn btn-primary"
            onClick={this.handleOpenProjectForm.bind(this, "create")}>
            <span>
                <FontAwesomeIcon icon={faPlusCircle} className="link-icon" />
                <span>Создать проект</span>
            </span>
        </button>
    }

    renderProjects() {
        const { projects } = this.props.adminPage;
        let tableRows = [];

        projects.forEach(item => {
            tableRows.push(
                <div className="project-row">
                    <div>{item.name}</div>

                    <span className="manage-btns-container">
                        {this.renderManageButtons(item)}
                    </span>
                </div>
            )

            tableRows.push(<hr className="separate-line" />)
        })

        return tableRows;
    }

    renderContent() {
        return <div className="admin-page-container">
            <div className="admin-page-title-container">
                <div className="admin-page-label"> Проекты </div>
                <div>{this.renderCreateButton()}</div>
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