const userModel = require('../models/users.model')
const uploadMiddlware = require('../middlewares/upload.middlewares')
const errorHandler  = require('../moduls/handling')
const upload = uploadMiddlware('profile').single('picture')


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
                req.body.picture = req.file.filename
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