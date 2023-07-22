const fs = require("fs/promises");

const filePath = require("./filePath");

const updateContact = async (contacts) => {
  await fs.writeFile(filePath, JSON.stringify(contacts));
};

module.exports = updateContact;
