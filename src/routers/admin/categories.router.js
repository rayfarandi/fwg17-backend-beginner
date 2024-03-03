const categoriesRouter = require('express').Router()
// untuk membuat route di modul express dan di simpan di variabel 'categoriesRouter'

const categoriesController = require ('../../controllers/admin/categorie.controller')
//adalah fungsi dari variabel 'categorieController' yang mengimport modul dari lokasi categorie.controller
categoriesRouter.get('/',categoriesController.getAllCategories)
//ketika mendapatkan '/' categorie dari http dengan mengunakan metod get, dan akan menjalankan fungsi getAllcategories dari controller categorie.controller untuk melihat semua data categories
categoriesRouter.get('/:id',categoriesController.getDetailCategory)
//ketika mendapatkan '/:id' categorie dari http dengan mengunakan metod get, dan akan menjalankan fungsi getDetailcategorie dari controller categorie.controller untuk melihat data categorie by id
categoriesRouter.post('/',categoriesController.createCategory)
//ketika mendapatkan '/' categorie dari http dengan permintaan post, dan akan menjalankan fungsi createcategorie dari categorie.controller
categoriesRouter.patch('/:id',categoriesController.updateCategory)
//ketika mendapatkan '/:id' categorie dari http dengan permintaan patch, dan akan menjalankan fungsi updatecategorie dari categorie.controller untuk data categorie by id
categoriesRouter.delete('/:id',categoriesController.deleteCategory)
//ketika mendapatkan '/:id' categorie dari http dengan permintaan delete, dan akan menjalankan fungsi deletecategorie dari categorie.controller untuk data categorie by id


module.exports = categoriesRouter
// membuat modul categoriesRouter yg dapat di gunakan fungsinya