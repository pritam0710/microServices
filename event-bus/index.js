const express = require('express');
const bodyParse = require('body-parser');
const axios = require('axios');

const app = express();

app.use(bodyParse.json());

const events = [];

app.post('/events', (req, res) => {
    const event = req.body;
    events.push(event);

    axios.post('http://localhost:4000/events', event).catch(err => console.log(err.message))// posts
    axios.post('http://localhost:5000/events', event).catch(err => console.log(err.message)) // comment
    axios.post('http://localhost:5051/events', event).catch(err => console.log(err.message)) // query
    axios.post('http://localhost:6051/events', event).catch(err => console.log(err.message)); // moderation

    res.send({status: "OK"})
})

app.get('/events', (req, res) => {
    res.send(events);
})

app.listen(6000, () => {
    console.log("Event Server is running on 6000");
})