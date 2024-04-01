const adminRouter = require('express').Router()


adminRouter.use('/users', require('./users.router'))

adminRouter.use('/products',require('./products.router'))
adminRouter.use('/productSizes',require('./productSizes.router'))
adminRouter.use('/productVariants',require('./productVariants.router'))

adminRouter.use('/tags',require('./tags.router'))
adminRouter.use('/productTags',require('./productTags.router'))
adminRouter.use('/productRatings',require('./productRatings.router'))

adminRouter.use('/categories',require('./categories.router'))
adminRouter.use('/productCategories',require('./productCategories.router'))
adminRouter.use('/promos',require('./promos.route'))

adminRouter.use('/orders',require('./orders.router'))
adminRouter.use('/orderDetails',require('./orderDetails.router'))

adminRouter.use('/messages',require('./messages.router'))

module.exports = adminRouter