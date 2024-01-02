const productModel = require('../../models/products.model')

const errorHandler = require('../../moduls/handling')


exports.getAllproducts = async (req, res) => {   
    try {
        const {searchKey, sortBy, order, page=1, limit, best_seller} = req.query
        const limitData = parseInt(limit) || 6

        const count = await productModel.countAll(searchKey)
        const listProducts = await productModel.findAll(searchKey, sortBy, order, page, limitData, best_seller)

        const totalPage = Math.ceil(count / limitData)
        const nextPage = parseInt(page) + 1
        const prevPage = parseInt(page) - 1

        return res.json({
            success: true,
            message: 'List all products',
            pageInfo: {
                currentPage: parseInt(page),
                nextPage: nextPage <= totalPage ? nextPage : null,
                totalPage,
                prevPage: prevPage > 1 ? prevPage : null,
                totalData: parseInt(count)
            },
            results: listProducts
        })
    } catch (error) {
        errorHandler(error, res)
    }
}

exports.getDetailproduct = async (req, res) => {                                         
    try {
        const product = await productModel.findOne(req.params.id)
        return res.json({                                                              
            success: true,
            message: 'detail product',
            results: product                                                  
        })

    } catch (error) {
        errorHandler(error, res)
    }
}

// exports.getDetailproduct = async (req,res)=>{
// // mendefininikan fungsi getdataproduct, parameter fungsi arrow untuk mewakili req dan res
//      const id = parseInt(req.params.id)
//      const product = await productModel.findOne(id)
//     // melakukan filter product untuk mendapatkan data product dengan ID yang sesuai,dan konfersi id dari string ke nomor
//     if(!product){
//     // garding, jika array kosong maka
//         return res.status(404).json({
//         // kembalikan resposn status 404 ke penguna
//             success:false,
//             message:'product not found'
//             // cetak ke penguna
//         })
//     }
//         return res.json({
//         // kembalikan jika penguna ditemukan, kirim respons json
//             success: true,
//             message: 'ok',
//             // cetak ke penguna
//             results:product
//             // kembalikan data product yg di masukan dari pengguna dengan id
//         })    
// }



