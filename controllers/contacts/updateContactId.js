const contactsOperations = require("../../models/contacts");
const { NotFound } = require("http-errors");

const updateContactId = async (req, res) => {
    const { contactId } = req.params;
    const result = await contactsOperations.updateContactId(
      contactId,
      req.body
    );
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
