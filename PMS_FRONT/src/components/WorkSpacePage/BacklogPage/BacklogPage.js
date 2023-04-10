import React, { Component } from "react";
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";

import * as actions from "./actions"
import WorkspaceSideBar from "../WorkspaceSideBar";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faPen, faTrash, faEye } from '@fortawesome/free-solid-svg-icons'

class BacklogPage extends Component {
    componentDidMount() {
        const selectedProject = this.getSelectedProject();

        if (selectedProject) {
            this.props.actions.getBacklogTasks(selectedProject.id);
        }
    }

    getSelectedProject() {
        return this.props.workspace.selectedProject
    }

    handleOpenTaskForm(mode, item) {
        const url = "/backlog/" + mode;

        if (mode === "read" || mode === "edit") {
            // this.props.actions.setOpenedProject(item);
        }

        this.props.history.replace(url);
    }

    handleOnClickTrash(item) {
        if (item && item.id) {
            if (window.confirm("Вы действительно хотите удалить задачу \"" + item.name + "\"?")) {
                //this.props.actions.removeProject(item);
            }
        }
    }

    renderManageButtons(item) {
        const buttons = [];

        buttons.push(
            <span onClick={this.handleOpenTaskForm.bind(this, "edit", item)}>
                <FontAwesomeIcon icon={faPen} />
            </span>
        )

        buttons.push(
            <span onClick={this.handleOpenTaskForm.bind(this, "read", item)}>
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

    renderAddButton() {
        return <button type="button" class="btn btn-primary"
            onClick={this.handleOpenTaskForm.bind(this, "add")}>
            <span>
                <FontAwesomeIcon icon={faPlusCircle} className="link-icon" />
                <span>Добавить задачу</span>
            </span>
        </button>;
    }

    renderTasks() {
        const { tasks } = this.props.backlog;

        let rows = [];
        tasks.forEach(item => {
            rows.push(
                <div className="backlog-task-row">
                    <div>{item.name}</div>

                    <span className="backlog-task-manage-btns-container">
                        {this.renderManageButtons(item)}
                    </span>
                </div>
            )

            rows.push(<hr className="separate-line" />)
        })

        return rows;
    }

    renderContent() {
        return <div className="backlog-page-container">
            <div className="backlog-page-title-container">
                <div className="backlog-page-label"> Задачи </div>
                <div>
                    {this.renderAddButton()}
                </div>

            </div>

            <div style={{ marginTop: "20px" }}></div>
            <hr className="title-separate-line" />
            <br />
            <hr className="separate-line" />
            {this.renderTasks()}
        </div>
    }

    render() {
        return <div className="page-container">
            <WorkspaceSideBar />
            {this.renderContent()}
        </div>
    }
}

function mapStateToProps(state) {
    const { auth, workspace, backlog } = state;

    return {
        auth, workspace, backlog
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
)(BacklogPage)