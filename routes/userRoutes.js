const express = require("express");
const {createUser, getUsers, updateUser, deleteUser} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router()

router.route('/createUser').post(createUser)
router.route(`/getUsers`).get(protect, getUsers);
router.route('/updateUser/:id').put(protect, updateUser);
router.route('/deleteUser/:id').delete(protect, deleteUser);

module.exports=router;