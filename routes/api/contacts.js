const express = require("express");

const { auth, validation, ctrlWrapper } = require("../../middlewares");
const { addSchema, updateFavoriteSchema } = require("../../models/contacts");

const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

router.post("/", auth, validation(addSchema), ctrlWrapper(ctrl.addContact));
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
