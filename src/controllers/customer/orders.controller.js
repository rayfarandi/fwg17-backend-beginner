let orders =[
    {
        id: 1,
        name: 'Leanne Graham'
    },
    {
        id: 2,
        name:'Clamentine Duduque'

    }
] //// array untuk menyimpan data pengguna
let countorder = orders.length
// membuat variabel menghitung jumlah pengguna

const orderModel = require('../../models/orders.model')

exports.getAllorders = async (req,res)=>{
// mendefinisikan fungsi untuk mendapatkan semua penguna parameter fungsi arrow untuk mewakili req dan res
const orders = await orderModel.findAll()
return res.json({
// mengembalikan respon json jika berhasil
    succces: true,
    // pesan sukses        
    maessage : 'List all orders',
    // pesan cetak string list all orders
    results : orders
    // mengembalikan hasil dari array orders
})
}

exports.getDetailorder = async (req,res)=>{
// mendefininikan fungsi getdataorder, parameter fungsi arrow untuk mewakili req dan res
 const id = parseInt(req.params.id)
 const order = await orderModel.findOne(id)
// melakukan filter order untuk mendapatkan data order dengan ID yang sesuai,dan konfersi id dari string ke nomor
if(!order){
// garding, jika array kosong maka
    return res.status(404).json({
    // kembalikan resposn status 404 ke penguna
        success:false,
        message:'order not found'
        // cetak ke penguna
    })
}
    return res.json({
    // kembalikan jika penguna ditemukan, kirim respons json
        success: true,
        message: 'ok',
        // cetak ke penguna
        results:order
        // kembalikan data order yg di masukan dari pengguna dengan id
    })    
}


// exports.createorder = async (req, res) => {
//     try {
//         const order = await orderModel.insert(req.body)
//         return res.json({
//             success: true,
//             message: 'create order success',
//             results: order
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
exports.createorder = async (req, res) => {
try {
    const order = await orderModel.insert(req.body);
    return res.json({
        success: true,
        message: 'create order success',
        results: order
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



// exports.updateorder = (req,res)=>{
// // mendefininikan fungsi updateorder, parameter fungsi arrow untuk mewakili req dan res
//     const {id} = req.params
//     // mendapatkan id dari paramaeter yg di masukan order
//     const {name} = req.body
//     // mendapatkan name dari body paramaeter yg di masukan order
//     const orderId = orders.map(order => order.id).indexOf(parseInt(id))
//     //mengunakan metode map dan indexOf untuk mencari indeks pengguna dalam array orders berdasarkan id dan di conversi menjadi angka yang diberikan dari penguna
//     if(orderId === -1){
//     // apakah orderid bernilai -1
//         return res.status(404).json({
//         // kembalikan resposn status 404 ke penguna
//             success: false,
//             message: 'order not found'
//             // cetak ke penguna
//         })
//     }
//         orders[orderId].name = name
//         // jika orderid ditemukan/sama dari parameter yg di masukan pengua
//         return res.json({
//         // kirim respons json ke penguna 
//             success : true,
//             message :'ok',
//             results :orders[orderId]
//             //tampilkan detail order yg baru di perbaharui
//         })
 
// }

exports.updateorder = async (req, res) => {
try {
    const {id} = req.params
    const order = await orderModel.update(req.body);
    if (order) {
        return res.json({
            success: true,
            message: 'update order success',
            results: order
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


exports.deleteorder = (req,res)=>{
//// mendefininikan fungsi deleteorder, parameter fungsi arrow untuk mewakili req dan res
const {id} = req.params
// mendapatkan id dari paramaeter yg di masukan order
const order = orders.filter(order =>order.id === parseInt(id))
// menjalankan filter pada array orders untuk mendapatkan order.id yang hanya berisi id pengguna,mengkonversi nilai id yg di terima dari parameter ke angka, lalu di bandingkan 
if(!order.length){
// jika data order dari pengguna tidak di temukan, mengunakan metode garding,melakukan negasi jika array nya kosong
        return res.status(404).json({
        //// kembalikan resposn status 404 ke penguna
        success: false,
        message : 'order not found'
        // cetak ke penguna
    })
}
        orders = orders.filter(order=>order.id !==parseInt(id))
        // mengkonversi nilai id yg di terima dari parameter ke angka, lalu di bandingkan , menjalankan filter di array orders dan jika  menemuka id yg sama makan akan menghilangkan id tersebut
    return res.json({
    // kirim respons json ke penguna 
        success :true,
        message: 'hapus data order'
        // cetak ke penguna
    })
}