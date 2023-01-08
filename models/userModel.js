const db = require('../config/db');
const { deleteUser } = require('../controllers/userController');

class User{
    constructor(first_name,last_name,email,mobile,age){
        this.first_name = first_name;
        this.last_name = last_name;
        this.mobile = mobile;
        this.age = age;
        this.email = email;
    }
    
    async createUser(){
        let sql = `insert into user(first_name,last_name,email,mobile,age)
         values('${this.first_name}','${this.last_name}','${this.email}',${this.mobile},'${this.age}')`;
         const [newUser, _] = await db.execute(sql);
        return newUser.insertId;
    }

    async getUsers(){
        let sql = `select * from user`;
    }

    async updateUser(req){
        let sql = `update user set first_name = '${req.body.first_name}', last_name = '${req.body.last_name}', email = '${req.body.email}', mobile = ${req.body.mobile}, age = '${req.body.age}' where id = ${req.params.id}`;
    }

    async deleteUser(id){
        let sql = `delete from user where id = ${id}`;
    }
}
module.exports = {User};