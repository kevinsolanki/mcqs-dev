const { Router } = require("express");
const { signIn, signUp, verify } = require("../controllers/auth.controller");
const {validator} = require("../utils/validator");
const { userSignInSchema,userSignUpSchema, tokenSchema } = require("../validators/auth.validator");
const { verifyToken } = require("../middlewares/verify.middleware");

const router = Router();

router.post("/signin", validator(userSignInSchema), signIn);
router.post("/signup",verifyToken('super-admin') ,validator(userSignUpSchema), signUp);
router.post("/verify",validator(tokenSchema), verify);

module.exports = router;
