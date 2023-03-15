import React, { Component, useState } from "react";
import { bindActionCreators } from 'redux'
import * as acts from "./actions"
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTableList } from '@fortawesome/free-solid-svg-icons'
import { faScroll, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons'
import DropdownWithSearch from "../Elements/DropdownWithSearch";

class AdminSideBar extends Component {

    componentDidMount() {

    }

    render() {

        return <div className="side-bar-container">

            <hr className="sidebar-separate-line" />

            <div className="sidebar-links">

                <Link to={"/admin/projects"} className="nav-link link-container">
                    <FontAwesomeIcon icon={faStarHalfStroke} className="link-icon" />
                    <span>Проекты</span>
                </Link>

                <Link to={"/admin/users"} className="nav-link link-container">
                    <FontAwesomeIcon icon={faTableList} className="link-icon" />
                    <span>Участники</span>
                </Link>

                <Link to={"/admin/rights"} className="nav-link link-container">
                    <FontAwesomeIcon icon={faScroll} className="link-icon" />
                    <span>Доступы</span>
                </Link>

                <Link to={"/admin/rights"} className="nav-link link-container">
                    <FontAwesomeIcon icon={faScroll} className="link-icon" />
                    <span>Оповещения</span>
                </Link>
            </div>

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
        actions: bindActionCreators(acts, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminSideBar)
