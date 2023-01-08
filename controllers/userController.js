const asyncHandler = require("express-async-handler");
const {User} = require("../models/userModel");
const pool = require("../config/db");

// check for user email before entry
const createUser = asyncHandler(async(req,res)=>{
    let data = new User(req.body.first_name,req.body.last_name,req.body.email,req.body.mobile,req.body.age);
    let user = await data.createUser();
   res.status(200).json(user);
});

const getUsers = asyncHandler(async(_,res)=>{
    const [users, _] = await data.getUsers();
    res.status(200).json(users);
});

const updateUser = asyncHandler(async(req,res)=>{
    const [users, _] = await data.updateUser(req);
    res.status(200).json(users);
})

const deleteUser = asyncHandler(async(req,res)=>{
    const [users, _] = await data.deleteUser(req.params.id);
    res.status(200).json(users);
})

module.exports = {createUser,getUsers,updateUser,deleteUser};