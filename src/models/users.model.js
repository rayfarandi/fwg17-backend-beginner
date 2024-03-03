const db = require('../lib/db.lib')
const argon = ('argon2')
const { isCheck, isStringCheck, updateColumn } = require('../moduls/check')

// exports.findAll = async ()=>{
//     const sql = `SELECT * FROM "users"`
//     const values = []
//     const {rows} = await db.query(sql, values)
//     return rows
// } 
exports.findAll = async (searchKey='', sortBy="id", order="ASC", page, limit) => {
    const orderType = ["ASC", "DESC"]
    order = orderType.includes(order)? order : "ASC"
    
    
    const offset = (page - 1) * limit

    if(typeof sortBy === "object"){
        const sortByColumn = ['id', 'fullName', 'email', 'createdAt']
        let columnSort = []

        sortBy.forEach(item => {
           if(sortByColumn.includes(item)){
            columnSort.push(`"${item}" ${order}`)
           }
        })
    
        const sql = `
        SELECT *
        FROM "users" WHERE "fullName" ILIKE $1
        ORDER BY ${columnSort.join(', ')}
        LIMIT ${limit} OFFSET ${offset}
        `
        console.log(sql)
        const values = [`%${searchKey}%`]
        const {rows} = await db.query(sql, values)
        if(!rows.length){
            throw new Error(`no data found`)
        }
        return rows
    }

    const sql = `
    SELECT *
    FROM "users" WHERE "fullName" ilike $1
    ORDER BY "${sortBy}" ${order}
    LIMIT ${limit} OFFSET ${offset}
    `
    console.log(sql)
    const values = [`%${searchKey}%`]
    const {rows} = await db.query(sql, values)
    if(!rows.length){
        throw new Error(`no data found`)
    }
    return rows
}

exports.countAll = async (searchKey='') => {
    const sql = `SELECT COUNT("id") AS "counts" FROM "users" WHERE "fullName" ILIKE $1`
    const values = [`%${searchKey}%`]
    const {rows} = await db.query(sql, values)
    return rows[0].counts
}

exports.findOne = async (id)=>{
    const sql = `SELECT * FROM "users" WHERE id = $1`
    const values = [id]
    const {rows} = await db.query(sql, values)
    if(!rows.length){
        throw new Error(`user id ${id} not found` )
    }
    return rows[0]
}
isExis = async (table, uniqueColumn, searchKey) => {
    const sql = `SELECT * FROM ${table} WHERE ${uniqueColumn} ILIKE $1`
    let values = [searchKey]
    const {rows} = await db.query(sql, values)

    if(rows.length){
        if (uniqueColumn === "email") {
            throw new Error(`${table} with ${uniqueColumn} ${rows[0].email} already exist`)
        }
    }
}
exports.findOneByEmail = async (email)=>{
    const sql = `SELECT * FROM "users" WHERE email = $1`
    const values = [email]
    const {rows} = await db.query(sql, values)
    return rows[0]
}
exports.insert = async (data)=>{
    const queryString = await isStringCheck("users", "email", data.email)
    if(queryString){
        throw new Error(queryString)
    }

    // if(data.password){
    //     data.password = await argon.hash(data.password)
    // }

    data.role='customer'
    const sql = `
    INSERT INTO "users"
    ("fullName", "email", "password", "address", "picture", "phoneNumber", "role")
    VALUES
    ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
    `
    
    const values = [data.fullName, data.email, data.password, data.address, data.picture, data.phoneNumber, data.role]
    const {rows} = await db.query(sql, values)
    return rows[0]
    // const sql = `INSERT INTO "users" 
    // ("fullName","email","password","address","picture","phoneNumber","role")
    // VALUES
    // ($1,$2,$3,$4,$5,$6,$7)
    // RETURNING * `
    // const values = [data.fullName,data.email,data.password,data.address,data.picture,data.phoneNumber,data.role]
    // const {rows} = await db.query(sql, values)
    // return rows[0]
} 

exports.update = async (id,data) => {
  const column = []
  const values = []
  values.push(id)
  for(let item in data){

    if(data[item]){
      values.push(data[item])
      column.push(`"${item}"=$${values.length}`)
    }
  }

  const sql = `
  UPDATE "users"
  SET ${column.join(', ')}, "updateAt" = now()
  WHERE "id"=$1 
  RETURNING *
  `
  const {rows} = await db.query(sql, values)
  return rows[0]
}

// exports.update = async (id,data) => {
//   const column = []
//   const values = []
//   values.push(parseInt(id))
//   for (let item in data){

//     if(data[item]){
//         values.push(await(data[item]))
//         column.push(`"${item}"=$${values.length}`)
//     }
//   }
//     const sql = `UPDATE "users" SET ${column.join(', ')}, "updateAt" = now() WHERE id=$1 RETURNING *`
//     const {rows} = await db.query(sql, values)
//     return rows[0]
// }


exports.delete = async(id) =>{
const sql = `DELETE FROM "users" WHERE id=$1 RETURNING *`
    const values = [id]
    const {rows} = await db.query(sql,values)
    return rows[0]
}

// exports.delete = async (id) => {
//     try {
//         if (isNaN(id)) {
//             throw new Error(`invalid input`);
//         }

//         const query = `SELECT "id" FROM "users"`;
//         const { rows } = await db.query(query);
//         const results = rows.map(item => item.id);

//         if (results.indexOf(id) === -1) {
//             throw new Error(`data with id ${id} not found`);
//         }

//         const sql = `DELETE FROM "users" WHERE "id" = $1 RETURNING *`;
//         const values = [id];
//         const { rows: deletedRows } = await db.query(sql, values);
//         return deletedRows[0];
//     } catch (error) {
//         throw new Error(error.message);
//     }
// }