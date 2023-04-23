import React, { Component } from "react";
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";

import { faSearch, faClose } from '@fortawesome/free-solid-svg-icons'
import * as actions from "./actions";
import * as cnst from "./constants";
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
        return this.props.workspace.selectedProject;
    }

    handleOpenTaskForm(mode, item) {
        const url = "/backlog/" + mode;

        if (mode === "read" || mode === "edit") {
            this.props.actions.setOpenedTask(item);
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

    handleOnTabClick(itemId) {
        this.props.actions.setViewType(itemId);
    }

    renderViewTabs() {
        const viewType = this.props.backlog.viewType;
        const viewTabs = [];

        cnst.viewTypes.forEach(tab => {
            viewTabs.push(
                <div className={viewType === tab.id ? "selected" : ""}
                    onClick={() => this.handleOnTabClick(tab.id)}>
                    {tab.name}
                </div>
            );
        })

        return viewTabs;
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


    getRowLabelStyle(item) {
        switch (item.type) {
            case "STORY":
                return { color: "blue" }
            case "BUG":
                return { color: "red" }
            case "RESEARCH":
                return { color: "green" }
        }
    }

    renderTasks() {
        const { backlog } = this.props;
        const viewType = this.props.backlog.viewType;

        let rows = [];
        backlog.tasks.forEach(item => {
            if ((!backlog.filter || item.name.startsWith(backlog.filter)) 
            && (backlog.viewType === "ALL" || item.type === backlog.viewType)) {
                rows.push(
                    <div className="backlog-task-row">
                        <div className="backlog-task-row-title">
                            <div className="backlog-task-row-label" style={this.getRowLabelStyle(item)}>
                                {item.type}
                            </div>
                            <div>{item.name}</div>
                        </div>

                        <span className="backlog-task-manage-btns-container">
                            {this.renderManageButtons(item)}
                        </span>
                    </div>
                )
            }
        })

        return rows;
    }

    handleSearchChanged = (e) => {
        this.props.actions.setFilter(e.target.value);
    }

    handleSearchEntered = (event) => {
        if (event.key === 'Enter') {
            console.log("test")
        }
    };

    renderContent() {
        const { backlog } = this.props;

        return <div className="backlog-page-container">

            <div className="backlog-search-row">
                <FontAwesomeIcon icon={faSearch} className="link-icon backlog-search-icon" />
                <input type="text" name="name"
                    value={backlog.filter || ""}
                    className="backlog-search-input-field"
                    placeholder="Найти задачу"
                    onChange={this.handleSearchChanged}
                    onKeyDown={this.handleSearchEntered} />
                <FontAwesomeIcon icon={faClose} className="link-icon backlog-search-icon"
                    onClick={this.props.actions.clearFilter} />
            </div>

            <div className="backlog-page-title-container">
                <div className="backlog-view-tabs">
                    {this.renderViewTabs()}
                </div>
                <div>
                    {this.renderAddButton()}
                </div>
            </div>

            <div className="backlog-tasks-container">
                <div className="backlog-task-main-row">Название</div>
                {this.renderTasks()}
            </div>

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