import React, { Component } from "react";
import { bindActionCreators } from 'redux'
import * as actions from "./actions"
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTableList } from '@fortawesome/free-solid-svg-icons'
import { faScroll, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons'


class AdminSideBar extends Component {


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
)(AdminSideBar)
