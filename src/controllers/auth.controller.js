const userModel = require('../models/users.model')
const argon = require('argon2')
const jwt = require('jsonwebtoken')

exports.login = async (req,res)=>{
    try{
    const {email,password} = req.body
    const user = await userModel.findOneByEmail(email)

    if(!user){
        throw Error('wrong')
    }
    const verify = await argon.verify(user.password, password)
    
        if (!verify){
            
            throw Error('wrong')
        }
        const payload = {
            id: user.id,
            role: user.role
        }
        const token = jwt.sign(payload,process.env.APP_SECRET || 'secreatkey')

        return res.json({
            succces: true,
            message: 'login succes',
            results:{
                token
            }
        })
    
    }catch(err){
        if (err.message === 'wrong' ){
            return res.status(401).json({
                succces: false,
                message: 'wrong email or password'
            })
        }
        console.log(err)
        return res.status.json({
            succces: false,
            message: 'internal server error'
        })
    }
// console.log(req.body)
    // //cetak req dari body yg dikirimkan penguna
    // const {username,password} =req.body
    // //mendefinisikan username dan password yg di terima dari penguna dengan postman
    // if(username === "admin@mail.com" && password === "1234"){
    // //pengecekan apakah username dan password sesuai
    //     return res.json ({
    //     //jika sesuai makan kirim respon json 
    //         succces : true,
    //         message: 'login succes'
    //         // cetak ke penguna
    //     })
    // }else {
    // //jika salah
    //     return res.json({
    //     //jika makan kirim respon json 
    //         succces: false,
    //         message: 'wrong username or password'
    //         //cetak ke pengguna
    //     })
    // }
}

// exports.logout = async (req,res)=>{
//     const cookies = req.headers.authorization
//     cookies.destroy()
//     res.json({
//         success: true,
//         message: 'Logout successful',
//     })
// }

exports.register = async (req,res)=>{
    try{
        const {fullName,email,password} = req.body
        const hashed = await argon.hash(password)
        const user = userModel.insert({
            fullName,
            email,
            password : hashed
        })
        return res.json({
            succces: true,
            message: 'registrasi succesfully'
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            succces: false,
            message: 'internal server error'
        })
    }
}