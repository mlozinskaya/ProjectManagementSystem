import React, { Component } from "react";
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";

import * as actions from "./actions"
import WorkspaceSideBar from "../WorkspaceSideBar";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

class BacklogTaskForm extends Component {

    getPageTitle() {
        const { mode } = this.props;

        if (mode === "add") {
            return "Добавить задачу"
        } else if (mode === "read") {
            return "Просмотреть задачу"
        } else if (mode === "edit") {
            return "Изменить задачу"
        }
    }

    isDisabled() {
        return this.props.mode === "read";
    }

    handleSaveTask(e) {
        e.preventDefault();

        const { openedTask } = this.props.backlog;
        const taskForSave = {
            ...openedTask,
            projectId: this.props.workspace.selectedProject.id
        };

        this.props.actions.saveTask(taskForSave);
    }

    handleCancel(e) {
        e.preventDefault();
        this.props.actions.clearOpenedTask();
        this.props.history.replace("/backlog")
    }

    renderContent() {
        const title = this.getPageTitle();
        const disabled = this.isDisabled();
        const task = this.props.backlog.openedTask;

        return <div className="backlog-task-container">
            <h4> {title} </h4>
            <hr className="title-separate-line" />
            <Form onSubmit={this.handleSaveTask.bind(this)}>
                <div className="create-project-input-row">
                    <label htmlFor="task-name" className="create-project-input-label">Название задачи</label>
                    <Input
                        disabled={disabled}
                        type="text" className="form-control"
                        name="task-name" value={task.name}
                        onChange={(v) => this.props.actions.setOpenedTaskName(v.target.value)}
                    />
                </div>
                
                <div className="create-project-input-row">
                    <label htmlFor="task-type" className="create-project-input-label">Тип задачи</label>
                    <Input
                        disabled={disabled}
                        type="text" className="form-control"
                        name="task-type" value={task.type}
                        onChange={(v) => this.props.actions.setOpenedTaskType(v.target.value)}
                    />
                </div>

                <div className="create-project-input-row">
                    <label htmlFor="task-status" className="create-project-input-label">Статус задачи</label>
                    <Input
                        disabled={disabled}
                        type="text" className="form-control"
                        name="task-status" value={task.status}
                        onChange={(v) => this.props.actions.setOpenedTaskStatus(v.target.value)}
                    />
                </div>

                <div className="create-project-input-row">
                    <label htmlFor="task-summary" className="create-project-input-label">Краткое описание</label>
                    <Input
                        disabled={disabled}
                        type="text" className="form-control"
                        name="task-summary" value={task.summary}
                        onChange={(v) => this.props.actions.setOpenedTaskSummary(v.target.value)}
                    />
                </div>

                <div className="create-project-input-row">
                    <label htmlFor="task-description" className="create-project-input-label">Полное описание</label>
                    <Input
                        disabled={disabled}
                        type="text" className="form-control"
                        name="task-description" value={task.description}
                        onChange={(v) => this.props.actions.setOpenedTaskDescription(v.target.value)}
                    />
                </div>

                <hr className="title-separate-line" />

                <div className="form-group create-project-save-btn-container">
                    {!disabled && <button className="btn btn-secondary create-project-save-btn" type="submit">Сохранить</button>}
                    <button className="btn btn-secondary create-project-save-btn" onClick={this.handleCancel.bind(this)}>Отмена</button>
                </div>
            </Form>
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
)(BacklogTaskForm)