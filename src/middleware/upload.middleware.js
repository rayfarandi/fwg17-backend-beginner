const multer = require('multer');
const path = require('path');

const storage = (dest) => multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join('uploads', dest));
    },
    filename: (req, file, cb) => {
        const extension = {
            'image/jpeg': '.jpg',
            'image/jpeg': '.jpeg',
            'image/png': '.png'
        };

        const filename = `${Date.now()}${extension[file.mimetype]}`;
        cb(null, filename);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['.jpeg', '.jpg', '.png']; // Ekstensi file yang diperbolehkan

    const isExtnameAllowed = allowedFileTypes.includes(path.extname(file.originalname));
    if (isExtnameAllowed) {
        cb(null, true);
    } else {
        const errorMessage = 'File extension allowed : JPEG, JPG, and PNG only';
        cb(new Error(errorMessage), false);
    }
};

const limits = {
    fileSize: 1.5 * 1024 * 1024
}

const uploadMiddleware = (dest) => {
    const processUpload = multer({
        storage: storage(dest),
        fileFilter: fileFilter,
        limits: limits
    });

    return {
        single: (fieldName) => processUpload.single(fieldName)
    };
};


module.exports = uploadMiddleware;
