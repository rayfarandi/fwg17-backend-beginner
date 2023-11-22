let productRatings =[
    {
        id: 1,
        name: 'Leanne Graham'
    },
    {
        id: 2,
        name:'Clamentine Duduque'

    }
] //// array untuk menyimpan data pengguna
let countproductRating = productRatings.length
// membuat variabel menghitung jumlah pengguna

const productRatingModel = require('../../models/productRatings.model')

exports.getAllproductRatings = async (req,res)=>{
// mendefinisikan fungsi untuk mendapatkan semua penguna parameter fungsi arrow untuk mewakili req dan res
const productRatings = await productRatingModel.findAll()
return res.json({
// mengembalikan respon json jika berhasil
    succces: true,
    // pesan sukses        
    maessage : 'List all productRatings',
    // pesan cetak string list all productRatings
    results : productRatings
    // mengembalikan hasil dari array productRatings
})
}

exports.getDetailproductRating = async (req,res)=>{
// mendefininikan fungsi getdataproductRating, parameter fungsi arrow untuk mewakili req dan res
 const id = parseInt(req.params.id)
 const productRating = await productRatingModel.findOne(id)
// melakukan filter productRating untuk mendapatkan data productRating dengan ID yang sesuai,dan konfersi id dari string ke nomor
if(!productRating){
// garding, jika array kosong maka
    return res.status(404).json({
    // kembalikan resposn status 404 ke penguna
        success:false,
        message:'productRating not found'
        // cetak ke penguna
    })
}
    return res.json({
    // kembalikan jika penguna ditemukan, kirim respons json
        success: true,
        message: 'ok',
        // cetak ke penguna
        results:productRating
        // kembalikan data productRating yg di masukan dari pengguna dengan id
    })    
}


// exports.createproductRating = async (req, res) => {
//     try {
//         const productRating = await productRatingModel.insert(req.body)
//         return res.json({
//             success: true,
//             message: 'create productRating success',
//             results: productRating
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
exports.createproductRating = async (req, res) => {
try {
    const productRating = await productRatingModel.insert(req.body);
    return res.json({
        success: true,
        message: 'create productRating success',
        results: productRating
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



// exports.updateproductRating = (req,res)=>{
// // mendefininikan fungsi updateproductRating, parameter fungsi arrow untuk mewakili req dan res
//     const {id} = req.params
//     // mendapatkan id dari paramaeter yg di masukan productRating
//     const {name} = req.body
//     // mendapatkan name dari body paramaeter yg di masukan productRating
//     const productRatingId = productRatings.map(productRating => productRating.id).indexOf(parseInt(id))
//     //mengunakan metode map dan indexOf untuk mencari indeks pengguna dalam array productRatings berdasarkan id dan di conversi menjadi angka yang diberikan dari penguna
//     if(productRatingId === -1){
//     // apakah productRatingid bernilai -1
//         return res.status(404).json({
//         // kembalikan resposn status 404 ke penguna
//             success: false,
//             message: 'productRating not found'
//             // cetak ke penguna
//         })
//     }
//         productRatings[productRatingId].name = name
//         // jika productRatingid ditemukan/sama dari parameter yg di masukan pengua
//         return res.json({
//         // kirim respons json ke penguna 
//             success : true,
//             message :'ok',
//             results :productRatings[productRatingId]
//             //tampilkan detail productRating yg baru di perbaharui
//         })
 
// }

exports.updateproductRating = async (req, res) => {
try {
    const {id} = req.params
    const productRating = await productRatingModel.update(req.body);
    if (productRating) {
        return res.json({
            success: true,
            message: 'update productRating success',
            results: productRating
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


exports.deleteproductRating = (req,res)=>{
//// mendefininikan fungsi deleteproductRating, parameter fungsi arrow untuk mewakili req dan res
const {id} = req.params
// mendapatkan id dari paramaeter yg di masukan productRating
const productRating = productRatings.filter(productRating =>productRating.id === parseInt(id))
// menjalankan filter pada array productRatings untuk mendapatkan productRating.id yang hanya berisi id pengguna,mengkonversi nilai id yg di terima dari parameter ke angka, lalu di bandingkan 
if(!productRating.length){
// jika data productRating dari pengguna tidak di temukan, mengunakan metode garding,melakukan negasi jika array nya kosong
        return res.status(404).json({
        //// kembalikan resposn status 404 ke penguna
        success: false,
        message : 'productRating not found'
        // cetak ke penguna
    })
}
        productRatings = productRatings.filter(productRating=>productRating.id !==parseInt(id))
        // mengkonversi nilai id yg di terima dari parameter ke angka, lalu di bandingkan , menjalankan filter di array productRatings dan jika  menemuka id yg sama makan akan menghilangkan id tersebut
    return res.json({
    // kirim respons json ke penguna 
        success :true,
        message: 'hapus data productRating'
        // cetak ke penguna
    })
}