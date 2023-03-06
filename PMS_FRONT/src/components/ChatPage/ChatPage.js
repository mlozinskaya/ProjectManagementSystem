import React, { Component } from "react";
import { connect } from "react-redux";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import Input from "react-validation/build/input";
import { Button } from 'react-bootstrap';

import { getMessages, addMessage, removeMessage } from "./actions";

class ChatPage extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeMessage = this.onChangeMessage.bind(this);
        this.handleEditComment = this.handleEditComment.bind(this);
        this.handleSaveComment = this.handleSaveComment.bind(this);
        this.onChangeCommentMessage = this.onChangeCommentMessage.bind(this);

        this.state = {
            message: "",
            validated: false,
            editComment: false,
            editCommentId: "",
            editCommentText: ""
        };
    }

    componentDidMount() {
        this.props.dispatch(getMessages())
    }

    onChangeMessage(e) {
        this.setState({
            message: e.target.value,
        });
    }

    onChangeCommentMessage(e) {
        this.setState({
            editCommentText: e.target.value,
        });
    }

    clearMessage() {
        this.setState({
            message: ""
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.form.validateAll();

        const { dispatch, auth } = this.props;

        if (this.checkBtn.context._errors.length === 0) {
            const newMessage = {
                author: auth.user.username,
                text: this.state.message
            }

            dispatch(addMessage(newMessage));
            this.clearMessage();
        }
    }

    handleEditComment(message) {
        this.setState({
            editComment: !this.state.editComment,
            editCommentId: message.id,
            editCommentText: message.text
        });
    }

    handleSaveComment(message) {
        const newMessage = {
           ...message,
           text: this.state.editCommentText
        }

        this.props.dispatch(addMessage(newMessage));

        this.setState({
            editComment: !this.state.editComment
        });
    }

    getFormatDate(creationDate) {
        const event = new Date(creationDate);
        const options = { weekday: 'null', year: 'numeric', month: 'numeric', day: 'numeric' };

        return (event.toLocaleString('ru-RU', { timeZone: 'UTC' }).replace(",", " ")).replace("/", ".").replace("/", ".");
    }

    removeMessage(id) {
        const conf = window.confirm(`Are you sure want to delete message?`);

        if (conf) {
            const { dispatch } = this.props;

            dispatch(removeMessage(id));
        }

    }

    renderMessages() {
        const { messages } = this.props.chat;
        const { auth } = this.props;

        if (messages.length === 0) return;

        let messagesArray = [];

        messages.forEach(message => {
            const isCommentEdited = this.state.editComment && (this.state.editCommentId === message.id);
            messagesArray.push(
                <div className="message_container">
                    <span className="comment_text_block">
                        <b>
                            {message.author}
                        </b>
                        <i>{"\t\t\tat "}{this.getFormatDate(message.creationDate)}</i>
                        {isCommentEdited &&
                            <Form onSubmit={this.handleSubmit} class="form-inline my-2 my-lg-0"
                                ref={(c) => {
                                    this.form = c;
                                }}>
                                <Input
                                    type="text"
                                    placeholder={message.text}
                                    style={{ width: "405px" }}
                                    className="form-control mr-sm-2 message_input"
                                    name="reply"
                                    value={this.state.editCommentText}
                                    onChange={this.onChangeCommentMessage}
                                />
                            </Form>}
                        {
                            !isCommentEdited &&
                            <div>
                                {message.text}
                            </div>
                        }

                    </span>

                    {auth.user && (auth.user.username === message.author) &&
                        <span>
                            <Button variant="outline-primary" size="sm" onClick={
                                !isCommentEdited ? this.handleEditComment.bind(this, message) : 
                                this.handleSaveComment.bind(this, message)
                                }>
                                {isCommentEdited ? "Save" : "Edit"}
                                </Button>
                            <Button variant="outline-danger" size="sm" onClick={this.removeMessage.bind(this, message.id)}>X</Button>
                        </span>}

                </div>)
        })

        return messagesArray;
    }

    renderAddMessage() {
        const { message, auth } = this.props;

        if (!auth.user) {
            return <div className="need_auth_block">
                <b>
                    Only authorized users can post messages
                </b>
            </div>
        }

        return (
            <Form onSubmit={this.handleSubmit} class="form-inline my-2 my-lg-0"
                ref={(c) => {
                    this.form = c;
                }}>

                <Input
                    type="text"
                    placeholder="Add a reply..."
                    style={{ width: "405px" }}
                    className="form-control mr-sm-2 message_input"
                    name="reply"
                    value={this.state.message}
                    onChange={this.onChangeMessage}
                />
                <button className="btn btn-primary my-2 my-sm-0" disabled={this.state.loading}>
                    <span>Send</span>
                </button>

                <div className="add_reply_container">
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
                <div className="messages_container">
                    {this.renderAddMessage()}
                    {this.renderMessages()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { auth, message, chat } = state;

    return {
        auth,
        message,
        chat
    };
}

export default connect(
    mapStateToProps
)(ChatPage)
