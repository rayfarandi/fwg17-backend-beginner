const productRouter = require('express').Router()

const productController = require ('../../controllers/public/product.controller')


productRouter.get('/',productController.getAllproducts)

productRouter.get('/:id',productController.getDetailproduct)


module.exports = productRouter
