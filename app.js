const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerOptions = require('./swagger.js');
const db = require('./src/database/connection.js');
const port = process.env.port || 3000;


const swaggerSpecs = swaggerJsdoc(swaggerOptions);
/**
 * @swagger
 * /api-docs:
 *   get:
 *     summary: Get the Swagger API documentation
 *     description: Endpoint to access the Swagger API documentation.
 *     responses:
 *       '200':
 *         description: OK
 */
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
console.log('Api Docs made...');

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./src/routes'));

db.initDb((err, mongodb) => {
  if (err) {
    console.error(err);
  } else {
    app.listen(port);
    console.log('Web Server is Listening at port ' + port);
  }
});
