const publicRouter = require('express').Router()




publicRouter.use('/products',require('./products.router'))


module.exports = publicRouter