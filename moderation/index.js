const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());


app.post('/events', async (req, res) => {
    const {type, data} = req.body;

    if(type === 'CommentCreated') {
        const status = data.content.includes('orange') ? 'rejected' : 'approved';

        await axios.post('http://event-bus-srv:6000/events', {
            type: 'CommentModerated',
            data: {
                id: data.id,
                content: data.content,
                postId: data.postId,
                status
            }
        })
    }
});


app.listen(6051, () => {
    console.log("Moderation Server chl rha h 6051 Port pr...");
})

