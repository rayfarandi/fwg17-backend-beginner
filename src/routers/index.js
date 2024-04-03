const router = require('express').Router()
const authMiddleware = require('../middleware/auth.middleware')
const roleCheckMiddleware = require('../middleware/roleCheck.middleware')
const productController = require('../controllers/admin/product.controller')
const orderFlow = require('../controllers/orderFlow.controller')
const orderController = require('../controllers/admin/order.controller')
const checkoutController = require('../controllers/checkout.controller')
const orderDetailsController = require('../controllers/admin/orderDetails.controller')

const uploadMiddleware = require('../middleware/upload.middleware')
const multerErrorHandler = require('../middleware/multerErrorHandler.middleware')

router.use('/auth', require('./auth.router'))
router.use('/admin', authMiddleware, roleCheckMiddleware("admin"), require('./admin'))
router.use('/profile', authMiddleware, require('./profile.router'))


router.get('/products', productController.getAllProducts)
router.get('/products/:id', productController.getDetailProduct) 

router.post('/checkout', authMiddleware, checkoutController.createOrder)

router.get('/orders', authMiddleware, orderController.getAllOrders)
router.get('/order/:id', authMiddleware, orderController.getDetailOrder)
router.post('/order-details', authMiddleware, orderDetailsController.createOrderDetail)
router.get('/order-details', authMiddleware, checkoutController.getOrderProducts)
router.get('/data-size', checkoutController.getPriceSize)
router.get('/data-variant', checkoutController.getPriceVariant)

router.post('/order-flow', authMiddleware, roleCheckMiddleware("customer"), orderFlow.orderProducts)





module.exports = router