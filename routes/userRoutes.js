const express = require("express");
const {createUser, getUsers, updateUser, deleteUser} = require("../controllers/userController");
const router = express.Router()

router.route('/createUser').post(createUser)
router.route(`/getUsers`).get(getUsers);
router.route('/updateUser/:id').put(updateUser);
router.route('/deleteUser/:id').delete(deleteUser);

module.exports=router;