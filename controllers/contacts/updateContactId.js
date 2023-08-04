const { Contact, schemas } = require("../../models/contacts");
const { NotFound } = require("http-errors");
const { appError } = require("../../utils");

const updateContactId = async (req, res) => {
  const { error } = schemas.addContact.validate(req.body);
  if (error) {
    throw appError(400, error.message);
  }
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};
module.exports = updateContactId;
