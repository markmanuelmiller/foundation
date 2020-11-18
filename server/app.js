// import 'dotenv/config';
const path = require('path');
const express = require('express');
const app = express();

const apiRouter = require('./routes/api');

app.use(express.json());

app.use('/api', apiRouter);

app.listen(3000);
