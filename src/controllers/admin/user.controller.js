const userModel = require('../../models/users.model')
const argon = require('argon2')
const { errorHelper } = require('../../moduls/check')
 
// exports.getAllUsers = async (req, res) => {
//     const users = await userModel.findAll();
//     return res.json({
//         success: true,
//         message: 'List all users',
//         results: users
//     });
// };
exports.getAllUsers = async (req, res) => { 
    try {
        const {searchKey, sortBy, order, page=1, limit} = req.query
        const limitData = parseInt(limit) || 5

        const count = await userModel.countAll(searchKey)      
        const listUsers = await userModel.findAll(searchKey, sortBy, order, page, limitData)
        
        const totalPage = Math.ceil(count / limitData)
        const nextPage = parseInt(page) + 1
        const prevPage = parseInt(page) - 1

        return res.json({                                                              
            success: true,
            message: `List all users`,
            pageInfo: {
                currentPage: parseInt(page),
                totalPage,
                nextPage: nextPage <= totalPage ? nextPage : null,
                prevPage: prevPage >= 1 ? prevPage : null,
                totalData: parseInt(count)
            },
            results: listUsers                                                    
        })
    } catch (error) {
        return errorHelper(error, res)
    }
}



exports.getDetailUser = async (req, res) => {
    // Mendefinisikan fungsi getDetailUser dengan parameter fungsi arrow yang mewakili req dan res
    try { // Menggunakan blok try untuk menangani pengecualian yang mungkin terjadi selama eksekusi fungsi
        // Menggunakan userModel untuk mencari detail user berdasarkan ID yang diberikan dalam request parameters
        const user = await userModel.findOne(parseInt(req.params.id))
        // Mengembalikan respons JSON dengan detail user jika user ditemukan

        //test
        // if (!user) {
        //     return res.status(404).json({ // Menggunakan status 404 untuk menunjukkan pengguna tidak ditemukan
        //         success: false,
        //         message: 'user not found'
        //     })
        // }
        //test

        return res.json({
            success: true,      // Memberikan status keberhasilan true
            message: 'ok',      // Memberikan pesan 'ok' sebagai indikasi bahwa permintaan berhasil
            results: user      // Mengembalikan data detail user yang ditemukan
        });
    } catch (error) { // Menggunakan blok catch untuk menangani kesalahan jika terjadi selama eksekusi try block
        console.log(error)
        return errorHelper(error, res) // Memanggil fungsi errorHelper untuk menangani kesalahan yang terjadi dan memberikan respon yang sesuai
    }  
}



// sebelum memakai switch  exports.createUser
// exports.createUser = async (req, res) => {
//     try {
//         if (req.body.password){
//             req.body.password = await argon.hash(req.body.pa)
//         }
//         const user = await userModel.insert(req.body)
//         return res.json({
//             success: true,
//             message: 'create user success',
//             results: user
//         })
//     } catch (err) {
//         console.log(JSON.stringify(err))
//         if(err.code === "23502"){
//             return res.status(400).json({
//                 success: false,
//                 message: `${err.column} cannot be empty`
//         })
//     }
//         return res.status(400).json({
//             success: false,
//             message: 'error'
//         })
//     }
// }

exports.createUser = async (req, res) => {
    try {
        if (req.body.password){
            req.body.password = await argon.hash(req.body.password)
        }
        const user = await userModel.insert(req.body);
        return res.json({
            success: true,
            message: 'create user success',
            results: user
        })
    } catch (error) {
        return errorHelper(error, res)
    }
    // } catch (err) {
    //     console.log(JSON.stringify(err));

    //     switch (err.code) {
    //         case "23502":
    //             return res.status(400).json({
    //                 success: false,
    //                 message: `${err.column} cannot be empty`
    //             })
    //             case "23505":
    //                 const errorMessage = err.column = 'email already exists'
    //                 return res.status(400).json({
    //                     success: false,
    //                     message: errorMessage
    //                 })
    //         default:
    //             return res.status(500).json({
    //                 success: false,
    //                 message: 'Internal server error'
    //             })
    //     }
    // }
}




exports.updateUser = async(req,res)=>{
    try {
        const {id}=req.params
        const data = await userModel.findOne(id)
        if(!data){
            throw Error(`user id ${id} not found`)
        }
      if(req.file){
        req.body.pictures = req.file.filename
      }
  
      if(req.body.password){
        req.body.password = await argon.hash(req.body.password)
      }
      
      const user = await userModel.update(id, req.body)
      return res.json({
        success: true,
        message: 'Update User Successfully',
        results: user
      })
    } catch (error) {
        return errorHelper(error,res)
    }
}


// exports.updateUser = async (req, res) => {
//     try {
//         const { id } = req.params
        
//         const data = {
//             ...req.body
//         }
//         if (req.body.password) {
//             data.password = await argon.hash(req.body.password);
//         }
//         const user = await userModel.update(id, data)
//         return res.json({
//             success: true,
//             message: 'ok',
//             results: user
//         });
//     } catch (error) {
//         return errorHelper(error, res)
//     }

//         // console.error(JSON.stringify(err));

//         // switch (err.code) {
//         //     case "42601": // jika tidak di isi apa2
//         //         return res.status(400).json({
//         //             success: false,
//         //             message: `fill in the  correct data`
//         //         });
//         //     case "22P02":
//         //         const errorMessage = `key id not found`; // jika tidak mengisi id
//         //         return res.status(400).json({
//         //             success: false,
//         //             message: errorMessage
//         //         });
//         //     default:
//         //         return res.status(500).json({
//         //             success: false,
//         //             message: 'Internal server error'
//         //         });
//         // }
//     // }
// }


exports.deleteUser = async (req,res)=>{
    const {id} =req.params
    const user = await userModel.delete(id)

    return res.json({
        success :true,
        message : 'delete succes',
        results : user
    })
}