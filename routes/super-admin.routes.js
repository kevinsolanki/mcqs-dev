const { Router } = require("express");
const { getAllRoles, addNewTech, getAllTech, deleteTech } = require("../controllers/super-admin.controller");
const {validator} = require("../utils/validator");
const { verifyToken } = require("../middlewares/verify.middleware");
const { createNewTechSchema, deleteTechSchema } = require("../validators/super-admin.validator");

const router = Router();

router.get('/roles',verifyToken('super-admin'), getAllRoles)
router.get('/techs',verifyToken('super-admin'), getAllTech)
router.post('/add-tech',verifyToken('super-admin'),validator(createNewTechSchema),addNewTech)
router.delete('/delete-tech/:techId',verifyToken('super-admin'),validator(deleteTechSchema), deleteTech)

module.exports = router;