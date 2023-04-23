const userModel = require("../models/user.model");

exports.createUser = async (user) => {
  return await userModel.create({
    name: user.name,
    email: user.email,
    password: user.password,
    roleId: user.roleId,
    techId: user.techID,
    adminId: user.adminID

  });
};

exports.findOneUser = async (match, select) => {
  return await userModel.findOne(match, select).populate({ path: 'roleId', select: 'name' });
};

