const router = require('express').Router();

router.get("/", (request, response) => {
    response.send("Mariana Valeria Rodriguez Fuentes Rivera De Thomas")
});

module.exports = router