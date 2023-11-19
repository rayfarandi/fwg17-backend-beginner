const db = require('../lib/db.lib')

exports.findAll = async ()=>{
    const sql = `SELECT * FROM "products"`
    const values = []
    const {rows} = await db.query(sql, values)
    return rows
} 

exports.findOne = async (id)=>{
    const sql = `SELECT * FROM "products" WHERE id = $1`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
} 

exports.insert = async (data)=>{
    const sql = `INSERT INTO "products" 
    ("name","description","basePrice","image","discount","isRecommended")
    VALUES
    ($1,$2,$3,$4,$5,$6,$7)
    RETURNING * `
    const values = [data.name,data.description,data.basePrice,data.image,data.discount,data.isRecommended]
    const {rows} = await db.query(sql, values)
    return rows[0]
} 

// exports.updateproduct = async (data) => { // masih binggung
//     const sql = `UPDATE "products" SET
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
