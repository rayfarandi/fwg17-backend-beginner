const db = require('../lib/db.lib')

exports.findAll = async ()=>{
    const sql = `SELECT * FROM "promo"`
    const values = []
    const {rows} = await db.query(sql, values)
    return rows
} 

exports.findOne = async (id)=>{
    const sql = `SELECT * FROM "promo" WHERE id = $1`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
} 

exports.insert = async (data)=>{
    const sql = `INSERT INTO "promo" 
    ("name","code","description","percentage","maximumPromo","minimumAmount")
    VALUES
    ($1,$2,$3,$4,$5,$6)
    RETURNING * `
    const values = [data.name,data.code,data.description,data.percentage,data.maximumPromo,data.minimumAmount]
    const {rows} = await db.query(sql, values)
    return rows[0]
} 

exports.updatepromo = async (data) => {
    const sql = `UPDATE "promo" SET
    ("name","code","description","percentage","maximumPromo","minimumAmount")
    VALUES
    ($1,$2,$3,$4,$5,$6)
    RETURNING * `


    const values = [data.name];

    const {rows} = await db.query(sql, values)
    return rows[0];
}
