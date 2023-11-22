let orderDetails =[
    {
        id: 1,
        name: 'Leanne Graham'
    },
    {
        id: 2,
        name:'Clamentine Duduque'

    }
] //// array untuk menyimpan data pengguna
let countorderDetail = orderDetails.length
// membuat variabel menghitung jumlah pengguna

const orderDetailModel = require('../../models/orderDetails.model')

exports.getAllorderDetails = async (req,res)=>{
// mendefinisikan fungsi untuk mendapatkan semua penguna parameter fungsi arrow untuk mewakili req dan res
const orderDetails = await orderDetailModel.findAll()
return res.json({
// mengembalikan respon json jika berhasil
    succces: true,
    // pesan sukses        
    maessage : 'List all orderDetails',
    // pesan cetak string list all orderDetails
    results : orderDetails
    // mengembalikan hasil dari array orderDetails
})
}

exports.getDetailorderDetail = async (req,res)=>{
// mendefininikan fungsi getdataorderDetail, parameter fungsi arrow untuk mewakili req dan res
 const id = parseInt(req.params.id)
 const orderDetail = await orderDetailModel.findOne(id)
// melakukan filter orderDetail untuk mendapatkan data orderDetail dengan ID yang sesuai,dan konfersi id dari string ke nomor
if(!orderDetail){
// garding, jika array kosong maka
    return res.status(404).json({
    // kembalikan resposn status 404 ke penguna
        success:false,
        message:'orderDetail not found'
        // cetak ke penguna
    })
}
    return res.json({
    // kembalikan jika penguna ditemukan, kirim respons json
        success: true,
        message: 'ok',
        // cetak ke penguna
        results:orderDetail
        // kembalikan data orderDetail yg di masukan dari pengguna dengan id
    })    
}


// exports.createorderDetail = async (req, res) => {
//     try {
//         const orderDetail = await orderDetailModel.insert(req.body)
//         return res.json({
//             success: true,
//             message: 'create orderDetail success',
//             results: orderDetail
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
exports.createorderDetail = async (req, res) => {
try {
    const orderDetail = await orderDetailModel.insert(req.body);
    return res.json({
        success: true,
        message: 'create orderDetail success',
        results: orderDetail
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



// exports.updateorderDetail = (req,res)=>{
// // mendefininikan fungsi updateorderDetail, parameter fungsi arrow untuk mewakili req dan res
//     const {id} = req.params
//     // mendapatkan id dari paramaeter yg di masukan orderDetail
//     const {name} = req.body
//     // mendapatkan name dari body paramaeter yg di masukan orderDetail
//     const orderDetailId = orderDetails.map(orderDetail => orderDetail.id).indexOf(parseInt(id))
//     //mengunakan metode map dan indexOf untuk mencari indeks pengguna dalam array orderDetails berdasarkan id dan di conversi menjadi angka yang diberikan dari penguna
//     if(orderDetailId === -1){
//     // apakah orderDetailid bernilai -1
//         return res.status(404).json({
//         // kembalikan resposn status 404 ke penguna
//             success: false,
//             message: 'orderDetail not found'
//             // cetak ke penguna
//         })
//     }
//         orderDetails[orderDetailId].name = name
//         // jika orderDetailid ditemukan/sama dari parameter yg di masukan pengua
//         return res.json({
//         // kirim respons json ke penguna 
//             success : true,
//             message :'ok',
//             results :orderDetails[orderDetailId]
//             //tampilkan detail orderDetail yg baru di perbaharui
//         })
 
// }

exports.updateorderDetail = async (req, res) => {
try {
    const {id} = req.params
    const orderDetail = await orderDetailModel.update(req.body);
    if (orderDetail) {
        return res.json({
            success: true,
            message: 'update orderDetail success',
            results: orderDetail
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


exports.deleteorderDetail = (req,res)=>{
//// mendefininikan fungsi deleteorderDetail, parameter fungsi arrow untuk mewakili req dan res
const {id} = req.params
// mendapatkan id dari paramaeter yg di masukan orderDetail
const orderDetail = orderDetails.filter(orderDetail =>orderDetail.id === parseInt(id))
// menjalankan filter pada array orderDetails untuk mendapatkan orderDetail.id yang hanya berisi id pengguna,mengkonversi nilai id yg di terima dari parameter ke angka, lalu di bandingkan 
if(!orderDetail.length){
// jika data orderDetail dari pengguna tidak di temukan, mengunakan metode garding,melakukan negasi jika array nya kosong
        return res.status(404).json({
        //// kembalikan resposn status 404 ke penguna
        success: false,
        message : 'orderDetail not found'
        // cetak ke penguna
    })
}
        orderDetails = orderDetails.filter(orderDetail=>orderDetail.id !==parseInt(id))
        // mengkonversi nilai id yg di terima dari parameter ke angka, lalu di bandingkan , menjalankan filter di array orderDetails dan jika  menemuka id yg sama makan akan menghilangkan id tersebut
    return res.json({
    // kirim respons json ke penguna 
        success :true,
        message: 'hapus data orderDetail'
        // cetak ke penguna
    })
}