const express = require('express');
const { AdminLogin, AddNewAdmin} = require("../controllers/AdminLoginController");
const router = express.Router()
router.route('/').post(AdminLogin)
router.route('/new').post(AddNewAdmin)

module.exports = router
