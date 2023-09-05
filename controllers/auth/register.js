const { Conflict } = require("http-errors");
const { User } = require("../../models");
const gravatar = require("gravatar");
const { v4 } = require("uuid");

const { sendEmail } = require("../../utils");

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with ${email} already exist`);
  }

  const verificationToken = v4();
  const avatarURL = gravatar.url(email, { d: "monsterid" });
  const newUser = new User({
    email,
    subscription,
    avatarURL,
    verificationToken,
  });

  newUser.setPassword(password);

  newUser.save();
  const mail = {
    to: email,
    subject: "Confirmation of registration on the site.",
    html: `<a target="_blank" href="http://localhost:3000/api/auth/verify/${verificationToken}">Click to confirm registration</a>`,
  };
  await sendEmail(mail);

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        subscription,
        avatarURL,
        verificationToken,
      },
    },
  });
};

module.exports = register;
