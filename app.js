const express = require('express');
const app = express();

app.use('/', require("./routes/routes"));

app.listen(process.env.port || 3000);

console.log('Web Server is Listening at port ' + (process.env.port || 3000));