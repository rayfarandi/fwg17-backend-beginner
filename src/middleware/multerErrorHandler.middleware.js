const multer = require('multer')

const multerErrorHandler = (err, req, res, next) => {
    console.log("Multer Error Handler:", err); // Tambahkan log untuk melihat apakah kesalahan tertangkap
    console.log("Error code:", err.code);
    console.log("Error message:", err.message);
    if(err instanceof multer.MulterError){
        if(err.code === 'LIMIT_FILE_SIZE'){
            return res.status(400).json({
                success: false,
                message: 'The file size exceeds the maximum limit of 500 KB'
            })
        }
    }else if (err.message === 'The file extension is not allowed; only JPEG, JPG, and PNG are permitted'){
        return res.status(400).json({
            success: false,
            message: err.message
        })
    }else{
        return res.status(500).json({
            success: false,
            message: `Internal server error`
        })
    }
}

module.exports = multerErrorHandler