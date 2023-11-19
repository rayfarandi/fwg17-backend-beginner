const productCategorieRouter = require('express').Router()
// untuk membuat route di modul express dan di simpan di variabel 'productCategorieRouter'

const productCategorieController = require ('../controllers/productCategorie.controller')
//adalah fungsi dari variabel 'productCategorieController' yang mengimport modul dari lokasi productCategorie.controller
productCategorieRouter.get('/',productCategorieController.getAllproductCategories)
//ketika mendapatkan '/' productCategorie dari http dengan mengunakan metod get, dan akan menjalankan fungsi getAllproductCategories dari controller productCategorie.controller untuk melihat semua data productCategories
productCategorieRouter.get('/:id',productCategorieController.getDetailproductCategorie)
//ketika mendapatkan '/:id' productCategorie dari http dengan mengunakan metod get, dan akan menjalankan fungsi getDetailproductCategorie dari controller productCategorie.controller untuk melihat data productCategorie by id
productCategorieRouter.post('/',productCategorieController.createproductCategorie)
//ketika mendapatkan '/' productCategorie dari http dengan permintaan post, dan akan menjalankan fungsi createproductCategorie dari productCategorie.controller
productCategorieRouter.patch('/:id',productCategorieController.updateproductCategorie)
//ketika mendapatkan '/:id' productCategorie dari http dengan permintaan patch, dan akan menjalankan fungsi updateproductCategorie dari productCategorie.controller untuk data productCategorie by id
productCategorieRouter.delete('/:id',productCategorieController.deleteproductCategorie)
//ketika mendapatkan '/:id' productCategorie dari http dengan permintaan delete, dan akan menjalankan fungsi deleteproductCategorie dari productCategorie.controller untuk data productCategorie by id


module.exports = productCategorieRouter
// membuat modul productCategorieRouter yg dapat di gunakan fungsinya