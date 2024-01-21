const userModel = require('../models/users.model')
const uploadMiddlware = require('../middlewares/upload.middlewares')
const errorHandler  = require('../moduls/handling')
const upload = uploadMiddlware('profile').single('picture')
const fs = require('fs/promises')
const path =require('path')
const argon = require('argon2')



exports.getProfile = async (req,res)=>{
    const {id} = req.user
    const user = await userModel.findOne(id)
    if(user.password){
        delete user.password
    }
    return res.json({
        success:true,
        message: 'ok',
        results: user
    })
}

exports.updateProfile = (req,res)=>{
    upload(req, res, async(error)=>{
    try{
            if(error){
                throw error
                // return errorHandler(error,res)
            }
            
            const {id} = req.user
            
            if(req.file){
                const user = await userModel.findOne(id)
                if(user.picture){
                const savedPicture = path.join(global.path,'uploads','profile',user.picture)
                        fs.access(savedPicture, fs.constants.R_OK)
                        .then(()=>{
                            fs.rm(savedPicture)
                        }) .catch(()=>{})
                    }
                req.body.picture = req.file.filename
            }
            if(req.body.password){
                req.body.password = await argon.hash(req.body.password)
            }
            
        const user = await userModel.update(id, req.body)
        
        if(user.password){
            delete user.password
        }
        return res.json({
            success:true,
            message:'ok',
            results: user
        })}catch(error){
            errorHandler(error,res)
        }
        })
    
}