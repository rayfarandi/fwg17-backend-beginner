const db = require('../lib/db.lib')

exports.findAll = async ()=>{
    const sql = `SELECT * FROM "orderDetails"`
    const values = []
    const {rows} = await db.query(sql, values)
    return rows
} 

exports.findOne = async (id)=>{
    const sql = `SELECT * FROM "orderDetails" WHERE id = $1`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
} 

exports.insert = async (data)=>{
    const sql = `INSERT INTO "orderDetails" 
    ("name")
    VALUES
    ($1)
    RETURNING * `
    const values = [data.name]
    const {rows} = await db.query(sql, values)
    return rows[0]
} 

exports.updateorderDetail = async (data) => {
    const sql = `UPDATE "orderDetails" SET
    "name" = $1,
    RETURNING *`

    const values = [data.name];

    const {rows} = await db.query(sql, values)
    return rows[0];
}
