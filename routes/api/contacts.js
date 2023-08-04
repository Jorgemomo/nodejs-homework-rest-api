const express = require("express");

const { validation, ctrlWrapper } = require("../../utils");
const { addSchema, updateFavoriteSchema } = require("../../models/contacts");

const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

router.post("/", validation(addSchema), ctrlWrapper(ctrl.addContact));
router.put(
  "/:contactId",
  validation(addSchema),
  ctrlWrapper(ctrl.updateContactId)
);

router.patch(
  "/:id/favorite",
  validation(updateFavoriteSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

router.delete("/:contactId", ctrlWrapper(ctrl.removeContact));

module.exports = router;
