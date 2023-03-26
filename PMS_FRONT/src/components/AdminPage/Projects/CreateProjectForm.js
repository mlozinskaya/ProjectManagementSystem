import React, { Component, useState } from "react";
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import * as actions from "../actions"
import AdminSideBar from "../../Main/AdminSideBar";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";


class CreateProjectForm extends Component {

    getFormMode() {
        return this.props.adminPage.submitFormMode;
    }

    handleSaveProject(e) {
        e.preventDefault();

        const { project } = this.props.adminPage;
        this.props.actions.saveProject(project);
    }

    handleCancel(e) {
        e.preventDefault();
        this.props.history.replace("/admin/projects")
        this.props.actions.clearEditProjectForm();
        this.props.actions.clearSelectedProject();
    }

    renderContent() {
        const { project } = this.props.adminPage;
        const mode = this.getFormMode();
        const title = mode === "CREATE" ? "Создать проект" : (mode == "READ" ? "Просмотреть" : "Изменить") + " информацию о проекте";
        const disabled = mode === "READ";

        return <div className="project-form-container">
            <h4> {title} </h4>
            <hr className="title-separate-line" />
            <Form onSubmit={this.handleSaveProject.bind(this)}>
                <div className="form-group create-project-input-row">
                    <label htmlFor="proj-name" className="create-project-input-label">Название проекта</label>
                    <Input
                        disabled={disabled}
                        type="text" className="form-control"
                        name="proj-name" value={project.name}
                        onChange={(v) => this.props.actions.setProjectName(v.target.value)}
                    />
                </div>

                <div className="form-group create-project-input-row">
                    <label htmlFor="proj-key" className="create-project-input-label">Ключ проекта</label>
                    <Input
                        disabled={disabled}
                        type="text" className="form-control"
                        name="proj-key" value={project.key}
                        onChange={(v) => this.props.actions.setProjectKey(v.target.value)}
                    />
                </div>

                <div className="form-group create-project-input-row">
                    <label htmlFor="proj-lead" className="create-project-input-label">Руководитель проекта</label>
                    <Input
                        disabled={disabled}
                        type="text" className="form-control"
                        name="proj-lead" value={project.lead}
                        onChange={(v) => this.props.actions.setProjectLead(v.target.value)}
                    />
                </div>

                <hr className="title-separate-line" />

                <div className="form-group create-project-save-btn-container">
                    {!disabled && <button className="btn btn-secondary create-project-save-btn" type="submit">Сохранить</button>}
                    <button className="btn btn-secondary create-project-save-btn" onClick={this.handleCancel.bind(this)}>Отмена</button>
                </div>
            </Form>
        </div>
    }

    render() {
        this.getFormMode();

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