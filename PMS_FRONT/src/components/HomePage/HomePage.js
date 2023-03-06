import React, { Component, useState } from "react";
import * as actions from "./actions"
import { connect } from "react-redux";

import Form from 'react-bootstrap/Form';


class HomePage extends Component {

    render() {
        return <div>abcde</div>
    }
}

const mapStateToProps = state => ({
    state: state.homeReducer
});

export default connect(
    mapStateToProps, 
    {actions}
)(HomePage)
