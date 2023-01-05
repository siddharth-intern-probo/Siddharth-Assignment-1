const db = require('../config/db');

class User{
    constructor(first_name,last_name,email,mobile,age){
        this.first_name = first_name;
        this.last_name = last_name;
        this.mobile = mobile;
        this.age = age;
        this.email = email;
    }
    
    async save(){
        let sql = `insert into user(first_name,last_name,email,mobile,age)
         values('${this.first_name}','${this.last_name}','${this.email}',${this.mobile},'${this.age}')`;
         const [newUser, _] = await db.execute(sql);
        return newUser.insertId;
    }
    async findAll(){
        let sql = `select * from user`;
         const [newUser, _] = await db.execute(sql);
        return newUser.insertId;
    }
}
module.exports = {User};