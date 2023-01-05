const asyncHandler = require("express-async-handler");
const {User} = require("../models/userModel");
const pool = require("../config/db");

// check for user email before entry
const createUser = asyncHandler(async(req,res)=>{
    let data = new User(req.body.first_name,req.body.last_name,req.body.email,req.body.mobile,req.body.age);
    let user = await data.save();
   res.status(200).json(user);
});

const getUsers = asyncHandler(async(req,res)=>{
    let sql = `select * from user`;
    const [users, _] = await pool.execute(sql);
    res.status(200).json(users);
});

const updateUser = asyncHandler(async(req,res)=>{
    let sql = `update user set first_name = '${req.body.first_name}', last_name = '${req.body.last_name}', email = '${req.body.email}', mobile = ${req.body.mobile}, age = '${req.body.age}' where id = ${req.params.id}`;
    const [users, _] = await pool.execute(sql);
    res.status(200).json(users);
})

const deleteUser = asyncHandler(async(req,res)=>{
    let sql = `delete from user where id = ${req.params.id}`;
    const [users, _] = await pool.execute(sql);
    res.status(200).json(users);
})

module.exports = {createUser,getUsers,updateUser,deleteUser};