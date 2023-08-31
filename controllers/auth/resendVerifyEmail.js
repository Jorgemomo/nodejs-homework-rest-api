const { User } = require("../../models/user");

const { NotFound, BadRequest } = require("http-errors");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFound(404, "Not found");
  }
  if (user.verify) {
    throw BadRequest(400, "Verification has already been passed");
  }
  const mail = {
    to: email,
    subject: "Підтвердження реестації на сайті",
    html: `<a target="_blank" href="http://localhost:3000/api/auth/verify/${user.verificationToken}">Натисніть для підтвердження на сайті</a>`,
  };
  await sendEmail(mail);
  res.json({
    message: "Verification email sent",
  });
};

module.exports = resendVerifyEmail;
