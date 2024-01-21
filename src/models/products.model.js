const db = require('../lib/db.lib')



// exports.findAll = async (keyword = '', sortBy, order, page = 1) => {
//     const visibleColumn = ['id', 'createdAt', 'name', 'basePrice']
//     const allowOrder = ['asc', 'desc']
//     const limit = 6;
//     const offset = (page - 1) * limit

//     sortBy = visibleColumn.includes(sortBy) ? `"p"."${sortBy}"` : '"p"."id"'
//     order = allowOrder.includes(order) ? order : 'asc'

//     const sql = `
//     SELECT 
//         "p"."id",
//         "p"."image",
//         "p"."name",
//         "p"."description",
//         "p"."basePrice",
//         "p"."createdAt",
//         "c"."name" AS "categoryName"
//     FROM "products" "p"
//     LEFT JOIN "productCategories" "pc" ON "p"."id" = "pc"."productid"
//     LEFT JOIN "categories" "c" ON "pc"."categoryid" = "c"."id"
//     WHERE "p"."name" ILIKE $1
//     ORDER BY "c"."name" ${order}, ${sortBy} ${order}
//     LIMIT ${limit} OFFSET ${offset}`

//     const values = [`%${keyword}%`]
//     const { rows } = await db.query(sql, values)
//     return rows
// }

exports.findCombine = async (id) => {
    const sql = `
    SELECT
    "p"."id",
    "p"."name",
    "p"."description",
    "p"."basePrice",
    "p"."image",
    (
        SELECT jsonb_build_object(
            'id', "ps"."id",
            'size', "ps"."size",
            'additionalPrice', "ps"."additionalPrice"
        )
    ) as "sizes",
    (
        SELECT jsonb_build_object(
            'id', "pv"."id",
            'name', "pv"."name",
            'additionalPrice', "pv"."additionalPrice"
        )
    ) as "variants",
    "p"."discount",
    "p"."isRecommended",
    "p"."createdAt",
    "p"."updateAt"
    FROM "products" "p"
    LEFT JOIN "productVariant" "pv" ON "pv"."productid" = "p"."id"
    LEFT JOIN "productSize" "ps" ON "ps"."productid" = "p"."id"
    WHERE "p"."id" = $1
    GROUP BY "p"."id", "ps"."productid", "ps"."id", "pv"."productid", "pv"."id"
    `
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows
}


exports.findOne = async (id)=>{
    const sql = `SELECT * FROM "products" WHERE id = $1`
    const values = [id]
    const {rows} = await db.query(sql, values)
    return rows[0]
} 

