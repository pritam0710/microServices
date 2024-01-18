import React from "react";
import axios from "axios";

const CommentList = ({comments}) => {
    let content = "";

    const renderComments = comments.map(comment => {

        switch(comment.status) {
            case 'approved' : {
                content = comment.content;
                break;
            }
            case 'rejected' : {
                content = 'Comment has been rejected';
                break;
            }
            case 'pending' : {
                content = "Comment awaits moderation";
                break;
            }
        }
        return <li key={comment.id}>{content}</li>
    })

    return <ul>{renderComments}</ul>
}

export default CommentList;