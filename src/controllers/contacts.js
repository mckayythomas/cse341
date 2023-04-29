const mongodb = require("../database/connection.js");
const ObjectId = require('mongodb').ObjectId;

async function getContacts(req, res, next) {
        const results = await  mongodb.getDb().db('contacts').collection('contacts').find();
        results.toArray().then((contacts)  => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(contacts);
        });
}

async function getSingle(req, res, next) {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('contacts').collection('contacts').find({_id: userId});
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};

module.exports = { getContacts, getSingle };
