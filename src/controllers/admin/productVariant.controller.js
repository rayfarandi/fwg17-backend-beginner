const productVariantModel = require('../../models/productVariants.model')
 
exports.getAllproductVariants = async (req,res)=>{
// mendefinisikan fungsi untuk mendapatkan semua penguna parameter fungsi arrow untuk mewakili req dan res
    const productVariants = await productVariantModel.findAll()
    return res.json({
    // mengembalikan respon json jika berhasil
        succces: true,
        // pesan sukses        
        maessage : 'List all productVariants',
        // pesan cetak string list all productVariants
        results : productVariants
        // mengembalikan hasil dari array productVariants
    })
}

exports.getDetailproductVariant = async (req,res)=>{
// mendefininikan fungsi getdataproductVariant, parameter fungsi arrow untuk mewakili req dan res
     const id = parseInt(req.params.id)
     const productVariant = await productVariantModel.findOne(id)
    // melakukan filter productVariant untuk mendapatkan data productVariant dengan ID yang sesuai,dan konfersi id dari string ke nomor
    if(!productVariant){
    // garding, jika array kosong maka
        return res.status(404).json({
        // kembalikan resposn status 404 ke penguna
            success:false,
            message:'productVariant not found'
            // cetak ke penguna
        })
    }
        return res.json({
        // kembalikan jika penguna ditemukan, kirim respons json
            success: true,
            message: 'ok',
            // cetak ke penguna
            results:productVariant
            // kembalikan data productVariant yg di masukan dari pengguna dengan id
        })    
}


// exports.createproductVariant = async (req, res) => {
//     try {
//         const productVariant = await productVariantModel.insert(req.body)
//         return res.json({
//             success: true,
//             message: 'create productVariant success',
//             results: productVariant
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
exports.createproductVariant = async (req, res) => {
    try {
        const productVariant = await productVariantModel.insert(req.body);
        return res.json({
            success: true,
            message: 'create productVariant success',
            results: productVariant
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



// exports.updateproductVariant = (req,res)=>{
// // mendefininikan fungsi updateproductVariant, parameter fungsi arrow untuk mewakili req dan res
//     const {id} = req.params
//     // mendapatkan id dari paramaeter yg di masukan productVariant
//     const {name} = req.body
//     // mendapatkan name dari body paramaeter yg di masukan productVariant
//     const productVariantId = productVariants.map(productVariant => productVariant.id).indexOf(parseInt(id))
//     //mengunakan metode map dan indexOf untuk mencari indeks pengguna dalam array productVariants berdasarkan id dan di conversi menjadi angka yang diberikan dari penguna
//     if(productVariantId === -1){
//     // apakah productVariantid bernilai -1
//         return res.status(404).json({
//         // kembalikan resposn status 404 ke penguna
//             success: false,
//             message: 'productVariant not found'
//             // cetak ke penguna
//         })
//     }
//         productVariants[productVariantId].name = name
//         // jika productVariantid ditemukan/sama dari parameter yg di masukan pengua
//         return res.json({
//         // kirim respons json ke penguna 
//             success : true,
//             message :'ok',
//             results :productVariants[productVariantId]
//             //tampilkan detail productVariant yg baru di perbaharui
//         })
     
// }

exports.updateproductVariant = async (req, res) => {
    try {
        const {id} = req.params
        const productVariant = await productVariantModel.update(req.body);
        if (productVariant) {
            return res.json({
                success: true,
                message: 'update productVariant success',
                results: productVariant
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


exports.deleteproductVariant = (req,res)=>{
//// mendefininikan fungsi deleteproductVariant, parameter fungsi arrow untuk mewakili req dan res
    const {id} = req.params
    // mendapatkan id dari paramaeter yg di masukan productVariant
    const productVariant = productVariants.filter(productVariant =>productVariant.id === parseInt(id))
    // menjalankan filter pada array productVariants untuk mendapatkan productVariant.id yang hanya berisi id pengguna,mengkonversi nilai id yg di terima dari parameter ke angka, lalu di bandingkan 
    if(!productVariant.length){
    // jika data productVariant dari pengguna tidak di temukan, mengunakan metode garding,melakukan negasi jika array nya kosong
            return res.status(404).json({
            //// kembalikan resposn status 404 ke penguna
            success: false,
            message : 'productVariant not found'
            // cetak ke penguna
        })
    }
            productVariants = productVariants.filter(productVariant=>productVariant.id !==parseInt(id))
            // mengkonversi nilai id yg di terima dari parameter ke angka, lalu di bandingkan , menjalankan filter di array productVariants dan jika  menemuka id yg sama makan akan menghilangkan id tersebut
        return res.json({
        // kirim respons json ke penguna 
            success :true,
            message: 'hapus data productVariant'
            // cetak ke penguna
        })
}