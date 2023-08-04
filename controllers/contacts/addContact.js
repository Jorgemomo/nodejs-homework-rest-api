const { Contact, schemas } = require("../../models/contacts");
const { appError } = require("../../utils");

const addContact = async (req, res) => {
  const { error } = schemas.addContact.validate(req.body);
  if (error) {
    throw appError(400, error.message);
  }
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

module.exports = addContact;
