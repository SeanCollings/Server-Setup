// Main starting point of the application
// no es6 for this section
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

// DB Setup
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/auth', {
  useMongoClient: true
});

// App Setup - get express working the way we want it to
app.use(morgan('combined')); // morgan - logging framework
app.use(cors());
app.use(bodyParser.json({ type: '*/*' })); // bodyParser - parse incoming request / json
router(app);

// Server Setup - getting express application to talk to the outside world
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);
