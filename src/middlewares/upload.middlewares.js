const multer = require('multer')
const path = require('path')

const storage = (dest,filename)=> multer.diskStorage({
    destination: (req, file,cb)=>{
        cb(null, path.join('uploads/',dest))
    },
    filename: (req, file, cb)=>{
        const extention = {
            'image/jpeg': '.jpg',
            'image/png': '.png' 
        }
        if(!filename){
            filename = req.params.id
        }
        cb(null,`${filename}${extention[file.mimetype]}`)
    }
})
const uploadMiddlware = (type, file)=>{
    const processUpload = multer({
        storage:storage(type, file)
    })
    return processUpload
} 


module.exports = uploadMiddlware