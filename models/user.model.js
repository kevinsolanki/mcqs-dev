const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      // required: true,
      default: 'Tagline@123'
    },
    roleId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "role",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: Number,
    },
    adminId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      default: null
    },// for candidates which have admins associated with them
    techId: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
        default: null
      },
    ], // for admins which have technology associated with them
  },
  { timestamps: true, versionKey: false }
);

userSchema.pre("save", async function (next) {
  const user = this;
  if (this.isModified("password") || this.isNew) {
    try {
      const hash = bcrypt.hashSync(user.password, 8);
      user.password = hash;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    return next();
  }
});

module.exports = model("user", userSchema);
