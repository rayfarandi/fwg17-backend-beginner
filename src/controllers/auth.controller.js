const userModel = require('../models/user.model')
const argon = require('argon2')
const jwt = require('jsonwebtoken')
const { errorHandler } = require('../moduls/check')

exports.login = async (req, res) => { 
    try {
        const {email, password} = req.body                                                              // destruct data dari req.body                           
        
        if(!email){
            throw new Error(`please enter your email`)
        }
        
        const user = await userModel.findOneByEmail(email)                                              // melakukan pengecekan apakah email ada didatabase dengan kata lain apa sudah terdaftar
        if(!user){
            throw new Error(`email not registered`)                                                     // jika email tidak di temukan di database maka lempar error ke catch 
        }
        
        if(!password){
            throw new Error(`please enter your password`)
        }
    
        const verify = await argon.verify(user.password, password)                                      // pengecekan apakah password benar jika tidak maka lempar error ke catch
        if(!verify){
            throw new Error(`wrong password`)
        }

        const payload = {                                                                               // membuat data payload yg berisi informasi penggunaa biasanya id dan role untuk membuat token
            id: user.id,
            role: user.role
        }

        const token = jwt.sign(payload, process.env.APP_SECRET || 'secretKey')                         // membuat token yg berisi data payload dan APP_SECRET. token otomatis di simpan di http request di dalam headers authorization

        return res.json({                                                                              // server mengirim respon saat login berhasil
            success: true,
            message: `Login success`,
            results: {
                token: token
            }
        })

    } catch (error) {
        errorHandler(error, res)
    }                                 
}


exports.register = async (req, res) => {
    try {
        const {fullName, email, password, confirmPassword,address} = req.body
        

        if(!fullName){
            throw new Error(`Full Name cannot be empty`)
        }

        if(!email){
            throw new Error(`email cannot be empty`)
        }
        if(!address){
            throw new Error(`address cannot be empty`)
        }

        const user = await userModel.findOneByEmail(email)            
        if(user){
            throw new Error(`email already registered`)                                                
        }

        if(!password){
            throw new Error(`password cannot be empty`)
        }

        if(!confirmPassword){
            throw new Error(`please confirm password`)
        }

        if(password !== confirmPassword){
            throw new Error(`wrong confirm password`)
        }

        await userModel.insert({                                                        
            fullName,
            email,
            password,
            role: "customer",
            address
        })

        return res.json({
            success: true,
            message: 'Register success'
        })
    } catch (error) {
        errorHandler(error, res)
    }
}


