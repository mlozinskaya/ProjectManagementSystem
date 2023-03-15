import React, { Component, useState } from "react";
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import * as actions from "../actions"
import AdminSideBar from "../../Main/AdminSideBar";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";


class CreateProjectForm extends Component {

    handleSaveProject(e) {
        e.preventDefault();
    }

    renderContent() {
        const { project } = this.props.adminPage;

        return <div className="project-form-container">
            <h4> Создать проект </h4>
            <Form onSubmit={this.handleSaveProject}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <Input
                        type="text" className="form-control"
                        name="name" value={project.name}
                        onChange={(v) => this.props.actions.setProjectName(v.target.value)}
                    />
                </div>

                <div className="form-group">
                    <button className="btn btn-primary btn-block">Save</button>
                </div>
            </Form>
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
    const { auth, session, adminPage } = state;

    return {
        auth, session, adminPage
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
)(CreateProjectForm)