const express = require('express');
const {randomBytes} = require("crypto")
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios')
const app = express();

app.use(bodyParser.json())
app.use(cors())

const commentByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
    const {id: postId} = req.params;
    res.send(commentByPostId[postId] || []);
})

app.post("/posts/:id/comments", async (req, res) => {
    const {id: postId} = req.params;
    const commentId = randomBytes(4).toString('hex');
    const {content} = req.body;
    const comments = commentByPostId[postId] || [];
    comments.push({id: commentId, content, status: 'pending'});
    commentByPostId[postId] = comments;

    await axios.post("http://localhost:6000/events", {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: req.params.id,
            status: 'pending'
        }
    })
    res.status(201).send(commentByPostId);
})

app.post('/events', async (req, res) => {
    console.log('Event Received: ', req.body.type);
    const {type, data} = req.body;

    if(type === "CommentModerated") {
        const {id, postId, status, content} = data;
        
        const comments = commentByPostId[postId];
        const comment = comments.find(comment => {
            return comment.id === id;
        })

        comment.status = status;

        await axios.post('http://localhost:6000/events', {
            type: 'CommentUpdated',
            data: {
                id, 
                postId,
                content,
                status
            }
        })
    }


    res.send({});
})

app.listen(5000, () => console.log("Comment service chl rha h 5000 port pr"))