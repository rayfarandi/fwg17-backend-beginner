const publicRouter = require('express').Router()




publicRouter.use('/products',require('./products.router'))
// publicRouter.use('/productSizes',require('./productSize.route'))
// publicRouter.use('/productVariants',require('/productVariants.route'))


module.exports = publicRouter