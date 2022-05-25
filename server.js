'use strict';

// load .env variables  
require('dotenv').config();
const http = require('http');
const express = require("express");
const { models } = require("./db-connection");

const app = express();
const PORT = process.env.PORT || 2000;

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '1kb' }));

app.get('/api/user', async (req, res) => {
    try {
        const userList = await models.user.findAll({
            include: [
                {
                    model: models.user_license,
                }
            ]
        });
        return res.status(200).json(userList);
    } catch (error) {
        return res.status(500).send(error.message);
    }
})

http.createServer(app).listen(PORT, () => {
    console.log('> Server listen on %s ⚡', PORT);
});