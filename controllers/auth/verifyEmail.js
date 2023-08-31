const { NotFound } = require("http-errors");

const { User } = require("../../models");

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw new NotFound("Not found verification token");
  }
  await User.findByIdAndUpdate(user._id, {
    verificationToken: "",
    verify: true,
  });
  res.json({
    status: "success",
    code: 200,
    message: "Email verify success",
  });
};

module.exports = verifyEmail;
