const db = require('../lib/db.lib')
const { isExist, updateColumn } = require('../moduls/check')
const moment = require('moment')


exports.findAll = async (id, page, limit, status) => {
    const limitData = limit
    const offset = (page - 1) * limitData

    const sql = `
    SELECT *
    FROM "orders" WHERE "userId" = $1 ${status ? 'AND "status" = $2' : ''}
    ORDER BY "createdAt" DESC
    LIMIT ${limitData} OFFSET ${offset}
    `
    const values = status ? [id, status] : [id]
    const {rows} = await db.query(sql, values)
    if(!rows.length){
        throw new Error(`no data found`)
    }
    return rows
}




exports.countAll = async (id, status) => {
    const sql = `SELECT COUNT("userId") AS "counts" FROM "orders" WHERE "userId" = $1 ${status ? 'AND "status" = $2' : ''}`
    const values = status ? [id, status] : [id]
    const {rows} = await db.query(sql, values)
    return rows[0].counts
}



exports.findOne = async (id) => {
    const sql = `
    SELECT *
    FROM "orders" WHERE "id" = $1
    `
    const  values = [id]
    const {rows} = await db.query(sql, values)
    if(!rows.length){
        throw new Error(`order with id ${id} not found `)
    }
    return rows[0]
}


exports.insert = async (userId, body) => {

    const date = moment(new Date())
    const orderNumber = `${date.format('YY')}${date.format('M').padStart(2, '0')}${date.format('D').padStart(2, '0')}${Math.floor(Math.random()*1000)}`

    const sql = `
    INSERT INTO "orders"
    ("userId", "orderNumber", "total", "subTotal", "tax", "deliveryFee", "deliveryShipping", "status", "deliveryAddress", "fullName", "email")
    VALUES
    (
    $1, $2, $3, $4, $5, $6, $7, $8,
    (select "address" from "users" where "id" = $1),
    (select "fullName" from "users" where "id" = $1),
    (select "email" from "users" where "id" = $1)
    )
    RETURNING *
    `
    const values = [userId, orderNumber, body.total, body.subTotal, body.tax, body.deliveryFee, body.deliveryShipping, body.status]
    const {rows} = await db.query(sql, values)
    return rows[0]
}


exports.update = async (id, body) => {
    if(isNaN(id)){
        throw new Error(`invalid input`)
    }

    const queryId = await isExist("orders", id)
    if(queryId){
        throw new Error(queryId)
    }

    return await updateColumn(id, body, "orders")
}


exports.delete = async (id) => {
    if(isNaN(id)){
        throw new Error(`invalid input`)
    }

    const queryId = await isExist("orders", id)
    if(queryId){
        throw new Error(queryId)
    }

    const sql = `DELETE FROM "orders" WHERE "id" = $1 RETURNING *`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}