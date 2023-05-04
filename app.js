const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const { connectDB } = require('./src/database/connection');
const db = require('./src/database/connection.js');
const port = process.env.port || 3000;

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./src/routes'));

// connectDB();

db.initDb((err, mongodb) => {
  if (err) {
    console.error(err);
  } else {
    app.listen(port);
    console.log('Web Server is Listening at port ' + port);
  }
});