exports.findAll = async (searchKey='', sortBy="id", order="ASC", page, limit, best_seller) => {
    const orderType = ["ASC", "DESC"]
    order = orderType.includes(order)? order : "ASC"


    const limitData = limit
    const offset = (page - 1) * limitData

    if(sortBy === "categories"){
        const sql = `
        SELECT 
        "p"."id", "p"."name", "p"."description", "p"."basePrice", "p"."image",
        "p"."discount", "p"."isRecommended", "p"."createdAt",

        

        "categories"."name" AS "category"
        FROM "products" "p"
        JOIN "productCategories" "pc" on ("pc"."productid" = "p"."id")
        JOIN "categories" on ("categories"."id" = "pc"."categoryId")

        

        WHERE "p"."name" ILIKE $1 ${best_seller ? 'AND "isRecommended" = true':''}
        ORDER BY "${sortBy}"."name" ${order}
        LIMIT ${limitData} OFFSET ${offset}
        `
        console.log(sql)
        const values =[`%${searchKey}%`]
        const {rows} = await db.query(sql, values)
        if(!rows.length){
            throw new Error(`no data found`)
        }
        return rows
    }

    if(typeof sortBy === "object"){
        const sortByColumn = ["id", "name", "basePrice", "createdAt", "categories"]
        const columnSort = []

        if(sortBy.includes("categories")){
            sortBy.map(item => {
                if(sortByColumn.includes(item)){
                    if(item === "categories"){
                        columnSort.push(`"${item}"."name" ${order}`)
                        return
                    }
                 columnSort.push(`"p"."${item}" ${order}`)
                }
             })
             
             const sql = `
             SELECT 
             "p"."id", "p"."name", "p"."description", "p"."basePrice", "p"."image",
             "p"."discount", "p"."isRecommended", "p"."createdAt", "categories"."name" AS "category"
             FROM "products" "p"
             JOIN "productCategories" "pc" on ("pc"."productid" = "p"."id")
             JOIN "categories" on ("categories"."id" = "pc"."categoryId")
             WHERE "p"."name" ILIKE $1
             ORDER BY ${columnSort.join(', ')}
             LIMIT ${limitData} OFFSET ${offset}
             `
             console.log(sql)
             const values =[`%${searchKey}%`]
             const {rows} = await db.query(sql, values)
             if(!rows.length){
                 throw new Error(`no data found`)
             }
             return rows
        }
        
        sortBy.map(item => {
           if(sortByColumn.includes(item)){
            columnSort.push(`"${item}" ${order}`)
           }
        })
        
        const sql = `
        SELECT * 
        FROM "products" WHERE "name" ILIKE $1
        ORDER BY ${columnSort.join(', ')}
        LIMIT ${limitData} OFFSET ${offset}
        `
        const values =[`%${searchKey}%`]
        const {rows} = await db.query(sql, values)
        if(!rows.length){
            throw new Error(`no data found`)
        }
        return rows
    }

    const sql = 
    `
    SELECT *
    FROM "products" WHERE "name" ILIKE $1 ${best_seller ? 'AND "isRecommended" = true':''}
    ORDER BY "${sortBy}" ${order}
    LIMIT ${limitData} OFFSET ${offset}
    `
    // `SELECT "p".*,
    // "t"."name" as "tag"
    // FROM "products" "p" 
    
    // LEFT join "tags" "t" on ("t"."id" = "p"."tagid")
    // WHERE "p"."name" ILIKE $1 ${best_seller ? 'AND "isRecommended" = true' : ''}
    // GROUP BY "p"."id", "t"."name"
    // ORDER BY "p"."${sortBy}" ${order}
    // LIMIT ${limitData} OFFSET ${offset}
    // `
    const values =[`%${searchKey}%`]
    const {rows} = await db.query(sql, values)
    if(!rows.length){
        throw new Error(`no data found`)
    }
    return rows
}


// exports.countAll = async (searchKey='') => {
//         const sql = `SELECT COUNT("id") AS "counts" FROM "products" WHERE "name" ILIKE $1`
//         const values = [`%${searchKey}%`]
//         const {rows} = await db.query(sql, values)
//         return rows[0].counts
// }

exports.countAll = async (keyword='')=>{
    // const visibleColumn = ['id', 'createdAt', 'name', 'basePrice']
    // const allowOrder = ['asc', 'desc']
    //const limit = 4;
    // const offset = (page - 1) * limit

    // sortBy = visibleColumn.includes(sortBy) ? `"p"."${sortBy}"` : '"p"."id"'
    // order = allowOrder.includes(order) ? order : 'asc'

    const sql = `
    SELECT count(id) as counts
       
    FROM "products"
    WHERE "name" ILIKE $1`
    const values = [`%${keyword}%`]
    const { rows } = await db.query(sql, values)
    return rows[0].counts
}

exports.insert = async (data)=>{
    const sql = `INSERT INTO "products" 
    ("name","description","basePrice","image","discount","isRecommended")
    VALUES
    ($1,$2,$3,$4,$5,$6)
    RETURNING * `
    const values = [data.name,data.description,data.basePrice,data.image,data.discount,data.isRecommended]
    const {rows} = await db.query(sql, values)
    return rows[0]
} 

exports.update = async (id,data) => { 
    const column = []
    const values = []
    values.push(parseInt(id))
    for (let item in data){
        values.push(data[item])
        column.push(`"${item}"=$${values.length}`)
    }
    const sql = `UPDATE "products" SET ${column.join(', ')}, "updateAt" = now() WHERE id=$1 RETURNING *`
    const{rows} = await db.query(sql,values)
    return rows[0]
}

exports.delete = async(id)=>{
    const sql = `DELETE FROM "products" WHERE id=$1 RETURNING *`
    const values = [id]
    const {rows} = await db.query(sql,values)
    return rows[0]
}