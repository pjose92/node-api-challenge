const express = require('express');
const projectRouter = require('./projects/projectsRouter')
const actionsRouter = require('./actions/actionsRouter')

const helmet = require('helmet');

const server = express();

server.use(express.json());

server.use(helmet());

server.use('/api/projects', projectRouter);
server.use('/api/actions', actionsRouter);

server.get('/', (req, res) => {
    res.send(`<h2>API</h2>`)
})

function errorHandler(error, req, res, next) {
    console.log("jp server.js line 21 error", error.message);
    res.status(400).json({ message: error.message });
}

server.use(errorHandler);

module.exports = server;