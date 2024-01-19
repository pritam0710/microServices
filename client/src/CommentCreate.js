import React, { useState } from "react";
import axios from "axios";

const CommentCreate = ({postId}) => {
    const [content, setContent] = useState('');

    const onCommentChangeHandler = (evt) => {
        setContent(evt.target.value);
    }

    const onCommentSubmitHandler = async (evt) => {
        evt.preventDefault();

        await axios.post(`http://posts.com/posts/${postId}/comments`, {content});

        setContent('');
    }

    return <div>
        <form onSubmit={onCommentSubmitHandler}>
            <div className="form-group m-3">
                <label>New Comment</label>
                <input type="text" className="form-control" value={content} onChange={onCommentChangeHandler} />
            </div>
            <button className="btn btn-outline-primary">Create</button>
        </form>
    </div>
}

export default CommentCreate;