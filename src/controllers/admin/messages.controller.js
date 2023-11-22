let messages =[
    {
        id: 1,
        name: 'Leanne Graham'
    },
    {
        id: 2,
        name:'Clamentine Duduque'

    }
] //// array untuk menyimpan data pengguna
let countmessage = messages.length
// membuat variabel menghitung jumlah pengguna

const messageModel = require('../../models/messages.model')

exports.getAllmessages = async (req,res)=>{
// mendefinisikan fungsi untuk mendapatkan semua penguna parameter fungsi arrow untuk mewakili req dan res
const messages = await messageModel.findAll()
return res.json({
// mengembalikan respon json jika berhasil
    succces: true,
    // pesan sukses        
    maessage : 'List all messages',
    // pesan cetak string list all messages
    results : messages
    // mengembalikan hasil dari array messages
})
}

exports.getDetailmessage = async (req,res)=>{
// mendefininikan fungsi getdatamessage, parameter fungsi arrow untuk mewakili req dan res
 const id = parseInt(req.params.id)
 const message = await messageModel.findOne(id)
// melakukan filter message untuk mendapatkan data message dengan ID yang sesuai,dan konfersi id dari string ke nomor
if(!message){
// garding, jika array kosong maka
    return res.status(404).json({
    // kembalikan resposn status 404 ke penguna
        success:false,
        message:'message not found'
        // cetak ke penguna
    })
}
    return res.json({
    // kembalikan jika penguna ditemukan, kirim respons json
        success: true,
        message: 'ok',
        // cetak ke penguna
        results:message
        // kembalikan data message yg di masukan dari pengguna dengan id
    })    
}


// exports.createmessage = async (req, res) => {
//     try {
//         const message = await messageModel.insert(req.body)
//         return res.json({
//             success: true,
//             message: 'create message success',
//             results: message
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
exports.createmessage = async (req, res) => {
try {
    const message = await messageModel.insert(req.body);
    return res.json({
        success: true,
        message: 'create message success',
        results: message
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



// exports.updatemessage = (req,res)=>{
// // mendefininikan fungsi updatemessage, parameter fungsi arrow untuk mewakili req dan res
//     const {id} = req.params
//     // mendapatkan id dari paramaeter yg di masukan message
//     const {name} = req.body
//     // mendapatkan name dari body paramaeter yg di masukan message
//     const messageId = messages.map(message => message.id).indexOf(parseInt(id))
//     //mengunakan metode map dan indexOf untuk mencari indeks pengguna dalam array messages berdasarkan id dan di conversi menjadi angka yang diberikan dari penguna
//     if(messageId === -1){
//     // apakah messageid bernilai -1
//         return res.status(404).json({
//         // kembalikan resposn status 404 ke penguna
//             success: false,
//             message: 'message not found'
//             // cetak ke penguna
//         })
//     }
//         messages[messageId].name = name
//         // jika messageid ditemukan/sama dari parameter yg di masukan pengua
//         return res.json({
//         // kirim respons json ke penguna 
//             success : true,
//             message :'ok',
//             results :messages[messageId]
//             //tampilkan detail message yg baru di perbaharui
//         })
 
// }

exports.updatemessage = async (req, res) => {
try {
    const {id} = req.params
    const message = await messageModel.update(req.body);
    if (message) {
        return res.json({
            success: true,
            message: 'update message success',
            results: message
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


exports.deletemessage = (req,res)=>{
//// mendefininikan fungsi deletemessage, parameter fungsi arrow untuk mewakili req dan res
const {id} = req.params
// mendapatkan id dari paramaeter yg di masukan message
const message = messages.filter(message =>message.id === parseInt(id))
// menjalankan filter pada array messages untuk mendapatkan message.id yang hanya berisi id pengguna,mengkonversi nilai id yg di terima dari parameter ke angka, lalu di bandingkan 
if(!message.length){
// jika data message dari pengguna tidak di temukan, mengunakan metode garding,melakukan negasi jika array nya kosong
        return res.status(404).json({
        //// kembalikan resposn status 404 ke penguna
        success: false,
        message : 'message not found'
        // cetak ke penguna
    })
}
        messages = messages.filter(message=>message.id !==parseInt(id))
        // mengkonversi nilai id yg di terima dari parameter ke angka, lalu di bandingkan , menjalankan filter di array messages dan jika  menemuka id yg sama makan akan menghilangkan id tersebut
    return res.json({
    // kirim respons json ke penguna 
        success :true,
        message: 'hapus data message'
        // cetak ke penguna
    })
}