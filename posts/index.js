const express = require("express");
const {randomBytes} = require('crypto');
const bodyParser = require("body-parser");
const cors = require('cors');
const axios = require('axios')
const app = express();

app.use(cors())
app.use(bodyParser.json());

const posts = {};

app.get("/posts", (req, res) => {
    res.send(posts);
});

app.post("/posts", async(req, res) => {
    const id = randomBytes(4).toString('hex');
    const {title} = req.body;
    posts[id] = {
        id, title
    }

    // emitting an event
    await axios.post('http://event-bus-srv:6000/events', {
        type: 'PostCreated',
        data: {
            id,
            title
        }
    })

    res.status(201).send(posts[id]);
})

app.post('/events', (req, res) => {
    console.log("Event Received: ", req.body.type);


    res.send({});
})

app.listen(4000, () => {
    console.log("Server chl rha h 4000 port pr");
})