const userModel = require('../models/users.model')
const argon = require('argon2')
const jwt = require('jsonwebtoken')
const { errorHelper } = require('../moduls/check')



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
        const {fullName,email,password,confirmPassword} = req.body
        if(!fullName){
            throw new Error(`Fullname empty, please complete it`)
        }
        if(!email){
            throw new Error(`Email empty, please complete it`)
        }

        const user = await userModel.findOneByEmail(email)
        if(user){
            throw new Error(`Email already exsit`)
        }
        if(!password){
            throw new Error(`Password empty, please complete it`)
        }
        if(!confirmPassword){
            throw new Error(`Confirm password empty, please complete it`)
        }
        if(password !== confirmPassword){
            throw new Error(`password n confirm password not match, please complete it`)
        }
        const data = await userModel.insert({
            fullName,
            email,
            password,
            role: "customer"
        })
        
        return res.json({
            success: true,
            message: 'registrasi succesfully',
            results: data
        })
    }
    catch(error){
       return errorHelper(error,res)
    }

}