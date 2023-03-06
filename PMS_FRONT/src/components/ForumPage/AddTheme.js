import React, { Component } from "react";
import { connect } from "react-redux";
import { addTheme } from "./actions";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Textarea from "react-validation/build/textarea";
import { getTheme, clearTheme, setTitle, setText } from "./actions";
import { history } from '../../helpers/history';

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

class AddTheme extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeText = this.onChangeText.bind(this);

        if (this.props.id) {
            this.props.dispatch(getTheme(this.props.id));
        } else {
            this.props.dispatch(clearTheme())
        }
    }

    onChangeTitle(e) {
        this.props.dispatch(setTitle(e.target.value))
    }

    onChangeText(e) {
        this.props.dispatch(setText(e.target.value))
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({
            loading: true,
        });

        this.form.validateAll();

        const { dispatch, auth, forumReducer } = this.props;

        if (this.checkBtn.context._errors.length === 0) {
            const newTheme = {
                id: forumReducer.theme.id,
                author: auth.user.username,
                title: forumReducer.theme.title,
                text: forumReducer.theme.text
            }

            dispatch(addTheme(newTheme))
                .then((response) => {
                    history.push("/forum/theme/" + response.data.id);
                });
        } else {
            this.setState({
                loading: false,
            });
        }
    }

    render() {
        const { auth, message, forumReducer } = this.props;
        if (!auth.isLoggedIn) {
            return <div className="error_page_container">
                Only authorized users can create themes
            </div>;
        }

        let pageName;
        if (this.props.id) {
            pageName = "Edit theme";
        } else {
            pageName = "Adding new theme";
        } 
        return (
            <div className="col-md-12">
                <div className="card card-container">
                    <Form
                        onSubmit={this.handleSubmit}
                        ref={(c) => {
                            this.form = c;
                        }}
                    >
                        <h4 className="text-center">{pageName}</h4>
                        <div className="form-group mt-4">
                            <label htmlFor="title">Title</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="title"
                                value={forumReducer.theme.title}
                                onChange={this.onChangeTitle}
                                validations={[required]}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="text">Text</label>
                            <Textarea
                                type="text"
                                className="form-control"
                                name="text"
                                value={forumReducer.theme.text}
                                onChange={this.onChangeText}
                                validations={[required]}
                            />
                        </div>

                        <div className="form-group">
                            <button
                                className="btn btn-primary btn-block"
                                disabled={forumReducer.theme.loading}
                            >
                                <span>Save</span>
                            </button>
                        </div>

                        {message.message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {message}
                                </div>
                            </div>
                        )}
                        <CheckButton
                            style={{ display: "none" }}
                            ref={(c) => {
                                this.checkBtn = c;
                            }}
                        />
                    </Form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { auth, message, forumReducer } = state;

    return {
        auth,
        message,
        forumReducer
    };
}

export default connect(mapStateToProps)(AddTheme);
