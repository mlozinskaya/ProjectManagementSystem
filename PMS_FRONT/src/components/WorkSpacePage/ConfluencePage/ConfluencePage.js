import React, { Component } from "react";
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";

import * as actions from "./actions"
import * as workspaceActions from "../actions"
import WorkspaceSideBar from "../WorkspaceSideBar";

class ConfluencePage extends Component {
    getSelectedProject() {
        return this.props.project;
    }

    renderContent() {
        const selectedProject = this.getSelectedProject();
        return <div> Confluence. Selected project: {selectedProject} </div>
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
        actions: bindActionCreators(actions, workspaceActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConfluencePage)