let productCategories =[
        {
            id: 1,
            name: 'Leanne Graham'
        },
        {
            id: 2,
            name:'Clamentine Duduque'

        }
    ] //// array untuk menyimpan data pengguna
let countproductpCategorie = productCategories.length
// membuat variabel menghitung jumlah pengguna

const productCategorieModel = require('../models/productCategories.model')
 
exports.getAllproductCategories = async (req,res)=>{
// mendefinisikan fungsi untuk mendapatkan semua penguna parameter fungsi arrow untuk mewakili req dan res
    const productCategories = await productCategorieModel.findAll()
    return res.json({
    // mengembalikan respon json jika berhasil
        succces: true,
        // pesan sukses        
        maessage : 'List all productCategories',
        // pesan cetak string list all productCategories
        results : productCategories
        // mengembalikan hasil dari array productCategories
    })
}

exports.getDetailproductCategorie = async (req,res)=>{
// mendefininikan fungsi getdataproductCategorie, parameter fungsi arrow untuk mewakili req dan res
     const id = parseInt(req.params.id)
     const productCategorie = await productCategorieModel.findOne(id)
    // melakukan filter productCategorie untuk mendapatkan data productCategorie dengan ID yang sesuai,dan konfersi id dari string ke nomor
    if(!productCategorie){
    // garding, jika array kosong maka
        return res.status(404).json({
        // kembalikan resposn status 404 ke penguna
            success:false,
            message:'productCategorie not found'
            // cetak ke penguna
        })
    }
        return res.json({
        // kembalikan jika penguna ditemukan, kirim respons json
            success: true,
            message: 'ok',
            // cetak ke penguna
            results:productCategorie
            // kembalikan data productCategorie yg di masukan dari pengguna dengan id
        })    
}


// exports.createproductCategorie = async (req, res) => {
//     try {
//         const productCategorie = await productCategorieModel.insert(req.body)
//         return res.json({
//             success: true,
//             message: 'create productCategorie success',
//             results: productCategorie
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
exports.createproductCategorie = async (req, res) => {
    try {
        const productCategorie = await productCategorieModel.insert(req.body);
        return res.json({
            success: true,
            message: 'create productCategorie success',
            results: productCategorie
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



// exports.updateproductCategorie = (req,res)=>{
// // mendefininikan fungsi updateproductCategorie, parameter fungsi arrow untuk mewakili req dan res
//     const {id} = req.params
//     // mendapatkan id dari paramaeter yg di masukan productCategorie
//     const {name} = req.body
//     // mendapatkan name dari body paramaeter yg di masukan productCategorie
//     const productCategorieId = productCategories.map(productCategorie => productCategorie.id).indexOf(parseInt(id))
//     //mengunakan metode map dan indexOf untuk mencari indeks pengguna dalam array productCategories berdasarkan id dan di conversi menjadi angka yang diberikan dari penguna
//     if(productCategorieId === -1){
//     // apakah productCategorieid bernilai -1
//         return res.status(404).json({
//         // kembalikan resposn status 404 ke penguna
//             success: false,
//             message: 'productCategorie not found'
//             // cetak ke penguna
//         })
//     }
//         productCategories[productCategorieId].name = name
//         // jika productCategorieid ditemukan/sama dari parameter yg di masukan pengua
//         return res.json({
//         // kirim respons json ke penguna 
//             success : true,
//             message :'ok',
//             results :productCategories[productCategorieId]
//             //tampilkan detail productCategorie yg baru di perbaharui
//         })
     
// }

exports.updateproductCategorie = async (req, res) => {
    try {
        const {id} = req.params
        const productCategorie = await productCategorieModel.update(req.body);
        if (productCategorie) {
            return res.json({
                success: true,
                message: 'update productCategorie success',
                results: productCategorie
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


exports.deleteproductCategorie = (req,res)=>{
//// mendefininikan fungsi deleteproductCategorie, parameter fungsi arrow untuk mewakili req dan res
    const {id} = req.params
    // mendapatkan id dari paramaeter yg di masukan productCategorie
    const productCategorie = productCategories.filter(productCategorie =>productCategorie.id === parseInt(id))
    // menjalankan filter pada array productCategories untuk mendapatkan productCategorie.id yang hanya berisi id pengguna,mengkonversi nilai id yg di terima dari parameter ke angka, lalu di bandingkan 
    if(!productCategorie.length){
    // jika data productCategorie dari pengguna tidak di temukan, mengunakan metode garding,melakukan negasi jika array nya kosong
            return res.status(404).json({
            //// kembalikan resposn status 404 ke penguna
            success: false,
            message : 'productCategorie not found'
            // cetak ke penguna
        })
    }
            productCategories = productCategories.filter(productCategorie=>productCategorie.id !==parseInt(id))
            // mengkonversi nilai id yg di terima dari parameter ke angka, lalu di bandingkan , menjalankan filter di array productCategories dan jika  menemuka id yg sama makan akan menghilangkan id tersebut
        return res.json({
        // kirim respons json ke penguna 
            success :true,
            message: 'hapus data categorie'
            // cetak ke penguna
        })
}