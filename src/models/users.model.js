const db = require('../lib/db.lib')
const argon2 = require('argon2')

exports.findAll = async ()=>{
    const sql = `SELECT * FROM "users"`
    const values = []
    const {rows} = await db.query(sql, values)
    return rows
} 

exports.findOne = async (id)=>{
    const sql = `SELECT * FROM "users" WHERE id = $1`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
} 
exports.findOneByEmail = async (email)=>{
    const sql = `SELECT * FROM "users" WHERE email = $1`
    const values = [email]
    const {rows} = await db.query(sql, values)
    return rows[0]
}
exports.insert = async (data)=>{
    const sql = `INSERT INTO "users" 
    ("fullName","email","password","address","picture","phoneNumber","role")
    VALUES
    ($1,$2,$3,$4,$5,$6,$7)
    RETURNING * `
    const values = [data.fullName,data.email,data.password,data.address,data.picture,data.phoneNumber,data.role]
    const {rows} = await db.query(sql, values)
    return rows[0]
} 

exports.update = async (id,data) => {
  const column = []
  const values = []
  values.push(parseInt(id))
  for (let item in data){
    values.push(await argon2.hash(data[item]))
    column.push(`"${item}"=$${values.length}`)
  }
    const sql = `UPDATE "users" SET ${column.join(', ')}, "update_at" = now() WHERE id=$1 RETURNING *`
    const {rows} = await db.query(sql, values)
    return rows[0]
}

// exports.update = async (id, data) => {
//     try {
//         const column = [];
//         const values = [parseInt(id)];

//         // if (data.password) {
//         //     data.password = await argon2.hash(data.password);
//         // }

//         for (let item in data) {
//             values.push(data[item]);
//             column.push(`"${item}"=$${values.length}`);
//         }

//         const sql = `UPDATE "users" SET ${column.join(', ')}, "update_at" = now() WHERE id=$1 RETURNING *`;
//         const { rows } = await db.query(sql, values);
//         return rows[0];
//     } catch (error) {
//         console.error('Error updating user:', error);
//         throw error;
//     }
// }



exports.delete = async(id) =>{
const sql = `DELETE FROM "users" WHERE id=$1 RETURNING *`
    const values = [id]
    const {rows} = await db.query(sql,values)
    return rows[0]
}