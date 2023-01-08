const db = require('../config/db');

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

    async getUsers(val, offValue){
        let sql = `select * from user limit ${val} offset ${(offValue-1)*2}`;
        const [users, _] = await db.execute(sql)
        return users;
    }

    async updateUser(req){
        let sql = `update user set first_name = '${req.body.first_name}', last_name = '${req.body.last_name}', email = '${req.body.email}', mobile = ${req.body.mobile}, age = '${req.body.age}' where id = ${req.params.id}`;
        const [users, _] = await db.execute(sql)
        return users;
    }

    async deleteUser(id){
        let sql = `delete from user where id = ${id}`;
        const [users, _] = await db.execute(sql)
        return users;
    }

    async getUserByID(id){
        let sql = `select * from user where id = '${id}'`; 
        const [users, _] = await db.execute(sql)
        return users;
    }

    async getUserByEmail(email){
        let sql = `select * from user where email = '${email}'`;
        const [users, _] = await db.execute(sql)
        return users;
    }
}
module.exports = {User};