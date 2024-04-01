const db = require('../lib/db.lib')
const argon = require('argon2')
const multer = require('multer')

exports.errorHelper = (error, res) => {
    console.log(error)
    if(error.code === "23502"){ // error not null constraint
        return res.status(400).json(
            {success: false,
            message: `${error.column} cannot be empty`})
    }else if(error.code === "23505"){ // error unique constraint
        return res.status(400).json(
            { success: false,
            message:`${error.detail.split(' ')[1].replaceAll(/[()="]/g, ' ').trim()} already exist` })
    }else if(error.code === "42703"){ // error column does not exist
        return res.status(400).json(
            {success: false,
                message: error.message.replaceAll('"', '')})
    }else if(error.code === "22P02"){ // error salah input type data
        return res.status(406).json(
            {success: false,
                message: error.message.replaceAll('"', '')})
    }else if(error.code === "23503"){ // error foreign key / keterkaitan table
        return res.status(409).json(
            {success: false,
                message: error.detail.replaceAll(/[()="]/g, ' ').replace('Key', 'data with')
        })
    }else if(error.message === 'no data found'){
        return res.status(404).json({
            success: false,
            message: 'no data found'
        })
    }else if(error.message.includes("found"))
    {// pesan n status error not found
        return res.status(404).json
        ({success: false,
            message: error.message
        })
    }else if(error.message.includes("not registered") || error.message.includes("wrong password") || error.message.includes("invalid token")){
            return res.status(401).json(
            {success: false,
                message: error.message
            })
    }else if(error.message === 'jwt must be provided'){
        return res.status(403).json(
            {success: false,
                message: error.message
            })
      }else if(!error.code){
        return res.status(400).json(
            {success: false,
                message: error.message                                              
            })
    }

    return res.status(500).json(
        {success: false,
        messages: `Internal server error`})
}



exports.isCheck = async (table, id) => {
    try {
        const query = `SELECT "id" FROM ${table}`
        const {rows} = await db.query(query)
        const results = rows.map(item => item.id)
        if(results.indexOf(id) === -1){
            throw new Error(`data with id ${id} not found`)
        }
    } catch (error) {
        return error.message
    }
}

exports.isStringCheck = async (table, uniqueColumn, searchKey) => {
    const sql = `SELECT * FROM 
    ${table} WHERE ${uniqueColumn} ILIKE $1`
    let values = [searchKey]
    const {rows} = await db.query(sql, values)

    if(rows.length){
        if(uniqueColumn === "name"){
            throw new Error(`${table} with ${uniqueColumn} ${rows[0].name} already exist`)
        }else if(uniqueColumn === "email"){
            throw new Error(`${uniqueColumn} ${rows[0].email} already registered`)
        }else if(uniqueColumn === "code"){
            throw new Error(`${uniqueColumn} ${rows[0].code} already exist`)
        }
    }
}



exports.updateColumn = async (id, data, table) => {
    if(Object.hasOwn(data, 'password')){
        data.password = await argon.hash(data.password)
    }



    const column = Object.keys(data)
    let values = [id, ...Object.values(data)]
    const set = column.map((item, index) => {
        return `"${item}" = $${index + 2}`
    })

    if(!set.length){
        return `No data has been modified`
    }

    const sql = `UPDATE ${table} SET ${set.join(', ')}, "updateAt" = now() WHERE "id" = $1 RETURNING *`
    const {rows} = await db.query(sql, values)
    return rows[0]
}

exports.randNumGen = () => {
    const result = Math.random(1).toPrecision(6).slice(2)
    return result
}




exports.multerErrorHelper = (err, req, res, next) => {
    console.log("Multer Error Handler:", err); // Tambahkan log untuk melihat apakah kesalahan tertangkap
    console.log("Error code:", err.code);
    console.log("Error message:", err.message);

    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
            success: false,
            message: 'File size the maximum limit 1.5 MB'
        });
    } else if (err.message === 'File extension allowed : JPEG, JPG, and PNG only') {                              
        return res.status(400).json({
            success: false,
            message: err.message
        });
    } else {
        return res.status(500).json({
            success: false,
            message: `Internal server error`
        });
    }
};


