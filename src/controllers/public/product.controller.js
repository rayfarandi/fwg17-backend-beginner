const productModel = require('../../models/products.model')
const uploadMiddlware = require('../../middlewares/upload.middlewares')
const upload = uploadMiddlware('products').single('image')
const fs = require('fs/promises')
const path =require('path')

exports.getAllproducts = async (req,res)=>{
try{const {search,sortBy,order,page=1} = req.query
const count = parseInt(await productModel.countAll(search))
   const products = await productModel.findAll(search,sortBy,order,page)
   if (products.length <1){
    throw new Error('no data')
   }

   const totalPage = Math.ceil(count/4)
   const nextPage = parseInt(page) + 1
   const prevPage = parseInt(page) - 1
   
   return res.json({
    success :true,
    message : 'list All product',
    pageinfo:{
        currenPage: parseInt(page),
        totalPage,
        nextPage: nextPage <= totalPage ? nextPage:null,
        prevPage: prevPage >= 1 ? prevPage:null,
        totalData: count
    },
    results : products
    })
}catch(err){
    if (err.message === 'no data'){
        return res.status(404).json({
            success: false,
            message: 'tidak ada data'
        })
    }console.log(err)
    return res.json({
        success: false,
        message: 'internal server error'
    })
}
    }

exports.getDetailproduct = async (req,res)=>{
// mendefininikan fungsi getdataproduct, parameter fungsi arrow untuk mewakili req dan res
     const id = parseInt(req.params.id)
     const product = await productModel.findOne(id)
    // melakukan filter product untuk mendapatkan data product dengan ID yang sesuai,dan konfersi id dari string ke nomor
    if(!product){
    // garding, jika array kosong maka
        return res.status(404).json({
        // kembalikan resposn status 404 ke penguna
            success:false,
            message:'product not found'
            // cetak ke penguna
        })
    }
        return res.json({
        // kembalikan jika penguna ditemukan, kirim respons json
            success: true,
            message: 'ok',
            // cetak ke penguna
            results:product
            // kembalikan data product yg di masukan dari pengguna dengan id
        })    
}



