import React, { Component, useState } from "react";
import * as actions from "./actions"
import { connect } from "react-redux";

import Form from 'react-bootstrap/Form';
import WorkspaceSideBar from "../Main/WorkspaceSideBar";


class HomePage extends Component {

    renderContent(){
        return <div> abcde </div>
    }

    render() {
        return <div className="page-container">
            <WorkspaceSideBar/>
            {this.renderContent()}
        </div>
    }
}

const mapStateToProps = state => ({
    state: state.homeReducer
});

export default connect(
    mapStateToProps, 
    {actions}
)(HomePage)
