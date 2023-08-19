const { Contact, schemas } = require("../../models/contacts");
const { appError } = require("../../utils");

const addContact = async (req, res) => {
  const { error } = schemas.addContact.validate(req.body);
  if (error) {
    throw appError(400, error.message);
  }
  const { _id } = req.user;
  const result = await Contact.create({ ...req.body, owner: _id });
  res.status(201).json(result);
};

module.exports = addContact;
