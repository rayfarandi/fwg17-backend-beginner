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
    return res.json({
        succces: true,
        maessage : 'List all users',
        results : users
    })
}

exports.getDetailUser = (req,res)=>{
    const user = users.filter(item => item.id === parseInt(req.params.id))
    // melakukan filter user untuk mendapatkan data user dengan ID yang sesuai
    if(!user[0]){
        return res.status(404).json({
            success:false,
            message:'user not found'
        })
    }
        return res.json({
            success: true,
            message: 'ok',
            results:user[0]
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