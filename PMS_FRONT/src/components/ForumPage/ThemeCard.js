import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

export default function ForumTheme(props) {
    const theme = props.theme;

    return (
        <Link to={`/forum/theme/${theme.id}`}>
            <div className="theme_card_container">
                <div className="theme_name_container">
                    <div className="theme_name">{theme.title}</div>
                    <div className="theme_author">{theme.author}</div>
                </div>
                <div className="theme_status_container">
                    <FontAwesomeIcon icon={faComment} />
                    <span> {theme.replies.length} replies</span>
                </div>
            </div>
        </Link>

    );
}