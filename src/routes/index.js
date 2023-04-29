const express = require('express');
const router = express.Router();

router.get("/", (request, response) => {
    response.send("Mariana Valeria Rodriguez Fuentes Rivera De Thomas")
});

router.use("/contacts", require("./contacts"));


module.exports = router;