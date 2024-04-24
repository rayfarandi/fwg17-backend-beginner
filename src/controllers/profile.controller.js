const userModel = require('../models/user.model')
const { errorHandler } = require('../moduls/check')
const path = require('path')
const fs = require('fs/promises')

exports.getProfile = async (req, res) => {
  const { id } = req.user
  try {
    const user = await userModel.findOne(id)
    return res.json({
      success: true,
      message: 'detail user',
      results: user
    })
  } catch (error) {
    errorHandler(error, res)
  }
}

exports.updateProfile = async (req, res) => {
  try {
    const { id } = req.user
    const data = await userModel.findOne(id)

    if (req.file) {
      if (data.picture) {
        const picturePath = path.join(global.path, 'uploads', 'users', data.picture) // mengambil jalur path gambar
        fs.access(picturePath, fs.constants.R_OK).then(() => {
          fs.rm(picturePath) // menghapus file berdasarkan jalur path
        }).catch(() => {})
      }
      console.log(req.file)
      req.body.picture = req.file.filename
    }

    const user = await userModel.update(id, req.body)

    if (user === 'No data has been modified') {
      return res.status(200).json({
        success: true,
        message: user
      })
    }

    return res.json({
      success: true,
      message: 'update user successfully',
      results: user
    })
  } catch (error) {
    errorHandler(error, res)
  }
}

exports.deletePicture = async (req, res) => {
  try {
    const { id } = req.user
    const data = await userModel.findOne(id)

    if (data.picture) {
      const picturePath = path.join(global.path, 'uploads', 'users', data.picture)
      // fs.access(picturePath, fs.constants.R_OK)
      //   .then(() => {
      //     fs.unlink(picturePath, (err) => {
      //       if (err) {
      //         throw err // Handle error when unlinking file
      //       }
      //     })
      //   })
      //   .catch(() => {})
      fs.access(picturePath, fs.constants.R_OK).then(() => {
        fs.rm(picturePath) // menghapus file berdasarkan jalur path
      }).catch(() => {})

      // hapus picture on database
      data.picture = 'null'
      await userModel.update(id, { picture: 'null' })
      return res.json({
        success: true,
        message: 'Profile picture deleted successfully'
      })
    } else {
      return res.status(400).json({
        success: false,
        message: 'No profile picture found for the user'
      })
    }
  } catch (error) {
    errorHandler(error, res)
  }
}
