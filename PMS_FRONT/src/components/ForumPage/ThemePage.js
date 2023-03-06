import React, { Component } from "react";
import { connect } from "react-redux";

import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import Textarea from "react-validation/build/textarea";
import { Button } from 'react-bootstrap';
import Input from "react-validation/build/input";
import { Link } from "react-router-dom";
import { history } from '../../helpers/history';


import { getTheme, addReply, removeTheme, removeReply } from "./actions";

class ThemePage extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.onChangeReply = this.onChangeReply.bind(this);

        this.handleEditReply = this.handleEditReply.bind(this);
        this.handleSaveReply = this.handleSaveReply.bind(this);
        this.onChangeReplyMessage = this.onChangeReplyMessage.bind(this);

        this.state = {
            reply: "",
            validated: false,
            editReply: false,
            editReplyId: "",
            editReplyText: ""
        };
    }

    componentDidMount() {
        this.props.dispatch(getTheme(this.props.id))
    }

    onChangeReply(e) {
        this.setState({
            reply: e.target.value,
        });
    }

    onChangeReplyMessage(e) {
        this.setState({
            editReplyText: e.target.value,
        });
    }

    clearReply() {
        this.setState({
            reply: ""
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.form.validateAll();

        const { dispatch, auth } = this.props;

        if (this.checkBtn.context._errors.length === 0) {
            const newReply = {
                theme: {
                    id: this.props.id
                },
                author: auth.user.username,
                text: this.state.reply
            }

            dispatch(addReply(newReply));
            this.clearReply();
        }
    }

    handleEditReply(reply) {
        this.setState({
            editReply: !this.state.editReply,
            editReplyId: reply.id,
            editReplyText: reply.text
        });
    }

    handleSaveReply(reply) {
        const newMessage = {
            ...reply,
            theme: {
                id: this.props.id
            },
            text: this.state.editReplyText
        }

        this.props.dispatch(addReply(newMessage));

        this.setState({
            editReply: !this.state.editReply
        });
    }


    getFormatDate(creationDate) {


        const event = new Date(creationDate);
        const options = { weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric' };

        return event.toLocaleDateString('en-EN', options) + " " + event.toLocaleTimeString('it-IT');
    }

    handleRemove() {
        const conf = window.confirm(`Are you sure want to delete theme?`);

        if (conf) {
            const { theme } = this.props.forumReducer;
            const { dispatch } = this.props;

            dispatch(removeTheme(theme.id))
                .then(() => {
                    history.push("/forum");
                    window.location.reload();
                });
        }
    }

    renderTheme() {
        const { theme } = this.props.forumReducer;
        const { auth } = this.props;

        return (
            <div className="theme_container">
                <h2>{theme.title}</h2>
                <p></p>
                <i>{this.getFormatDate(theme.creationDate)}</i>
                <div><i>by <b>{theme.author}</b></i></div>
                <p></p>

                <div>
                    {theme.text}
                </div>

                {auth.user && (auth.user.username === theme.author) &&
                    <div className="theme_buttons_container">
                        <Link to={`/forum/add/${theme.id}`}>
                            <Button variant="outline-primary" onClick={() => { }}>Edit</Button>
                        </Link>
                        <Button variant="outline-danger" onClick={this.handleRemove}>Delete</Button>
                    </div>}


            </div>
        );
    }

    removeReply(reply) {
        const conf = window.confirm(`Are you sure want to delete reply?`);

        if (conf) {
            const { dispatch } = this.props;

            dispatch(removeReply(reply));
        }

    }

    renderReplies() {
        const { replies } = this.props.forumReducer.theme;
        const { auth } = this.props;

        if (!replies) return;

        let repliesArray = [];

        replies.forEach(reply => {
            const isReplyEdited = this.state.editReply && (this.state.editReplyId === reply.id);

            repliesArray.push(
                <div className="comment_container">
                    <div className="comment_info_container">
                        <span>
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/4616/4616655.png"
                                className="img_container"
                            />
                        </span>
                        <span className="comment_text_block">
                            <b>
                                {reply.author}
                            </b>
                            <i>{"\t\t\tat "}{this.getFormatDate(reply.creationDate)}</i>

                            {isReplyEdited &&
                                <Form onSubmit={this.handleSubmit} class="form-inline my-2 my-lg-0"
                                    ref={(c) => {
                                        this.form = c;
                                    }}>
                                    <Input
                                        type="text"
                                        placeholder={reply.text}
                                        style={{ width: "405px" }}
                                        className="form-control mr-sm-2 message_input"
                                        name="reply"
                                        value={this.state.editReplyText}
                                        onChange={this.onChangeReplyMessage}
                                    />
                                </Form>}

                            {
                                !isReplyEdited &&
                                <div>
                                    {reply.text}
                                </div>
                            }



                        </span>
                    </div>


                    {auth.user && (auth.user.username === reply.author) &&
                        <span>
                            <Button variant="outline-primary" size="sm" onClick={
                                !isReplyEdited ? this.handleEditReply.bind(this, reply) :
                                    this.handleSaveReply.bind(this, reply)
                            }>
                                {isReplyEdited ? "Save" : "Edit"}
                            </Button>
                            <Button variant="outline-danger" size="sm" onClick={this.removeReply.bind(this, { ...reply, themeId: this.props.id })}>X</Button>
                        </span>}

                </div>)
        })

        return repliesArray;
    }

    renderAddReply() {
        const { message, auth } = this.props;

        if (!auth.user) {
            return <div className="need_auth_block">
                <b>
                    Only authorized users can post replies
                </b>
            </div>
        }

        return (
            <Form onSubmit={this.handleSubmit}
                ref={(c) => {
                    this.form = c;
                }}>

                <div className="add_reply_container">
                    <div className="form-group">
                        <Textarea
                            type="text"
                            placeholder="Add a reply..."
                            className="form-control"
                            name="reply"
                            value={this.state.reply}
                            onChange={this.onChangeReply}
                        />
                    </div>

                    <div className="form-group save_reply_btn">
                        <button
                            className="btn btn-primary btn-block"
                            disabled={this.state.loading}
                        >
                            <span>Send reply</span>
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
                </div>
            </Form>
        );
    }

    render() {
        return (
            <div className="page_background">
                <div>
                    {this.renderTheme()}
                </div>
                <div>
                    {this.renderReplies()}
                </div>
                <div>
                    {this.renderAddReply()}
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

export default connect(
    mapStateToProps
)(ThemePage)
