const db = require('../lib/db.lib')

exports.findAll = async ()=>{
    const sql = `SELECT * FROM "categories"`
    const values = []
    const {rows} = await db.query(sql, values)
    return rows
} 

exports.findOne = async (id)=>{
    const sql = `SELECT * FROM "categories" WHERE id = $1`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
} 

exports.insert = async (data)=>{
    const sql = `INSERT INTO "categories" 
    ("name")
    VALUES
    ($1)
    RETURNING * `
    const values = [data.name]
    const {rows} = await db.query(sql, values)
    return rows[0]
} 

// exports.updatecategorie = async (data) => { // masih binggung
//     const sql = `UPDATE "categories" SET
//     "name" = $1,
//     "email" = $2,
//     "password" = $3,
//     "address" = $4,
//     "picture" = $5,
//     "phoneNumber" = $6,
//     "role" = $7
//     WHERE "id" = $8
//     RETURNING *`

//     const values = [data.fullName, data.email, data.password, data.address, data.picture, data.phoneNumber, data.role, data.id];

//     const {rows} = await db.query(sql, values)
//     return rows[0];
// }
