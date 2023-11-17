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
// mendefinisikan fungsi untuk mendapatkan semua penguna parameter fungsi arrow untuk mewakili req dan res

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
            // kembalikan data user yg di masukan dari pengguna dengan id
        })    
}

exports.createUser = (req,res)=>{
// mendefininikan fungsi createuser, parameter fungsi arrow untuk mewakili req dan res
    req.countUser = req.countUser + 1
    //menambah 1 ke variabel countUser yang disimpan di objek permintaan (req)
    const {name} = req.body
    // membuat req.body untuk mendapat nilai dari 'name' dari data 
    countUser = countUser + 1
    // meambahkan 1 ke variabel countuser unuk menghasilkan id baru
    const user = {
        id : countUser,
        name
        //membuat objek penguna baru dengan id dari +1 countuser dan nama yg di berikan dari http post yg di kirim user
    }
    users.push(user)
    //menambahkan penguna baru ke array
    return res.json({
        success :true,
        message : 'creat user success',
        results :user
    //mengirim respons json jika penguna baru berhasil di create
    })
}

exports.updateUser = (req,res)=>{
// mendefininikan fungsi updateuser, parameter fungsi arrow untuk mewakili req dan res
    const {id} = req.params
    // mendapatkan id dari paramaeter yg di masukan user
    const {name} = req.body
    // mendapatkan name dari body paramaeter yg di masukan user
    const userId = users.map(user => user.id).indexOf(parseInt(id))
    //mengunakan metode map dan indexOf untuk mencari indeks pengguna dalam array users berdasarkan id dan di conversi menjadi angka yang diberikan dari penguna
    if(userId === -1){
    // apakah userid bernilai -1
        return res.status(404).json({
        // kembalikan resposn status 404 ke penguna
            success: false,
            message: 'user not found'
            // cetak ke penguna
        })
    }
        users[userId].name = name
        // jika userid ditemukan/sama dari parameter yg di masukan pengua
        return res.json({
        // kirim respons json ke penguna 
            success : true,
            message :'ok',
            results :users[userId]
            //tampilkan detail user yg baru di perbaharui
        })
     
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