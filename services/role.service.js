const roleModel = require("../models/role.model");

exports.findRole = async (match) => {
  return await roleModel.findOne(match);
};

exports.createRole = async (roleName) => {
  return await roleModel.create({ name: roleName });
};

exports.findAllRoles = async () => {
  return await roleModel.find({isDeleted:false},{isDeleted:false}).lean();
};
