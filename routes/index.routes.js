const router = require('express').Router()

const authRoutes = require('./auth.routes')
const superAdminRoutes = require('./super-admin.routes')


router.use("/auth",authRoutes)
router.use('/super-admin',superAdminRoutes)





module.exports = router;