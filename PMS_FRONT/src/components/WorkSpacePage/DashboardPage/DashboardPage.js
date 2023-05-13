import React, { Component } from "react";
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";

import * as actions from "./actions"
import WorkspaceSideBar from "../WorkspaceSideBar";
import * as cnst from "../BacklogPage/constants";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

class DashboardPage extends Component {
    componentDidMount() {
        const selectedProject = this.getSelectedProject();

        if (selectedProject) {
            this.props.actions.getDashboardTasks(selectedProject.id);
        }
    }

    getSelectedProject() {
        return this.props.workspace.selectedProject;
    }

    getTypeStyle(task) {
        switch (task.type) {
            case "STORY":
                return { color: "blue" }
            case "BUG":
                return { color: "red" }
            case "RESEARCH":
                return { color: "green" }
        }
    }

    renderTasks() {
        const tasks = [
            { status: "to_do", name: "task1", description: "test des", type: "BUG" },
            { status: "in_progress", name: "task2", description: "some other very very very long description", type: "BUG" },
            { status: "completed", name: "task3", description: "what a wonferful life", type: "STORY" },
            { status: "qa", name: "task4", description: "empty", type: "STORY" },
            { status: "in_progress", name: "task5", description: "123", type: "RESEARCH" },
            { status: "to_do", name: "task6", description: "test test test", type: "RESEARCH" },
        ]

        const toDoTasksArray = [];
        const inProgressTasksArray = [];
        const qaTasksArray = [];
        const completedTasksArray = [];

        tasks.forEach(task => {
            const taskItem = <div className="dashboard-card">
                <div className="dashboard-card-title-type-row">
                    <div className="dashboard-card-title">{task.name}</div>
                    <div className="dashboard-card-type" style={this.getTypeStyle(task)}>
                        {cnst.taskType.find(type => type.id === task.type).name}
                    </div>
                </div>

                <div className="dashboard-card-description">{task.description}</div>

                <div className="dashboard-card-footer-line" />
                <div className="dashboard-card-footer">
                    <div className="dasboard-card-comment-block">
                        <FontAwesomeIcon icon={icon({ name: 'comment-dots', style: 'regular' })}
                            className="dasboard-card-comment-icon" /> 4
                    </div>

                    <div className="dasboard-card-footer-user-block">
                        <img
                            src="https://icon-library.com/images/user-profile-icon/user-profile-icon-24.jpg"
                            className="dashboard-card-user-icon"
                        />
                    </div>

                </div>
            </div>;

            switch (task.status) {
                case "to_do":
                    toDoTasksArray.push(taskItem);
                    break;
                case "in_progress":
                    inProgressTasksArray.push(taskItem);
                    break;
                case "qa":
                    qaTasksArray.push(taskItem);
                    break;
                case "completed":
                    completedTasksArray.push(taskItem);
                    break;
            }
        })


        return <div className="dashboard-cards-container">
            <div>{toDoTasksArray}</div>
            <div>{inProgressTasksArray}</div>
            <div>{qaTasksArray}</div>
            <div>{completedTasksArray}</div>
        </div>
    }

    renderContent() {
        return <div className="dasboard-container">
            <div className="dashboard-columns-titles">
                <div>TO DO</div>
                <div>IN PROGRESS</div>
                <div>QA</div>
                <div>COMPLETED</div>
            </div>

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
    const { auth, backlog, workspace } = state;

    return {
        auth, backlog, workspace
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
)(DashboardPage)