const { Contact, schemas } = require("../../models/contacts");
const { appError } = require("../../utils");

const updateStatusContact = async (req, res) => {
  const { error } = schemas.updateFavorite.validate(req.body);
  if (error) {
    throw appError(400, "missing fields");
  }
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw appError(404, "Not found");
  }
  res.json(result);
};

module.exports = updateStatusContact;
