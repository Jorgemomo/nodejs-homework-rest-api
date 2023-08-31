const { Conflict } = require("http-errors");
const { User } = require("../../models");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { sendEmail } = require("../../utils");

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with ${email} already exist`);
  }

  const verificationToken = nanoid();
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
    subject: "Підтвердження реестраціі на сайті",
    html: `<a target="_blank" href="http://localhost:3000/api/auth/verify/${verificationToken}">Натисніть для підтвердження реестрації</a>`,
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
