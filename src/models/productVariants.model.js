const db = require('../lib/db.lib')

exports.findAll = async ()=>{
    const sql = `SELECT * FROM "productVariant"`
    const values = []
    const {rows} = await db.query(sql, values)
    return rows
} 

exports.findOne = async (id)=>{
    const sql = `SELECT * FROM "productVariant" WHERE id = $1`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
} 

exports.insert = async (data)=>{
    const sql = `INSERT INTO "productVariant" 
    ("name","productid","adittionalPrice")
    VALUES
    ($1,$2,$3)
    RETURNING * `
    const values = [data.name,data.productid,data.adittionalPrice]
    const {rows} = await db.query(sql, values)
    return rows[0]
} 

// exports.updateproductVariant = async (data) => { // masih binggung
//     const sql = `UPDATE "productVariants" SET
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
