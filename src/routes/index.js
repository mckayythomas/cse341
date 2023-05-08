const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Returns name of my wife
 *     description: Returns name of my wife.
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */
router.get('/', (request, response) => {
  response.send('Mariana Valeria Rodriguez Fuentes Rivera De Thomas');
});

router.use('/contacts', require('./contacts'));

module.exports = router;
