let products =[
        {
            id: 1,
            name: 'Leanne Graham'
        },
        {
            id: 2,
            name:'Clamentine Duduque'

        }
    ] //// array untuk menyimpan data pengguna
let countproduct = products.length
// membuat variabel menghitung jumlah pengguna

const productModel = require('../models/products.model')
 
exports.getAllproducts = async (req,res)=>{
// mendefinisikan fungsi untuk mendapatkan semua penguna parameter fungsi arrow untuk mewakili req dan res
    const products = await productModel.findAll()
    return res.json({
    // mengembalikan respon json jika berhasil
        succces: true,
        // pesan sukses        
        maessage : 'List all products',
        // pesan cetak string list all products
        results : products
        // mengembalikan hasil dari array products
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
        });
    } catch (err) {
        console.log(JSON.stringify(err));

        switch (err.code) {
            case "23502":
                return res.status(400).json({
                    success: false,
                    message: `${err.column} cannot be empty`
                })
                case "23505":
                    const errorMessage = err.column = 'email already exists'
                    return res.status(400).json({
                        success: false,
                        message: errorMessage
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
        const product = await productModel.update(req.body);
        if (product) {
            return res.json({
                success: true,
                message: 'update product success',
                results: product
            });
        } else {
            // menghendel case jika data tidak di temukan
            return res.status(404).json({
                success: false,
                message: 'Data not found for update'
            });
        }
    } catch (err) {
        console.log(JSON.stringify(err));

        switch (err.code) {
           
            case "23502":
                return res.status(400).json({
                    success: false,
                    message: `${err.column} data not found`
                });
            default:
                
                return res.status(500).json({
                    success: false,
                    message: 'Internal server error'
                });
        }
    }
}


exports.deleteproduct = (req,res)=>{
//// mendefininikan fungsi deleteproduct, parameter fungsi arrow untuk mewakili req dan res
    const {id} = req.params
    // mendapatkan id dari paramaeter yg di masukan product
    const product = products.filter(product =>product.id === parseInt(id))
    // menjalankan filter pada array products untuk mendapatkan product.id yang hanya berisi id pengguna,mengkonversi nilai id yg di terima dari parameter ke angka, lalu di bandingkan 
    if(!product.length){
    // jika data product dari pengguna tidak di temukan, mengunakan metode garding,melakukan negasi jika array nya kosong
            return res.status(404).json({
            //// kembalikan resposn status 404 ke penguna
            success: false,
            message : 'product not found'
            // cetak ke penguna
        })
    }
            products = products.filter(product=>product.id !==parseInt(id))
            // mengkonversi nilai id yg di terima dari parameter ke angka, lalu di bandingkan , menjalankan filter di array products dan jika  menemuka id yg sama makan akan menghilangkan id tersebut
        return res.json({
        // kirim respons json ke penguna 
            success :true,
            message: 'hapus data product'
            // cetak ke penguna
        })
}