const { Conflict } = require("http-errors");
const { User } = require("../../models");
const gravatar = require("gravatar");

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with ${email} already exist`);
  }

  const avatarURL = gravatar.url(email, { d: "monsterid" });
  const newUser = new User({ email, subscription, avatarURL });

  newUser.setPassword(password);

  newUser.save();

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        subscription,
        avatarURL,
      },
    },
  });
};

module.exports = register;
