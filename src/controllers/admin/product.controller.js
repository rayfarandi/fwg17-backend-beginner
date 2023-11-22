const productModel = require('../../models/products.model')
 
exports.getAllproducts = async (req,res)=>{
   const {search,sortBy,order,page} = req.query

   const products = await productModel.findAll(search,sortBy,order,page)
   
   return res.json({
    success :true,
    message : 'list All product',
    results : products
    })
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


// exports.createproduct = async (req, res) => {
//     try {
//         const product = await productModel.insert(req.body)
//         return res.json({
//             success: true,
//             message: 'create product success',
//             results: product
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
exports.createproduct = async (req, res) => {
    try {
        const product = await productModel.insert(req.body);
        return res.json({
            success: true,
            message: 'create product success',
            results: product
        })
    } catch (err) {
        console.log(JSON.stringify(err));

        switch (err.code) {
            case "23502":
                return res.status(400).json({
                    success: false,
                    message: `${err.column} cannot be empty`
                })
            default:
                return res.status(500).json({
                    success: false,
                    message: 'Internal server error'
                })
        }
    }
}



// exports.updateproduct = (req,res)=>{
// // mendefininikan fungsi updateproduct, parameter fungsi arrow untuk mewakili req dan res
//     const {id} = req.params
//     // mendapatkan id dari paramaeter yg di masukan product
//     const {name} = req.body
//     // mendapatkan name dari body paramaeter yg di masukan product
//     const productId = products.map(product => product.id).indexOf(parseInt(id))
//     //mengunakan metode map dan indexOf untuk mencari indeks pengguna dalam array products berdasarkan id dan di conversi menjadi angka yang diberikan dari penguna
//     if(productId === -1){
//     // apakah productid bernilai -1
//         return res.status(404).json({
//         // kembalikan resposn status 404 ke penguna
//             success: false,
//             message: 'product not found'
//             // cetak ke penguna
//         })
//     }
//         products[productId].name = name
//         // jika productid ditemukan/sama dari parameter yg di masukan pengua
//         return res.json({
//         // kirim respons json ke penguna 
//             success : true,
//             message :'ok',
//             results :products[productId]
//             //tampilkan detail product yg baru di perbaharui
//         })
     
// }

exports.updateproduct = async (req, res) => {
    try {
        const {id} = req.params
        const product = await productModel.update(id,req.body)
            return res.json({
                success: true,
                message: 'update product success',
                results: product
            })
        }catch (err) {
        console.log(JSON.stringify(err))

        switch (err.code) {
            case "42601": // jika tidak di isi apa2
            return res.status(400).json({
                success: false,
                message: `fill in the  correct data`
            })
            case "23502":
                const errorMessage = `key id not found`; // jika tidak mengisi id
                return res.status(400).json({
                    success: false,
                    message: `data not found`
                })
            default:
                return res.status(500).json({
                    success: false,
                    message: 'Internal server error'
                })
        }
    }
}


exports.deleteproduct = async (req,res)=>{
        const {id} =req.params
        const product = await productModel.delete(id)
    
        return res.json({
            success :true,
            message : 'delete succes',
            results : product
        })
}
