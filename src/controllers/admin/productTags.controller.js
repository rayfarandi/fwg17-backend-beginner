let productTags =[
    {
        id: 1,
        name: 'Leanne Graham'
    },
    {
        id: 2,
        name:'Clamentine Duduque'

    }
] //// array untuk menyimpan data pengguna
let countproductTag = productTags.length
// membuat variabel menghitung jumlah pengguna

const productTagModel = require('../../models/productTags.model')

exports.getAllproductTags = async (req,res)=>{
// mendefinisikan fungsi untuk mendapatkan semua penguna parameter fungsi arrow untuk mewakili req dan res
const productTags = await productTagModel.findAll()
return res.json({
// mengembalikan respon json jika berhasil
    succces: true,
    // pesan sukses        
    maessage : 'List all productTags',
    // pesan cetak string list all productTags
    results : productTags
    // mengembalikan hasil dari array productTags
})
}

exports.getDetailproductTag = async (req,res)=>{
// mendefininikan fungsi getdataproductTag, parameter fungsi arrow untuk mewakili req dan res
 const id = parseInt(req.params.id)
 const productTag = await productTagModel.findOne(id)
// melakukan filter productTag untuk mendapatkan data productTag dengan ID yang sesuai,dan konfersi id dari string ke nomor
if(!productTag){
// garding, jika array kosong maka
    return res.status(404).json({
    // kembalikan resposn status 404 ke penguna
        success:false,
        message:'productTag not found'
        // cetak ke penguna
    })
}
    return res.json({
    // kembalikan jika penguna ditemukan, kirim respons json
        success: true,
        message: 'ok',
        // cetak ke penguna
        results:productTag
        // kembalikan data productTag yg di masukan dari pengguna dengan id
    })    
}


// exports.createproductTag = async (req, res) => {
//     try {
//         const productTag = await productTagModel.insert(req.body)
//         return res.json({
//             success: true,
//             message: 'create productTag success',
//             results: productTag
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
exports.createproductTag = async (req, res) => {
try {
    const productTag = await productTagModel.insert(req.body);
    return res.json({
        success: true,
        message: 'create productTag success',
        results: productTag
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



// exports.updateproductTag = (req,res)=>{
// // mendefininikan fungsi updateproductTag, parameter fungsi arrow untuk mewakili req dan res
//     const {id} = req.params
//     // mendapatkan id dari paramaeter yg di masukan productTag
//     const {name} = req.body
//     // mendapatkan name dari body paramaeter yg di masukan productTag
//     const productTagId = productTags.map(productTag => productTag.id).indexOf(parseInt(id))
//     //mengunakan metode map dan indexOf untuk mencari indeks pengguna dalam array productTags berdasarkan id dan di conversi menjadi angka yang diberikan dari penguna
//     if(productTagId === -1){
//     // apakah productTagid bernilai -1
//         return res.status(404).json({
//         // kembalikan resposn status 404 ke penguna
//             success: false,
//             message: 'productTag not found'
//             // cetak ke penguna
//         })
//     }
//         productTags[productTagId].name = name
//         // jika productTagid ditemukan/sama dari parameter yg di masukan pengua
//         return res.json({
//         // kirim respons json ke penguna 
//             success : true,
//             message :'ok',
//             results :productTags[productTagId]
//             //tampilkan detail productTag yg baru di perbaharui
//         })
 
// }

exports.updateproductTag = async (req, res) => {
try {
    const {id} = req.params
    const productTag = await productTagModel.update(req.body);
    if (productTag) {
        return res.json({
            success: true,
            message: 'update productTag success',
            results: productTag
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


exports.deleteproductTag = (req,res)=>{
//// mendefininikan fungsi deleteproductTag, parameter fungsi arrow untuk mewakili req dan res
const {id} = req.params
// mendapatkan id dari paramaeter yg di masukan productTag
const productTag = productTags.filter(productTag =>productTag.id === parseInt(id))
// menjalankan filter pada array productTags untuk mendapatkan productTag.id yang hanya berisi id pengguna,mengkonversi nilai id yg di terima dari parameter ke angka, lalu di bandingkan 
if(!productTag.length){
// jika data productTag dari pengguna tidak di temukan, mengunakan metode garding,melakukan negasi jika array nya kosong
        return res.status(404).json({
        //// kembalikan resposn status 404 ke penguna
        success: false,
        message : 'productTag not found'
        // cetak ke penguna
    })
}
        productTags = productTags.filter(productTag=>productTag.id !==parseInt(id))
        // mengkonversi nilai id yg di terima dari parameter ke angka, lalu di bandingkan , menjalankan filter di array productTags dan jika  menemuka id yg sama makan akan menghilangkan id tersebut
    return res.json({
    // kirim respons json ke penguna 
        success :true,
        message: 'hapus data productTag'
        // cetak ke penguna
    })
}