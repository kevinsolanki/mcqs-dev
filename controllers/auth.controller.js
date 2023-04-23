const bcrypt = require("bcrypt");
const { response } = require("../utils/responseService");

const { createUser, findOneUser } = require("../services/user.service");
const { makeJwtToken, verifyJwtToken } = require("../utils/jwt");
const {
  sendMail,
  renderTemplate,
  MailTemplates,
} = require("../utils/mailService");

exports.signIn = async (req, res) => {
  try {
    const user = await findOneUser({ email: req.body.email });
    if (!user) {
      return response(res, 400, "User not found for given email!");
    }
    if (!user.isVerified) {
      return response(res, 401, "User not verified");
    }

    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return response(res, 400, "Invalid password!");
    }
    const token = await makeJwtToken(
      { id: user._id, role: user.roleId },
      "30 day"
    );

    //   await user.populate({ path: 'roleId', select: 'name' })

    return response(res, 200, "Login Successful.", {
      user: { name: user.name, email: user.email, role: user.roleId },
      accessToken: token,
    });
  } catch (error) {
    return response(res, 500, error.message);
  }
};

exports.signUp = async (req, res) => {
  try {
    if (await findOneUser({ email: req.body.email })) {
      return response(res, 400, "Email already in use");
    }
    console.log(req.body);
    const user = await createUser(req.body);
    const token = await makeJwtToken({ id: user._id }, "7 day");
    const emailBody = await renderTemplate(MailTemplates.CONFIRM, user, {
      token: token,
      action: "signup/verify",
    });

    console.log('token :>> ', token);
    await sendMail(user, "Tagline mcqs test", emailBody);
    const newUser = await findOneUser(
      { _id: user._id },
      { name: 1, email: 1, roleId: 1 }
    );
    return response(res, 201, "User added Successfully.", newUser);
  } catch (error) {
    return response(res, 500, error.message);
  }
};

exports.verify = async (req, res) => {
  try {
    const decoded = await verifyJwtToken(req.query.token);
    const user = await findOneUser({ _id: decoded.id });
    if (!user) {
      return response(res, 401, "Verification failed!");
    }
    if (user.isVerified) {
      return response(res, 400, "User already verified");
    }
    user.isVerified = true;
    await user.save();
    return response(res, 200, "User verified successfully.");
  } catch (error) {
    return response(res, 500, error.message);
  }
};
