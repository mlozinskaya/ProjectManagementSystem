import React, { Component } from "react";
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";
import * as actions from "../actions"
import AdminSideBar from "../../Main/AdminSideBar";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";


class CreateProjectForm extends Component {

    getFormMode() {
        return this.props.mode;
    }

    handleSaveProject(e) {
        e.preventDefault();

        const { openedProject } = this.props.adminPage;
        this.props.actions.saveProject(openedProject);
    }

    handleCancel(e) {
        e.preventDefault();

        this.props.history.replace("/admin/projects")
        this.props.actions.clearOpenedProject();
    }

    getPageTitle(){
        const mode = this.getFormMode();
        const title = mode === "create" ? "Создать проект" : (mode === "read" ? "Просмотреть" : "Изменить") + " информацию о проекте";
        return title;
    }

    isDisabled(){
        const mode = this.getFormMode();
        return mode === "read";
    }

    renderContent() {
        const { openedProject } = this.props.adminPage;
        const title = this.getPageTitle();
        const disabled = this.isDisabled();

        return <div className="project-form-container">
            <h4> {title} </h4>
            <hr className="title-separate-line" />
            <Form onSubmit={this.handleSaveProject.bind(this)}>
                <div className="form-group create-project-input-row">
                    <label htmlFor="proj-name" className="create-project-input-label">Название проекта</label>
                    <Input
                        disabled={disabled}
                        type="text" className="form-control"
                        name="proj-name" value={openedProject.name}
                        onChange={(v) => this.props.actions.setProjectName(v.target.value)}
                    />
                </div>

                <div className="form-group create-project-input-row">
                    <label htmlFor="proj-key" className="create-project-input-label">Ключ проекта</label>
                    <Input
                        disabled={disabled}
                        type="text" className="form-control"
                        name="proj-key" value={openedProject.key}
                        onChange={(v) => this.props.actions.setProjectKey(v.target.value)}
                    />
                </div>

                <div className="form-group create-project-input-row">
                    <label htmlFor="proj-lead" className="create-project-input-label">Руководитель проекта</label>
                    <Input
                        disabled={disabled}
                        type="text" className="form-control"
                        name="proj-lead" value={openedProject.lead}
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
        return <div className="page-container">
            <AdminSideBar />
            {this.renderContent()}
        </div>
    }
}

function mapStateToProps(state) {
    const { auth, adminPage } = state;

    return {
        auth, adminPage
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