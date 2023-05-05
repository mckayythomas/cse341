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
  const { firstName, lastName, email, phone, favoriteColor, birthday } = req.body;

  if (
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.email ||
    !req.body.phone ||
    !req.body.favoriteColor ||
    !req.body.birthday
  ) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  const document = {
    contact: {
      firstName,
      lastName,
      email,
      phone,
      favoriteColor,
      birthday
    }
  };

  const result = await mongodb.getDb().db('contacts').collection('contacts').insertOne(document);
  if (result.acknowledged) {
    res.status(201).json({ message: 'Contact created successfully!', id: result.insertedId });
  } else {
    console.error(result.error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

const deleteContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db('contacts')
    .collection('contacts')
    .deleteOne({ _id: userId });
  if (result.deletedCount === 1) {
    res.status(200).json({ message: 'Contact deleted successfully ' + userId });
  } else {
    res.status(404).json({ message: 'Contact not found' });
  }
};

const updateContact = async (req, res) => {
  const { updateKey, value } = req.body;

  if (!req.body.updateKey || !req.body.value) {
    return res
      .status(400)
      .json({ message: "Please provide a field to update and it's new value." });
  }

  const userId = new ObjectId(req.params.id);
  const update = {};
  update['contact.' + updateKey] = value;
  const result = await mongodb
    .getDb()
    .db('contacts')
    .collection('contacts')
    .updateOne({ _id: userId }, { $set: update });
  console.log(result);
  if (result.modifiedCount > 0 || result.matchedCount > 0) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Contact not found.' });
  }
};

module.exports = { getContacts, getSingle, createContact, deleteContact, updateContact };
