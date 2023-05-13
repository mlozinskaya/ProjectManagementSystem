import React, { Component } from "react";
import { bindActionCreators } from 'redux'
import * as actions from "./actions"
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'


class AdminSideBar extends Component {


    render() {

        return <div className="side-bar-container">
            <hr className="sidebar-separate-line" />

            <div className="sidebar-links">

                <Link to={"/admin/projects"} className="nav-link link-container">
                    <FontAwesomeIcon icon={icon({ name: 'table-list', style: 'solid' })}
                        className="link-icon sidebar-row" />
                    <span>Проекты</span>
                </Link>

                <Link to={"/admin/users"} className="nav-link link-container">
                    <FontAwesomeIcon icon={icon({ name: 'user', style: 'solid' })}
                        className="link-icon sidebar-row" />
                    <span>Пользователи</span>
                </Link>

                <Link to={"/admin/rights"} className="nav-link link-container">
                    <FontAwesomeIcon icon={icon({ name: 'scroll', style: 'solid' })}
                        className="link-icon sidebar-row" />
                    <span>Справочник</span>
                </Link>

                <Link to={"/admin/rights"} className="nav-link link-container">
                    <FontAwesomeIcon icon={icon({ name: 'vial', style: 'solid' })}
                        className="link-icon sidebar-row" />
                    <span>Тестирование</span>
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
