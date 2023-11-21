const db = require('../lib/db.lib')

// exports.findAll = async (keyword='',sortBy, order, page=1)=>{
//     const visibleColumn = ['id','created_at','name']
//     const allowOrder = ['asc','desc']
//     const limit = 15
//     const offset = (page - 1) * limit

//     sortBy = visibleColumn.includes(sortBy) ? sortBy : 'id'
//     order = allowOrder.includes(order) ? order : 'asc'
//     const sql = 
//     `SELECT "id","image","name","description","basePrice","created_at"
//     FROM "products" WHERE "name" ILIKE $1 ORDER BY ${sortBy} ${order} LIMIT ${limit} OFFSET ${offset}`
//     const values = [`%${keyword}%`]
//     const {rows} = await db.query(sql, values)
//     return rows
// } 

 
// exports.findAll = async (keyword = '', sortBy, order, page = 1) => {
//     const visibleColumn = ['id', 'created_at', 'name', 'basePrice'];
//     const allowOrder = ['asc', 'desc'];
//     const limit = 4;
//     const offset = (page - 1) * limit;

//     sortBy = visibleColumn.includes(sortBy) ? `"p"."${sortBy}"` : '"p"."id"';
//     order = allowOrder.includes(order) ? order : 'asc';

//     const sql = `
//     SELECT 
//         "p"."id",
//         "p"."image",
//         "p"."name",
//         "p"."description",
//         "p"."basePrice",
//         "p"."created_at",
//         "c"."name" AS "categoryName"
//     FROM "products" "p"
//     LEFT JOIN "productCategories" "pc" ON "p"."id" = "pc"."productid"
//     LEFT JOIN "categories" "c" ON "pc"."categoryid" = "c"."id"
//     WHERE "p"."name" ILIKE $1
//     ORDER BY ${sortBy} ${order}
//     LIMIT ${limit} OFFSET ${offset}`;

//     const values = [`%${keyword}%`];
//     const { rows } = await db.query(sql, values);
//     return rows;
// }

exports.findAll = async (keyword = '', sortBy, order, page = 1) => {
    const visibleColumn = ['id', 'created_at', 'name', 'basePrice']
    const allowOrder = ['asc', 'desc']
    const limit = 4;
    const offset = (page - 1) * limit

    sortBy = visibleColumn.includes(sortBy) ? `"p"."${sortBy}"` : '"p"."id"'
    order = allowOrder.includes(order) ? order : 'asc'

    const sql = `
    SELECT 
        "p"."id",
        "p"."image",
        "p"."name",
        "p"."description",
        "p"."basePrice",
        "p"."created_at",
        "c"."name" AS "categoryName"
    FROM "products" "p"
    LEFT JOIN "productCategories" "pc" ON "p"."id" = "pc"."productid"
    LEFT JOIN "categories" "c" ON "pc"."categoryid" = "c"."id"
    WHERE "p"."name" ILIKE $1
    ORDER BY "c"."name" ${order}, ${sortBy} ${order}
    LIMIT ${limit} OFFSET ${offset}`

    const values = [`%${keyword}%`]
    const { rows } = await db.query(sql, values)
    return rows
}


// exports.findAll = async (keyword = '', sortBy, order, page = 1) => {

//     const visibleColumn = ['id', 'created_at', 'name'];

//     const allowOrder = ['asc', 'desc'];
//     const limit = 4;
//     const offset = (page - 1) * limit;

//     sortBy = visibleColumn.includes(sortBy) ? sortBy : 'id';
//     order = allowOrder.includes(order) ? order : 'asc';

//     const sql = `
//     SELECT 
//         "p"."id",
//         "p"."image",
//         "p"."name",
//         "p"."description",
//         "p"."basePrice",
//         "p"."created_at",
//         "c"."name" AS "categoryName"
//     FROM "products" "p"
//     LEFT JOIN "productCategories" "pc" ON "p"."id" = "pc"."productid"
//     LEFT JOIN "categories" "c" ON "pc"."categoryid" = "c"."id"
//     WHERE "p"."name" ILIKE $1
//     ORDER BY "c"."name" ${sortBy} ${order}
//     LIMIT ${limit} OFFSET ${offset}`;

//     const values = [`%${keyword}%`];
//     const { rows } = await db.query(sql, values);
//     return rows;
// }


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
    const sql = `UPDATE "products" SET ${column.join(', ')}, "update_at" = now() WHERE id=$1 RETURNING *`
    const{rows} = await db.query(sql,values)
    return rows[0]
}

exports.delete = async(id)=>{
    const sql = `DELETE FROM "products" WHERE id=$1 RETURNING *`
    const values = [id]
    const {rows} = await db.query(sql,values)
    return rows[0]
}