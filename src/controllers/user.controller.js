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

exports.getAllUsers = (req,res)=>{
// mendefinisikan fungsi untuk mendapatkan semua penguna
// yg berasal dari array of objec
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

exports.getDetailUser = (req,res)=>{
// mendefininikan fungsi getdatauser, parameter fungsi arrow untuk mewakili req dan res
    const user = users.filter(item => item.id === parseInt(req.params.id))
    // melakukan filter user untuk mendapatkan data user dengan ID yang sesuai,dan konfersi id dari string ke nomor
    if(!user[0]){
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
            results:user[0]
            // kembalikan data user yg di masukan dari pengguna dengan id tertentu
        })    
}

exports.createUser = (req,res)=>{
    req.countUser = req.countUser + 1
    const {name} = req.body
    countUser = countUser + 1
    const user = {
        id : countUser,
        name
    }
    users.push(user)
    return res.json({
        success :true,
        message : 'creat user success',
        results :user
    })
}

exports.updateUser = (req,res)=>{
    const {id} = req.params
    const {name} = req.body
    const userId = users.map(user => user.id).indexOf(parseInt(id))
    if(userId === -1){
        return res.status(404).json({
            success: false,
            message: 'user not found'
        })
    }
        users[userId].name = name
        return res.json({
            success : true,
            message :'ok',
            results :users[userId]
        })
     
}

exports.deleteUser = (req,res)=>{
    const {id} = req.params
    const user = users.filter(user =>user.id === parseInt(id))
    if(!user.length){
            return res.status(404).json({
            success: false,
            message : 'user not found'
        })
    }
            users = users.filter(user=>user.id !==parseInt(id))
        return res.json({
            success :true,
            message: 'hapus data user'
        })
}