let users =[
        {
            id: 1,
            name: 'Leanne Graham'
        },
        {
            id: 2,
            name:'Clamentine Duduque'

        }
    ] //// array untuk menyimpan data pengguna
let countUser = users.length
// membuat variabel menghitung jumlah pengguna

const userModel = require('../models/users.model')
 
exports.getAllUsers = async (req,res)=>{
// mendefinisikan fungsi untuk mendapatkan semua penguna parameter fungsi arrow untuk mewakili req dan res
    const users = await userModel.findAll()
    return res.json({
    // mengembalikan respon json jika berhasil
        succces: true,
        // pesan sukses        
        maessage : 'List all users',
        // pesan cetak string list all users
        results : users
        // mengembalikan hasil dari array users
    })
}

exports.getDetailUser = async (req,res)=>{
// mendefininikan fungsi getdatauser, parameter fungsi arrow untuk mewakili req dan res
     const id = parseInt(req.params.id)
     const user = await userModel.findOne(id)
    // melakukan filter user untuk mendapatkan data user dengan ID yang sesuai,dan konfersi id dari string ke nomor
    if(!user){
    // garding, jika array kosong maka
        return res.status(404).json({
        // kembalikan resposn status 404 ke penguna
            success:false,
            message:'user not found'
            // cetak ke penguna
        })
    }
        return res.json({
        // kembalikan jika penguna ditemukan, kirim respons json
            success: true,
            message: 'ok',
            // cetak ke penguna
            results:user
            // kembalikan data user yg di masukan dari pengguna dengan id
        })    
}


// exports.createUser = async (req, res) => {
//     try {
//         const user = await userModel.insert(req.body)
//         return res.json({
//             success: true,
//             message: 'create user success',
//             results: user
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
exports.createUser = async (req, res) => {
    try {
        const user = await userModel.insert(req.body);
        return res.json({
            success: true,
            message: 'create user success',
            results: user
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



// exports.updateUser = (req,res)=>{
// // mendefininikan fungsi updateuser, parameter fungsi arrow untuk mewakili req dan res
//     const {id} = req.params
//     // mendapatkan id dari paramaeter yg di masukan user
//     const {name} = req.body
//     // mendapatkan name dari body paramaeter yg di masukan user
//     const userId = users.map(user => user.id).indexOf(parseInt(id))
//     //mengunakan metode map dan indexOf untuk mencari indeks pengguna dalam array users berdasarkan id dan di conversi menjadi angka yang diberikan dari penguna
//     if(userId === -1){
//     // apakah userid bernilai -1
//         return res.status(404).json({
//         // kembalikan resposn status 404 ke penguna
//             success: false,
//             message: 'user not found'
//             // cetak ke penguna
//         })
//     }
//         users[userId].name = name
//         // jika userid ditemukan/sama dari parameter yg di masukan pengua
//         return res.json({
//         // kirim respons json ke penguna 
//             success : true,
//             message :'ok',
//             results :users[userId]
//             //tampilkan detail user yg baru di perbaharui
//         })
     
// }

exports.updateUser = async (req, res) => {
    try {
        const {id} = req.params
        const user = await userModel.update(req.body);
        if (user) {
            return res.json({
                success: true,
                message: 'update user success',
                results: user
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


exports.deleteUser = (req,res)=>{
//// mendefininikan fungsi deleteuser, parameter fungsi arrow untuk mewakili req dan res
    const {id} = req.params
    // mendapatkan id dari paramaeter yg di masukan user
    const user = users.filter(user =>user.id === parseInt(id))
    // menjalankan filter pada array users untuk mendapatkan user.id yang hanya berisi id pengguna,mengkonversi nilai id yg di terima dari parameter ke angka, lalu di bandingkan 
    if(!user.length){
    // jika data user dari pengguna tidak di temukan, mengunakan metode garding,melakukan negasi jika array nya kosong
            return res.status(404).json({
            //// kembalikan resposn status 404 ke penguna
            success: false,
            message : 'user not found'
            // cetak ke penguna
        })
    }
            users = users.filter(user=>user.id !==parseInt(id))
            // mengkonversi nilai id yg di terima dari parameter ke angka, lalu di bandingkan , menjalankan filter di array users dan jika  menemuka id yg sama makan akan menghilangkan id tersebut
        return res.json({
        // kirim respons json ke penguna 
            success :true,
            message: 'hapus data user'
            // cetak ke penguna
        })
}