import React, { Component } from "react";
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";

import * as actions from "./actions"

import WorkspaceSideBar from "../WorkSpacePage/WorkspaceSideBar";


class HomePage extends Component {

    renderContent(){
        return <div> Для начала работы выберите проект</div>
    }

    render() {
        return <div className="page-container">
            <WorkspaceSideBar/>
            {this.renderContent()}
        </div>
    }
}

function mapStateToProps(state) {
    const { workspace } = state;

    return {
        workspace
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
)(HomePage)
