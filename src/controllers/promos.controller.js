let promos =[
    {
        id: 1,
        name: 'Leanne Graham'
    },
    {
        id: 2,
        name:'Clamentine Duduque'

    }
] //// array untuk menyimpan data pengguna
let countpromo = promos.length
// membuat variabel menghitung jumlah pengguna

const promoModel = require('../models/promos.model')

exports.getAllpromos = async (req,res)=>{
// mendefinisikan fungsi untuk mendapatkan semua penguna parameter fungsi arrow untuk mewakili req dan res
const promos = await promoModel.findAll()
return res.json({
// mengembalikan respon json jika berhasil
    succces: true,
    // pesan sukses        
    maessage : 'List all promos',
    // pesan cetak string list all promos
    results : promos
    // mengembalikan hasil dari array promos
})
}

exports.getDetailpromo = async (req,res)=>{
// mendefininikan fungsi getdatapromo, parameter fungsi arrow untuk mewakili req dan res
 const id = parseInt(req.params.id)
 const promo = await promoModel.findOne(id)
// melakukan filter promo untuk mendapatkan data promo dengan ID yang sesuai,dan konfersi id dari string ke nomor
if(!promo){
// garding, jika array kosong maka
    return res.status(404).json({
    // kembalikan resposn status 404 ke penguna
        success:false,
        message:'promo not found'
        // cetak ke penguna
    })
}
    return res.json({
    // kembalikan jika penguna ditemukan, kirim respons json
        success: true,
        message: 'ok',
        // cetak ke penguna
        results:promo
        // kembalikan data promo yg di masukan dari pengguna dengan id
    })    
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
exports.createpromo = async (req, res) => {
try {
    const promo = await promoModel.insert(req.body);
    return res.json({
        success: true,
        message: 'create promo success',
        results: promo
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



// exports.updatepromo = (req,res)=>{
// // mendefininikan fungsi updatepromo, parameter fungsi arrow untuk mewakili req dan res
//     const {id} = req.params
//     // mendapatkan id dari paramaeter yg di masukan promo
//     const {name} = req.body
//     // mendapatkan name dari body paramaeter yg di masukan promo
//     const promoId = promos.map(promo => promo.id).indexOf(parseInt(id))
//     //mengunakan metode map dan indexOf untuk mencari indeks pengguna dalam array promos berdasarkan id dan di conversi menjadi angka yang diberikan dari penguna
//     if(promoId === -1){
//     // apakah promoid bernilai -1
//         return res.status(404).json({
//         // kembalikan resposn status 404 ke penguna
//             success: false,
//             message: 'promo not found'
//             // cetak ke penguna
//         })
//     }
//         promos[promoId].name = name
//         // jika promoid ditemukan/sama dari parameter yg di masukan pengua
//         return res.json({
//         // kirim respons json ke penguna 
//             success : true,
//             message :'ok',
//             results :promos[promoId]
//             //tampilkan detail promo yg baru di perbaharui
//         })
 
// }

exports.updatepromo = async (req, res) => {
try {
    const {id} = req.params
    const promo = await promoModel.update(req.body);
    if (promo) {
        return res.json({
            success: true,
            message: 'update promo success',
            results: promo
        });
    } else {
        // Handle the case where the data to be updated is not found
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


exports.deletepromo = (req,res)=>{
//// mendefininikan fungsi deletepromo, parameter fungsi arrow untuk mewakili req dan res
const {id} = req.params
// mendapatkan id dari paramaeter yg di masukan promo
const promo = promos.filter(promo =>promo.id === parseInt(id))
// menjalankan filter pada array promos untuk mendapatkan promo.id yang hanya berisi id pengguna,mengkonversi nilai id yg di terima dari parameter ke angka, lalu di bandingkan 
if(!promo.length){
// jika data promo dari pengguna tidak di temukan, mengunakan metode garding,melakukan negasi jika array nya kosong
        return res.status(404).json({
        //// kembalikan resposn status 404 ke penguna
        success: false,
        message : 'promo not found'
        // cetak ke penguna
    })
}
        promos = promos.filter(promo=>promo.id !==parseInt(id))
        // mengkonversi nilai id yg di terima dari parameter ke angka, lalu di bandingkan , menjalankan filter di array promos dan jika  menemuka id yg sama makan akan menghilangkan id tersebut
    return res.json({
    // kirim respons json ke penguna 
        success :true,
        message: 'hapus data promo'
        // cetak ke penguna
    })
}