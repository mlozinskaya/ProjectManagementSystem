import React, { Component } from "react";
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";

import * as actions from "./actions"
import WorkspaceSideBar from "../WorkspaceSideBar";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faPen, faTrash, faEye } from '@fortawesome/free-solid-svg-icons'

class BacklogPage extends Component {
    componentDidMount() {
        this.props.actions.getBacklogTasks();
    }

    getSelectedProject() {
        return this.props.project;
    }

    handleOpenTaskForm(url){
        this.props.history.replace(url);
    }

    handleOnClickTrash(){

    }

    renderManageButtons() {
        const buttons = [];

        const baseUrl = "/" + this.getSelectedProject() + "/backlog";

        buttons.push(
            <span onClick={this.handleOpenTaskForm.bind(this, baseUrl + "/edit")}>
                <FontAwesomeIcon icon={faPen} className="action-icon-btn" disabled />
            </span>
        )
        buttons.push(<span onClick={this.handleOpenTaskForm.bind(this, baseUrl + "/read")}>
            <FontAwesomeIcon icon={faEye} className="action-icon-btn" />
        </span>)

        buttons.push(<span onClick={this.handleOnClickTrash.bind(this)}>
            <FontAwesomeIcon icon={faTrash} className="action-icon-btn" />
        </span>)

        buttons.push(<button type="button" class="btn btn-primary" 
                onClick={this.handleOpenTaskForm.bind(this, baseUrl + "/add")}>
            <span>
                <FontAwesomeIcon icon={faPlusCircle} className="link-icon" />
                <span>Добавить задачу</span>
            </span>
        </button>)

        return buttons;
    }

    renderTasks(){
        const { tasks } = this.props.backlog;
    }

    renderContent() {
        return <div className="backlog-page-container">
            <div className="backlog-page-title-container">
                <div className="backlog-page-label"> Задачи </div>
                <div>
                    {this.renderManageButtons()}
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
    const { auth, backlog } = state;

    return {
        auth,
        backlog
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