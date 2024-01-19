const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(bodyParser.json())

const posts = {};

const eventHandler = ({type, data}) => {
    if(type === "PostCreated") {
        const {id, title} = data
        posts[id] = {
            id,
            title,
            comments: []
        }
    }

    if(type === "CommentCreated") {
        const {id, content, postId, status} = data;

        const post = posts[postId];
        post.comments.push({id, content, status});
    }

    if(type === "CommentUpdated") {
        const {id, postId, content, status} = data;

        const post = posts[postId];
        const comment = post.comments.find(comment => comment.id === id);

        comment.status = status;
        comment.content = content;
    }
}

app.get('/posts', (req, res) => {
    res.send(posts)
})

app.post('/events', (req, res) => {
    eventHandler(req.body);
    console.log(posts);

    res.send({})
})



app.listen(5051, async() => {
    console.log('Query service chl rha h 5051 pr')

    try {
        const res = await axios.get('http://event-bus-srv:6000/events');

        for(let event of res.data) {
            console.log('Handling events');
            eventHandler(event);
        }
    } catch (err) {
        console.log("Error while handling events", err)
    }
})