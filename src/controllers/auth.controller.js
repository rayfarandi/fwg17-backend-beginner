const userModel = require('../models/users.model')
const argon = require('argon2')
const jwt = require('jsonwebtoken')
const { errorHelper } = require('../moduls/check')

// exports.login = async (req,res)=>{
//     try{
//     const {email,password} = req.body
//     const user = await userModel.findOneByEmail(email)

//     if(!user){
//         throw Error('wrong')
//     }
//     const verify = await argon.verify(user.password, password)
    
//         if (!verify){
            
//             throw Error('wrong')
//         }
//         const payload = {
//             id: user.id,
//             role: user.role
//         }
//         const token = jwt.sign(payload,process.env.APP_SECRET || 'secreatkey')

//         return res.json({
//             succces: true,
//             message: 'Login succes, redirec to Home',
//             results:{
//                 token
//             }
//         })
        // }catch(error){
        //     errorHelper(error,res)
        // }
    // }catch(error){
    //     if (error.message === 'wrong' ){
    //         return res.status(401).json({
    //             succces: false,
    //             message: 'wrong email or password'
    //         })
    //     }
    //     console.log(error)
    //     return res.status.json({
    //         succces: false,
    //         message: 'internal server error'
    //     })
    // }
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
// }

exports.login = async (req, res) => { 
    try {
        const {email, password} = req.body
        if(!email){
            throw new Error(`enter your email`)
        }
        const user = await userModel.findOneByEmail(email)
        if(!user){
            throw new Error(`email not registered, create new account`)
        }
        if(!password){
            throw new Error(`enter your password`)
        }
        const verify = await argon.verify(user.password, password)
        if(!verify){
            throw new Error(`wrong password, try again`)
        }
        const payload = {
            id: user.id,
            role: user.role
        }

        const token = jwt.sign(payload, process.env.APP_SECRET || 'secretKey')
        return res.json({ 
            success: true,
            message: `Login succes, redirec to Home`,
            results: {
                token: token} 
            })
    } catch (error) {
        return errorHelper(error, res)
    }                                 
}


exports.register = async (req,res)=>{
    try{
        const {fullName,email,password, address, phoneNumber,role='customer'} = req.body
        const hashed = await argon.hash(password)
        const data = await userModel.insert({
            fullName,
            email,
            password : hashed,
            address,
            phoneNumber,
            role,
        })
        // const users = {fullName,email}
        return res.json({
            success: true,
            message: 'registrasi succesfully',
            results: data
        })
    }
    catch(error){
       return errorHelper(error,res)
    }
    // catch(err){
    //     console.log(err)
    //     return res.status(500).json({
    //         succces: false,
    //         message: 'internal server error'
    //     })
    // }
    // catch (err) {
    //     console.log(JSON.stringify(err))
    //     console.log(err)

    //     switch (err.code) {
    //         case "23502":
    //             return res.status(400).json({
    //                 success: false,
    //                 message: `${err.column} cannot be empty`
    //             })
    //             case "23505":
    //                 const errorMessage = err.column = 'email already exists'
    //                 return res.status(400).json({
    //                     success: false,
    //                     message: errorMessage
    //                 })
    //         default:
    //             return res.status(500).json({
    //                 success: false,
    //                 message: 'Internal server error'
    //             })
    //     }
    // }
}