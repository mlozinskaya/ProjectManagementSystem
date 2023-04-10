import React, { Component } from "react";
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import * as actions from "../actions"
import AdminSideBar from "../../Main/AdminSideBar";


class UsersPage extends Component {

    componentDidMount() {
        this.props.actions.getUsers();
    }

    renderUsers() {
        const { users } = this.props.adminPage;
        let rows = [];
        users.forEach(item => {
            rows.push(
                <div>
                    <div>{item.name}</div>
                </div>
            )

            rows.push(<hr className="separate-line" />)
        })

        return rows;
    }

renderContent() {
        return <div className="admin-page-container">
            <div className="admin-page-title-container">
                <div className="admin-page-label"> Участники </div>
            </div>

            <div style={{ marginTop: "20px" }}></div>
            <hr className="title-separate-line" />
            <br />
            <hr className="separate-line" />
            {this.renderUsers()}
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
    const { auth, adminPage } = state;

    return {
        auth,
        adminPage
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
)(UsersPage)