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
        // if(!filename && req.params.id){
        //     filename = req.params.id
        // }else if(!filename){
        //     filename = new Date().getTime()
        // }
        filename = new Date().getTime()
        //filename = uuidv4()
        cb(null,`${filename}${extention[file.mimetype]}`)
    }
})
const uploadMiddlware = (type, file)=>{
    const processUpload = multer({
        storage:storage(type, file),
        limits: {
            fileSize: 2*1024 * 1024
        }
    })
    return processUpload
} 

module.exports = uploadMiddlware