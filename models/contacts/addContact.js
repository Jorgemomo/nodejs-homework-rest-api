const { v4 } = require("uuid");

const updateContact = require("./updateContact");
const listContacts = require("./listContacts");

const addContact = async (data) => {
  const contacts = await listContacts();
  const newContacts = { ...data, id: v4() };
  contacts.push(newContacts);
  await updateContact(contacts);
  return newContacts;
};

module.exports = addContact;
