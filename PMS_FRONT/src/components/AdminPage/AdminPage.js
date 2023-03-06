import React, { Component, useState } from "react";
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import * as actions from "./actions"



class AdminPage extends Component {

    render() {
        return <div>
            <h4>Панель администратора</h4>
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
)(AdminPage)