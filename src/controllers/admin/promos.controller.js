const promoModel = require('../../models/promos.model')
const { errorHelper } = require('../../moduls/check')

exports.getAllpromos = async (req,res)=>{
    try {
        const {searchKey, sortBy, order, page=1, limit} = req.query
        const limitData = parseInt(limit) || 5

        const count = await promoModel.countAll(searchKey)   
        const listPromo = await promoModel.findAll(searchKey, sortBy, order, page, limitData)
        
        const totalPage = Math.ceil(count / limitData)
        const nextPage = parseInt(page) + 1
        const prevPage = parseInt(page) - 1

        return res.json({                                                              
            success: true,
            message: `List all promo`,
            pageInfo: {
                currentPage: parseInt(page),
                totalPage,
                nextPage: nextPage <= totalPage ? nextPage : null,
                prevPage: prevPage >= 1 ? prevPage : null,
                totalData: parseInt(count)
            },
            results: listPromo                                                    
        })
    } catch (error) {
        errorHelper(error, res)
    }
}

exports.getDetailPromo = async (req, res) => {                                        
    try {
        const promo = await promoModel.findOne(parseInt(req.params.id))
        return res.json({                                                              
            success: true,
            message: 'detail promo',
            result: promo                                                  
        })
    } catch (error) {
        errorHelper(error, res)
    }
}

exports.countAll = async (searchKey='') => {
    const sql = `SELECT COUNT("id") AS "counts" FROM "promo" WHERE "name" ILIKE $1`
    const values = [`%${searchKey}%`]
    const {rows} = await db.query(sql, values)
    return rows[0].counts
}


// exports.createpromo = async (req, res) => {
//     try {
//         const promo = await promoModel.insert(req.body)
//         return res.json({
//             success: true,
//             message: 'create promo success',
//             results: promo
//         })
//     } catch (err) {
//         console.log(JSON.stringify(err))
//         if(err.code === "23502"){
//             return res.status(400).json({
//                 success: false,
//                 message: `${err.column} cannot be empty`
//         })
//     }
//         return res.status(400).json({
//             success: false,
//             message: 'error'
//         })
//     }
// }
exports.createPromo = async (req, res) => {
    try {
        const promo = await promoModel.insert(req.body) 
        return res.json({                                                              
            success: true,
            message: 'create promo successfully',
            result: promo                                                   
        })
        
    } catch (error) {
        return errorHelper(error, res)
    }
}



exports.updatePromo = async (req, res) => {
    try {
        const promo = await promoModel.update(parseInt(req.params.id), req.body)
        if(promo === "No data has been modified"){
            return res.status(200).json({                                                              
                success: true,
                message: promo                                                 
            })
        }
        return res.json({                                                              
            success: true,
            message: 'update promo successfully',
            result: promo                                                   
        })
    } catch (error) {
        errorHelper(error, res)
    }
}


exports.deletePromo = async (req, res) => {
    try {
        const promo = await promoModel.delete(parseInt(req.params.id)) 
        return res.json({                                                              
            success: true,
            message: 'delete promo successfully',
            result: promo                                                   
        })
    } catch (error) {
        errorHelper(error, res)
    }
}