const tagRouter = require('express').Router()
// untuk membuat route di modul express dan di simpan di variabel 'tagRouter'

const tagController = require ('../controllers/tags.controller')
//adalah fungsi dari variabel 'tagController' yang mengimport modul dari lokasi tag.controller
tagRouter.get('/',tagController.getAlltags)
//ketika mendapatkan '/' tag dari http dengan mengunakan metod get, dan akan menjalankan fungsi getAlltags dari controller tag.controller untuk melihat semua data tags
tagRouter.get('/:id',tagController.getDetailtag)
//ketika mendapatkan '/:id' tag dari http dengan mengunakan metod get, dan akan menjalankan fungsi getDetailtag dari controller tag.controller untuk melihat data tag by id
tagRouter.post('/',tagController.createtag)
//ketika mendapatkan '/' tag dari http dengan permintaan post, dan akan menjalankan fungsi createtag dari tag.controller
tagRouter.patch('/:id',tagController.updatetag)
//ketika mendapatkan '/:id' tag dari http dengan permintaan patch, dan akan menjalankan fungsi updatetag dari tag.controller untuk data tag by id
tagRouter.delete('/:id',tagController.deletetag)
//ketika mendapatkan '/:id' tag dari http dengan permintaan delete, dan akan menjalankan fungsi deletetag dari tag.controller untuk data tag by id


module.exports = tagRouter
// membuat modul tagRouter yg dapat di gunakan fungsinya