import React, { Component } from "react";
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";

import * as actions from "./actions"
import WorkspaceSideBar from "../WorkspaceSideBar";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

class ConfluencePage extends Component {
    componentDidMount() {
        this.props.actions.getConfluenceSections();
    }

    handleSearchChanged = (e) => {
        this.props.actions.setFilter(e.target.value);
    }

    handleSearchEntered = (event) => {
        if (event.key === 'Enter') {
            
        }
    };

    handleOpenDoc = (doc) => {
        this.props.actions.setOpenedDoc(doc);
        this.props.history.replace("/confluence/add");
    }

    handleAddConfluenceDocBtn = () => {
        this.props.history.replace("/confluence/add");
    }

    getSelectedProject() {
        return this.props.project;
    }

    renderSearch() {
        return <div className="confluence-search-row">
            <div className="confluence-search">
                <FontAwesomeIcon icon={icon({ name: 'search', style: 'solid' })}
                    className="link-icon backlog-search-icon" />
                <input type="text" name="name"
                    value={this.props.confluence.filter || ""}
                    className="backlog-search-input-field"
                    placeholder="Найти документ"
                    onChange={this.handleSearchChanged}
                    onKeyDown={this.handleSearchEntered} />
                <FontAwesomeIcon icon={icon({ name: 'close', style: 'solid' })}
                    className="link-icon backlog-search-icon" onClick={this.props.actions.clearFilter} />
            </div>

            <button className="confluence-plus-btn" onClick={this.handleAddConfluenceDocBtn}>+</button>
        </div>
    }

    renderSections() {
        const { sections } = this.props.confluence;

        if (!sections) {
            return;
        }

        const contentArr = [];
        let sectionDocsArr = [];

        sections.forEach(section => {
            const sectionDocs = section.docs;

            sectionDocs.forEach(sectionDoc => sectionDocsArr.push(
                <div className="confluence-doc-row" onClick={() => this.handleOpenDoc(sectionDoc)}>
                    <FontAwesomeIcon icon={icon({ name: 'file-alt', style: 'solid' })}
                        className="confluence-doc-icon" />
                    {sectionDoc.name}
                </div>
            ))

            contentArr.push(<div className="confluence-section-row">
                {section.name}
                {sectionDocsArr}
            </div>)

            sectionDocsArr = [];
        })

        return <div className="confluence-section-list-container">
            {contentArr}
        </div>;
    }

    renderContent() {
        return <div className="backlog-page-container">
            {this.renderSearch()}

            <div className="confluence-page-container">
                {this.renderSections()}
            </div>
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
        auth,
        confluence
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
)(ConfluencePage)