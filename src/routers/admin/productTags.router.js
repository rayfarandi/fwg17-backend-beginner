const ptRouter = require('express').Router()

const ptController = require('../../controllers/admin/productTags.controller')

ptRouter.get('/', ptController.getAllProductTags)
ptRouter.get('/:id', ptController.getDetailProductTags)
ptRouter.post('/', ptController.createProductTags)
ptRouter.patch('/:id', ptController.updateProductTags)
ptRouter.delete('/:id', ptController.deleteProductTags)

module.exports = ptRouter
