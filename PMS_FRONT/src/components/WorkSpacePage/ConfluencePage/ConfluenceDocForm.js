import React, { Component } from "react";
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";

import * as actions from "./actions"
import WorkspaceSideBar from "../WorkspaceSideBar";

import Form from "react-validation/build/form";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

class ConfluenceDocForm extends Component {
    componentDidMount() {
        this.props.actions.getConfluenceSections();
    }

    handleCancel = () => {
        this.props.actions.clearOpenedDoc();
        this.props.history.replace("/confluence")
    }

    handleSaveDoc = (e) => {
        e.preventDefault();

        const { openedDoc } = this.props.confluence;
        const docForSave = {
            userId: this.props.auth.user.userId,
            sectionId: openedDoc.sectionId,
            name: openedDoc.name,
            description: openedDoc.description,
            tags: openedDoc.tags
        };

        this.props.actions.saveDoc(docForSave);
    }

    getSectionOptions = () => {
        const sections = this.props.confluence.sections;

        if (!sections) {
            return [];
        }

        const optionArr = [];
        optionArr.push(<option selected>Выберите раздел</option>);

        sections.forEach(section => {
            optionArr.push(<option value={section.id}>{section.name}</option>);
        })

        return optionArr;
    }

    renderContent() {
        const { openedDoc } = this.props.confluence;

        return <div className="confluence-form-container">

            <Form onSubmit={this.handleSaveDoc.bind(this)}>
                <div className="confluence-form-row">
                    <div className="confluence-form-label">
                        Название
                    </div>
                    <input className="form-control confluence-form-name-input"
                        value={openedDoc.name} placeholder={"Введите название документа..."}
                        onChange={(v) => this.props.actions.setOpenedDocName(v.target.value)}
                    />
                </div>

                <div className="confluence-form-row">
                    <div className="confluence-form-label">
                        Раздел
                    </div>

                    <div className="input-group mb-3 confluence-form-section-input">
                        <select className="custom-select section-input" id="inputGroupSelect01"
                            value={openedDoc.sectionId ? openedDoc.sectionId  : ""}
                            onChange={(v) => this.props.actions.setOpenedDocSection(v.target.value)}>
                            {this.getSectionOptions()}
                        </select>
                    </div>

                    <div className="confluence-form-tags-label">
                        Тэги
                    </div>

                    <div className="input-group mb-3 confluence-form-tags-input">
                        <input className="form-control confluence-form-name-input"
                            value={openedDoc.tags} placeholder={"Введите тэги документа..."}
                            onChange={(v) => this.props.actions.setOpenedDocTags(v.target.value)}
                        />
                    </div>
                </div>

                <div className="confulence-form-textarea-icons-container">
                    <FontAwesomeIcon icon={icon({ name: 'align-left', style: 'solid' })} />
                    <FontAwesomeIcon icon={icon({ name: 'align-center', style: 'solid' })} />
                    <FontAwesomeIcon icon={icon({ name: 'align-right', style: 'solid' })} />
                    <FontAwesomeIcon icon={icon({ name: 'align-justify', style: 'solid' })} />
                    <FontAwesomeIcon icon={icon({ name: 'font', style: 'solid' })} />
                    <FontAwesomeIcon icon={icon({ name: 'underline', style: 'solid' })} />
                    <FontAwesomeIcon icon={icon({ name: 'strikethrough', style: 'solid' })} />
                    <FontAwesomeIcon icon={icon({ name: 'pen-nib', style: 'solid' })} />
                    <FontAwesomeIcon icon={icon({ name: 'undo', style: 'solid' })} />
                    <FontAwesomeIcon icon={icon({ name: 'redo', style: 'solid' })} />
                </div>

                <div>
                    <textarea className="form-control confluence-form-textarea-input"
                        placeholder={"Введите текст документа..."}
                        value={openedDoc.description}
                        onChange={(v) => this.props.actions.setOpenedDocDescription(v.target.value)}>
                    </textarea>
                </div>

                <div className="form-group create-project-save-btn-container">
                    <button className="btn btn-secondary create-project-save-btn" onClick={this.handleCancel}>Отмена</button>
                    <button className="btn btn-secondary create-project-save-btn" onClick={this.handleSaveDoc}>Сохранить</button>
                </div>
            </Form>
        </div>
    }

    render() {
        return <div className="page-container">
            <WorkspaceSideBar />
            {this.renderContent()}
        </div>
    }
}

function mapStateToProps(state) {
    const { auth, confluence } = state;

    return {
        auth, confluence
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
)(ConfluenceDocForm)