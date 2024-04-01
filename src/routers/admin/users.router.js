const userRouter = require('express').Router()

const userController = require('../../controllers/admin/user.controller')        

const uploadMiddleware = require('../../middleware/upload.middleware')


const {multerErrorHelper} = require('../../moduls/check')

userRouter.get('/', userController.getAllUsers)       
userRouter.get('/:id', userController.getDetailUser)  
userRouter.post('/',uploadMiddleware('users').single('picture'), multerErrorHelper, userController.createUser)       
userRouter.patch('/:id', uploadMiddleware('users').single('picture'), multerErrorHelper, userController.updateUser)  
// userRouter.post('/',uploadMiddleware('users').single('picture'),  userController.createUser)       
// userRouter.patch('/:id', uploadMiddleware('users').single('picture'), userController.updateUser)  
userRouter.delete('/:id', userController.deleteUser)  

module.exports = userRouter                                                     