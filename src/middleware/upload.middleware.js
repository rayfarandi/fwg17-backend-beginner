const multer = require('multer')
const path = require('path')

const storage = (dest) => multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join('uploads', dest))
    },
    filename: (req, file, cb) => {
        console.log(file)
        const extension = {
            'image/jpg': '.jpg',
            'image/jpeg': '.jpeg',
            'image/png': '.png'
        }

        const filename = new Date().getTime()

        cb(null, `${filename}${extension[file.mimetype]}`)
    }
})


const fileFilter = (req, file, cb) => {
    const allowedFileTypes =['.jpeg','.jpg', '.png']

    const isExtnameAllowed = allowedFileTypes.includes(path.extname(file.originalname))
    if(isExtnameAllowed){                                                                                                       // jika true file dapat di upload
        cb(null, true)
    }else{
        const errorMessage = 'The file extension is not allowed; only JPEG, JPG, and PNG are permitted'
        cb(new Error(errorMessage), false)
    }
}


const limits = {
    fileSize: 500 * 1024
}


const uploadMiddleware = (dest, filename) => {
    const processUpload = multer({
        storage: storage(dest, filename),
        // untuk mengatur kemana menyimpan file
        fileFilter: fileFilter,
        // untuk mengatur file seperti apa yg bisa di upload
        limits: limits
        // untuk mengatur batasan terhadap file yg di upload
    })
    
    return processUpload
}

module.exports = uploadMiddleware