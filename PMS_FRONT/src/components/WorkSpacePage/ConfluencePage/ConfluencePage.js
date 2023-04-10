import React, { Component } from "react";
import { bindActionCreators } from 'redux'
import { connect } from "react-redux";

import * as actions from "./actions"
import * as workspaceActions from "../actions"
import WorkspaceSideBar from "../WorkspaceSideBar";

class ConfluencePage extends Component {
    componentDidMount() {
        this.props.actions.getConfluenceDocs();
    }


    getSelectedProject() {
        return this.props.project;
    }

    renderConfluenceTest() {
        return <div>
            <li>a</li>
            <ul>
                <li>test</li>
                <li>test</li>
            </ul>
            <li>b</li>
            <ul>
                <li>test</li>
                <li>test</li>
            </ul>
            <li>c</li>
            <li>d</li>
            <li>e</li>
            <li>f</li>
            <ul>
                <li>test</li>
                <li>test</li>
            </ul>
        </div>
    }

    renderDocs() {
        const { docs } = this.props.confluence;
        let rows = [];
        docs.forEach(item => {
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
        return <div className="backlog-page-container">
            <div className="backlog-page-title-container">
                <div className="backlog-page-label"> Справочник </div>
            </div>

            <div style={{ marginTop: "20px" }}></div>
            <hr className="title-separate-line" />
            <br />
            <hr className="separate-line" />
            {this.renderDocs()}
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