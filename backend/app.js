const express = require('express');
const app = express();
const body_parser = require('body-parser');
require('dotenv').config();
const uploadImageRouter = require('./routers/galaryRouter');
const cors = require('cors')

app.use(body_parser.json());
app.use(cors());
app.use('/gallery',uploadImageRouter)

module.exports = app;