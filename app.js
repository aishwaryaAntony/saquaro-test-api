var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./src/api/routes/v1/index');
var locationsRouter = require('./src/api/routes/v1/locations');
var locationTestTypesRouter = require('./src/api/routes/v1/locationTestTypes');
var testTypesRouter = require('./src/api/routes/v1/testTypes');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/location', locationsRouter);
app.use('/location-test-type', locationTestTypesRouter);
app.use('/test-type', testTypesRouter);


module.exports = app;
