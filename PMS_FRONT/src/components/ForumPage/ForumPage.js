import React, { Component } from "react";
import * as actions from "./actions"
import { connect } from "react-redux";
import ThemeCard from "./ThemeCard";
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

class ForumPage extends Component {
    componentDidMount() {
        this.props.getThemes();
        this.props.clearTheme();
    }

    renderThemes() {
        const { themes } = this.props.state;
        const blocks = [];

        themes.forEach(theme => {
            blocks.push(<ThemeCard theme={theme}/>);
        })

        return blocks;
    }

    render() {
        return (
            <div className="page_background">
                <div className="add_button">
                    <Link to={"/forum/add"}>
                        <Button variant="primary">
                            <FontAwesomeIcon icon={faPlus} />
                            Add theme
                        </Button>
                    </Link>
                </div>
                <div>
                    {this.renderThemes()}
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => ({
    state: state.forumReducer
});

const mapDispatchToProps = {
    ...actions
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ForumPage)
