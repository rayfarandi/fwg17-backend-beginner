const { error } = require('console')
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
            //filename = filename || req.params.name + Date.now()
            filename = req.body.name + '-' + Date.now()
        }
            //mengunakan req dari isian name product + tanggal input
            cb(null,`${filename}${extention[file.mimetype]}`)
    }
})
const fileFilter = (req,file,cb )=>{
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg'){
        cb(null,true)
        }else{
            cb(new Error('invalid file type, only jpg,jpeg and png',false))
            console.log(Error)
            }
        }
const insertMiddlware = (type, file)=>{
    const processUpload = multer({
        storage:storage(type, file),
        fileFilter:fileFilter
    })
    return processUpload
} 


module.exports = insertMiddlware