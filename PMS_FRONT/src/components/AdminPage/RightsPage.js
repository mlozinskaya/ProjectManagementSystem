import React, { Component } from "react";
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import * as actions from "./actions"
import AdminSideBar from "../Main/AdminSideBar";


class RightsPage extends Component {

    renderContent() {
        return <div className="admin-page-container">
            <h4> Доступы </h4>
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
    const { auth, session } = state;

    return {
        auth,
        session
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
)(RightsPage)