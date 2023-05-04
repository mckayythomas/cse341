const mongodb = require('../database/connection.js');
const ObjectId = require('mongodb').ObjectId;

const getContacts = async (req, res) => {
  const result = await mongodb.getDb().db('contacts').collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('contacts').collection('contacts').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createContact = async (req, res) => {
  const result = await mongodb.getDb().db('contacts').collection('contacts').insertOne({
    contact,
    email,
    phone,
    'favorite-color': favoriteColor,
    birthday,
    firstName,
    lastName
  })
}

const deleteContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('contacts').collection('contacts').deleteOne({_id: userId});
  if (result.deletedCount === 1) {
    res.status(200).json({ message: 'Contact deleted number ' + userId + ' successfully' });
  } else {
    res.status(404).json({ message: 'Contact not found' });
  }
}

module.exports = { getContacts, getSingle, deleteContact };
