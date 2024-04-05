var express = require('express');
var compression = require('compression')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');
var membersRouter = require('./routes/members');
var workersRouter = require('./routes/workers');
var transactionsRouter = require('./routes/transactions');
var projectesRouter = require('./routes/projectes');
var authRouter = require("./routes/auth");

var app = express();

app.use(compression());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
app.use('/api/xarxa', membersRouter);
app.use('/api/inici', authRouter);
app.use('/api/workers', workersRouter);
app.use('/api/transactions', transactionsRouter);
app.use('/api/projectes', projectesRouter);
module.exports = app;
