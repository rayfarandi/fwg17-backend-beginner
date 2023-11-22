const categorieRouter = require('express').Router()
// untuk membuat route di modul express dan di simpan di variabel 'categorieRouter'

const categorieController = require ('../../controllers/admin/categorie.controller')
//adalah fungsi dari variabel 'categorieController' yang mengimport modul dari lokasi categorie.controller
categorieRouter.get('/',categorieController.getAllcategories)
//ketika mendapatkan '/' categorie dari http dengan mengunakan metod get, dan akan menjalankan fungsi getAllcategories dari controller categorie.controller untuk melihat semua data categories
categorieRouter.get('/:id',categorieController.getDetailcategorie)
//ketika mendapatkan '/:id' categorie dari http dengan mengunakan metod get, dan akan menjalankan fungsi getDetailcategorie dari controller categorie.controller untuk melihat data categorie by id
categorieRouter.post('/',categorieController.createcategorie)
//ketika mendapatkan '/' categorie dari http dengan permintaan post, dan akan menjalankan fungsi createcategorie dari categorie.controller
categorieRouter.patch('/:id',categorieController.updatecategorie)
//ketika mendapatkan '/:id' categorie dari http dengan permintaan patch, dan akan menjalankan fungsi updatecategorie dari categorie.controller untuk data categorie by id
categorieRouter.delete('/:id',categorieController.deletecategorie)
//ketika mendapatkan '/:id' categorie dari http dengan permintaan delete, dan akan menjalankan fungsi deletecategorie dari categorie.controller untuk data categorie by id


module.exports = categorieRouter
// membuat modul categorieRouter yg dapat di gunakan fungsinya