const mongoose = require("mongoose");
const fs = require("fs/promises");
const roleModel = require("../models/role.model");
const path = require("path");
const { findOneUser, createUser } = require("../services/user.service");

module.exports = mongoose.connect(process.env.DB).then(() => {
  console.log("[DB] connected successfully");
  init()
});

const init = async () => {
  try {
    if (!(await roleModel.countDocuments())) {
      const superAdminRole = await roleModel.create({
        name: "super-admin",
      });
      console.log("[DB] super-admin role created..");

      const superAdmins = JSON.parse(
        await fs.readFile(
          path.join(__dirname, "..", "super-admins.json"),
          "utf8"
        )
      );
      // console.log('superAdmins >>',Array.isArray(superAdmins))
      // const superAdminRole = await findRole({ name: "super-admin" });
      if (superAdmins?.length) {
        superAdmins.forEach(async (user) => {
          try {
            if (!(await findOneUser({ email: user.email }))) {
              await createUser({
                name: user.name,
                email: user.email,
                password: user.password,
                roleId: superAdminRole._id,
              });
              console.log("[DB] Created super-admin:", user.name);
            }
          } catch (error) {
            console.log("[DB] Error creating admin", error);
          }
        });
      }
    }
  } catch (error) {
    console.log("[DB] Error creating roles or admin", error);
  }
};
