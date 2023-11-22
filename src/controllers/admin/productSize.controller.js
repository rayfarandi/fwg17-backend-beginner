let productSizes =[
        {
            id: 1,
            name: 'Leanne Graham'
        },
        {
            id: 2,
            name:'Clamentine Duduque'

        }
    ] //// array untuk menyimpan data pengguna
let countproductSize = productSizes.length
// membuat variabel menghitung jumlah pengguna

const productSizeModel = require('../../models/productSizes.model')
 
exports.getAllproductSizes = async (req,res)=>{
// mendefinisikan fungsi untuk mendapatkan semua penguna parameter fungsi arrow untuk mewakili req dan res
    const productSizes = await productSizeModel.findAll()
    return res.json({
    // mengembalikan respon json jika berhasil
        succces: true,
        // pesan sukses        
        maessage : 'List all productSizes',
        // pesan cetak string list all productSizes
        results : productSizes
        // mengembalikan hasil dari array productSizes
    })
}

exports.getDetailproductSize = async (req,res)=>{
// mendefininikan fungsi getdataproductSize, parameter fungsi arrow untuk mewakili req dan res
     const id = parseInt(req.params.id)
     const productSize = await productSizeModel.findOne(id)
    // melakukan filter productSize untuk mendapatkan data productSize dengan ID yang sesuai,dan konfersi id dari string ke nomor
    if(!productSize){
    // garding, jika array kosong maka
        return res.status(404).json({
        // kembalikan resposn status 404 ke penguna
            success:false,
            message:'productSize not found'
            // cetak ke penguna
        })
    }
        return res.json({
        // kembalikan jika penguna ditemukan, kirim respons json
            success: true,
            message: 'ok',
            // cetak ke penguna
            results:productSize
            // kembalikan data productSize yg di masukan dari pengguna dengan id
        })    
}


// exports.createproductSize = async (req, res) => {
//     try {
//         const productSize = await productSizeModel.insert(req.body)
//         return res.json({
//             success: true,
//             message: 'create productSize success',
//             results: productSize
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
exports.createproductSize = async (req, res) => {
    try {
        const productSize = await productSizeModel.insert(req.body);
        return res.json({
            success: true,
            message: 'create productSize success',
            results: productSize
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



// exports.updateproductSize = (req,res)=>{
// // mendefininikan fungsi updateproductSize, parameter fungsi arrow untuk mewakili req dan res
//     const {id} = req.params
//     // mendapatkan id dari paramaeter yg di masukan productSize
//     const {name} = req.body
//     // mendapatkan name dari body paramaeter yg di masukan productSize
//     const productSizeId = productSizes.map(productSize => productSize.id).indexOf(parseInt(id))
//     //mengunakan metode map dan indexOf untuk mencari indeks pengguna dalam array productSizes berdasarkan id dan di conversi menjadi angka yang diberikan dari penguna
//     if(productSizeId === -1){
//     // apakah productSizeid bernilai -1
//         return res.status(404).json({
//         // kembalikan resposn status 404 ke penguna
//             success: false,
//             message: 'productSize not found'
//             // cetak ke penguna
//         })
//     }
//         productSizes[productSizeId].name = name
//         // jika productSizeid ditemukan/sama dari parameter yg di masukan pengua
//         return res.json({
//         // kirim respons json ke penguna 
//             success : true,
//             message :'ok',
//             results :productSizes[productSizeId]
//             //tampilkan detail productSize yg baru di perbaharui
//         })
     
// }

exports.updateproductSize = async (req, res) => {
    try {
        const {id} = req.params
        const productSize = await productSizeModel.update(req.body);
        if (productSize) {
            return res.json({
                success: true,
                message: 'update productSize success',
                results: productSize
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


exports.deleteproductSize = (req,res)=>{
//// mendefininikan fungsi deleteproductSize, parameter fungsi arrow untuk mewakili req dan res
    const {id} = req.params
    // mendapatkan id dari paramaeter yg di masukan productSize
    const productSize = productSizes.filter(productSize =>productSize.id === parseInt(id))
    // menjalankan filter pada array productSizes untuk mendapatkan productSize.id yang hanya berisi id pengguna,mengkonversi nilai id yg di terima dari parameter ke angka, lalu di bandingkan 
    if(!productSize.length){
    // jika data productSize dari pengguna tidak di temukan, mengunakan metode garding,melakukan negasi jika array nya kosong
            return res.status(404).json({
            //// kembalikan resposn status 404 ke penguna
            success: false,
            message : 'productSize not found'
            // cetak ke penguna
        })
    }
            productSizes = productSizes.filter(productSize=>productSize.id !==parseInt(id))
            // mengkonversi nilai id yg di terima dari parameter ke angka, lalu di bandingkan , menjalankan filter di array productSizes dan jika  menemuka id yg sama makan akan menghilangkan id tersebut
        return res.json({
        // kirim respons json ke penguna 
            success :true,
            message: 'hapus data productSize'
            // cetak ke penguna
        })
}