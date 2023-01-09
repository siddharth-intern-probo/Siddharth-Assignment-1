const db = require('../config/db');

class User{
    async createUser(first_name,last_name,email,mobile,age){
        let sql = `insert into user(first_name,last_name,email,mobile,age)
         values('${first_name}','${last_name}','${email}',${mobile},'${age}')`;
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