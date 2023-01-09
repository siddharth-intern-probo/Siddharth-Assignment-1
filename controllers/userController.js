const asyncHandler = require("express-async-handler");
const {User} = require("../models/userModel");
const generateToken = require("../config/tokenGenerator")

const checkEmail = (email)=>{
    var emailFormat =  /^[a-zA-Z0-9_.+]*[a-zA-Z][a-zA-Z0-9_.+]*@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (email !== '' && email.match(emailFormat))
        return false; 
    return true;
}

const checkphoneNumber = (phoneNumber)=>{
    if(phoneNumber !== '' && phoneNumber >= "1000000000" && phoneNumber <= "9999999999")
        return false;
    return true;
}

// check for user email before entry
const createUser = asyncHandler(async(req,res)=>{
    let u = new User();
    try{
        user = await u.getUserByEmail(req.body.email);
        console.log(user);
        if(!req.body.first_name || !req.body.last_name || !req.body.email || !req.body.mobile || !req.body.age) {
            res.status(204).json({message: "Please fill all the fields"});
        } else if(user.length>0) {
            res.status(409).json({message: "User already exists"});
        } else if(typeof req.body.first_name !== 'string' || typeof req.body.last_name !== 'string' || 
        typeof req.body.email !== 'string'|| typeof req.body.mobile!=='string' || typeof req.body.age!=='number') {
            res.status(400).json({message: "Invalid data type"});
        } else if(checkEmail(req.body.email)) {
            res.status(400).json({message: "Invalid email"});
        } else if(checkphoneNumber(req.body.mobile)) {
            res.status(400).json({message: "Invalid phone number"});
        } else {
            let user1 = await u.createUser(req.body.first_name,req.body.last_name,req.body.email,req.body.mobile,req.body.age);
            res.status(200).json({"firstName":req.body.first_name,
            "lastName":req.body.last_name,    
            "email":req.body.email,
            "mobile":req.body.mobile,
            "pic":req.body.pic,
            "token": generateToken(user1),
            "message": "User created"});
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({message: "Something went wrong"});
    }
});

const getUsers = asyncHandler(async(req,res)=>{
    let u = new User();
    let offValue = req.query.page;
    let val = req.query.limit;
    try {
        const users = await u.getUsers(val, offValue);
        res.status(200).json(users);
    } catch(err) {
        console.log(err);
        res.status(500).json({message: "Something went wrong"});
    } 
});

const updateUser = asyncHandler(async(req,res)=>{
    let u = new User();
    req.params.id = parseInt(req.params.id)
    var id = req.params.id;
    assert(!isNaN(id), 'id should be a number');
    assert(typeof id === 'number', 'id must be a number');
    const user = await u.getUserByID(id);
    if(user.length === 0) {
        res.status(404).json({message: "User not found"});
    } else{
        try{
            if(checkEmail(req.body.email)){
                res.status(400).json({message: "Invalid email"});
            }else if(checkphoneNumber(req.body.mobile)){
                res.status(400).json({message: "Invalid phone number"});
            }else{
                const users = await u.updateUser(req);
                res.status(200).json({"firstName":req.body.first_name,
                "lastName":req.body.last_name,    
                "email":req.body.email,
                "mobile":req.body.mobile,
                "age":req.body.age,
                "message": "User updated"});
            }
        }catch(err){
            res.status(500).json({message: `${err}`});
        }
    }
})

const deleteUser = asyncHandler(async(req,res)=>{
    let u = new User();
    req.params.id = parseInt(req.params.id)
    var id = req.params.id;
    assert(!isNaN(id), 'id should be a number');
    assert(typeof id === 'number', 'id must be a number');
    const user = await u.getUserByID(id);
    if(user.length === 0) {
        res.status(404).json({message: "User not found"});
    } else{
        try{
            users = await u.deleteUser(req.params.id);
            console.log(users);
            res.status(200).json({"message":"User deleted"});
        }catch(err){
            res.status(500).json({message: `${err}`});
        }
    }
})

module.exports = {createUser,getUsers,updateUser,deleteUser};