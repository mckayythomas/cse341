const router = require('express').Router();
const contactsController = require('../controllers/contacts');

router.get('/', contactsController.getContacts);

router.get('/:id', contactsController.getSingle);

router.delete('/:id', contactsController.deleteContact);

router.post('/', contactsController.createContact);

router.put('/:id', contactsController.updateContact);

module.exports = router;
