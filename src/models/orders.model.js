const db = require('../lib/db.lib')

exports.findAll = async ()=>{
    const sql = `SELECT * FROM "orders"`
    const values = []
    const {rows} = await db.query(sql, values)
    return rows
} 

exports.findOne = async (id)=>{
    const sql = `SELECT * FROM "orders" WHERE id = $1`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
} 

exports.insert = async (data)=>{
    const sql = `INSERT INTO "orders" 
    ("userid","orderNumber","total","taxAmount","status","deliveryAddress","fullName","email")
    VALUES
    ($1,$2,$3,$4,$5,$6,$7,$8)
    RETURNING * `
    const values = [data.userid,data.orderNumber,data.total,data.taxAmount,data.status,data.deliveryAddress,data.fullName,data.email]
    const {rows} = await db.query(sql, values)
    return rows[0]
} 

exports.updateorder = async (data) => {
    const sql = `UPDATE "orders" SET
    "name" = $1,
    RETURNING *`

    const values = [data.name];

    const {rows} = await db.query(sql, values)
    return rows[0];
}
