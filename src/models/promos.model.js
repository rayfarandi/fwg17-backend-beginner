const db = require('../lib/db.lib')
const { updateColumn,isStringCheck,isCheck } = require('../moduls/check')

exports.findAll = async (searchKey='', sortBy="id", order="ASC", page, limit) => {
    const orderType = ["ASC", "DESC"]
    order = orderType.includes(order)? order : "ASC"
    
    const limitData = limit
    const offset = (page - 1) * limitData

    if(typeof sortBy === "object"){
        const sortByColumn = ['id', 'name','percentage', 'maximumPromo', 'minimumAmount', 'createdAt']
        let columnSort = []

        sortBy.forEach(item => {
           if(sortByColumn.includes(item)){
            columnSort.push(`"${item}" ${order}`)
           }
        })
    
        const sql = `
        SELECT * 
        FROM "promo" WHERE "name" ILIKE $1
        ORDER BY ${columnSort.join(', ')}
        LIMIT ${limitData} OFFSET ${offset}
        `
        const values = [`%${searchKey}%`]
        const {rows} = await db.query(sql, values)
        if(!rows.length){
            throw new Error(`no data found `)
        }
        return rows
    }

    const sql = `
    SELECT *
    FROM "promo" WHERE "name" ilike $1
    ORDER BY "${sortBy}" ${order}
    LIMIT ${limitData} OFFSET ${offset}
    `
    console.log(sql)
    const values = [`%${searchKey}%`]
    const {rows} = await db.query(sql, values)
    if(!rows.length){
        throw new Error(`no data found `)
    }
    return rows
}

exports.findOne = async (id)=>{
    const sql = `
    SELECT *
    FROM "promo" WHERE "id" = $1
    `
    const  values = [id]
    const {rows} = await db.query(sql, values)
    if(!rows.length){
        throw new Error(`promo with id ${id} not found `)
    }
    return rows[0]
} 

exports.countAll = async (searchKey='') => {
    const sql = `SELECT COUNT("id") AS "counts" FROM "promo" WHERE "name" ILIKE $1`
    const values = [`%${searchKey}%`]
    const {rows} = await db.query(sql, values)
    return rows[0].counts
}

exports.insert = async (data)=>{
    const queryName = await isStringCheck("promo", "name", body.name) 
    if(queryName){
        throw new Error(queryName)
    }

    const queryCode = await isStringCheck("promo", "code", body.code)
    if(queryCode){
        throw new Error(queryCode)
    }

    const sql = `
    INSERT INTO "promo"
    ("name", "code", "description", "percentage", "expireadAt", "maximumPromo", "minimumAmount")
    VALUES
    ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
    `
    const values = [body.name, body.code, body.description, body.percentage, body.expireadAt, body.maximumPromo, body.minimumAmount]
    const {rows} = await db.query(sql, values)
    return rows[0]
} 

exports.updatepromo = async (data) => {
    if(isNaN(id)){
        throw new Error(`invalid input`)
    }

    const queryId = await isCheck("promo", id)
    if(queryId){
        throw new Error(queryId)
    }

    if(body.name){
        const queryString =  await isStringCheck("promo", "name", body.name)
        if(queryString){
            throw new Error (queryString)
        } 
    }else if(body.code){
        const queryString =  await isStringCheck("promo", "code", body.code)
        if(queryString){
            throw new Error (queryString)
        } 
    }

    return await updateColumn(id, body, "promo")
}

exports.delete = async (id) => {
    if(isNaN(id)){
        throw new Error(`invalid input`)
    }

    const queryId = await isCheck("promo", id)
    if(queryId){
        throw new Error(queryId)
    }
    const sql = `DELETE FROM "promo" WHERE "id" = $1 RETURNING *`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
}