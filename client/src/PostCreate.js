import React, { useState } from "react";
import axios from 'axios'

const PostCreate = function() {
    const [title, setTitle] = useState('');

    const onChangeHandler = function(evt) {
        // evt.preventDefault()
        const val = evt.target.value
        setTitle(val);
    }

    const onSubmitHandler = async function(evt) {
        evt.preventDefault();
        await axios.post('http://localhost:4000/posts', {title});

        setTitle(' ');
    }
    return <div>
        <form onSubmit={onSubmitHandler}>
            <div className="form-group">
                <label>Title</label>
                <input type="text" className="form-control" value={title} onChange={onChangeHandler} placeholder=" " />
            </div>
            <button className="btn btn-primary">Submit</button>
        </form>
    </div>
}

export default PostCreate;