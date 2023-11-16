const users =[
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
    return res.json({
        succces: true,
        maessage : 'List all users',
        results : users
    })
}

exports.getDetailUser = (req,res)=>{
    const user = users.filter(item => item.id === parseInt(req.params.id))
    // melakukan filter user untuk mendapatkan data user dengan ID yang sesuai
    if(user[0]){
        return res.json({
            success: true,
            message: 'ok',
            results:user[0]
        })
    }else{
        return res.status(404).json({
            success:false,
            message:'user not found'
        })
    }
    
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

exports.updateUsers = (req,res)=>{
    const {id,username} =req.body
    if(username === "user" && id === "1"){
        return res.json ({
            succces : true,
            message: 'update data berhasil'
        })
    }else {
        return res.json({
            succces: false,
            message: 'update data tidak berhasil'
        })
    }
}

exports.deleteUsers = (req,res)=>{
    return res.json({
        success :true,
        message: 'hapus data user'
    })
}