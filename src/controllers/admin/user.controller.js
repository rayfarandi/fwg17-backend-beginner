const userModel = require('../../models/users.model')
const argon = require('argon2')
const { errorHandler } = require('../../moduls/handling')
 
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
                prevPage: prevPage > 1 ? prevPage : null,
                totalData: parseInt(count)
            },
            results: listUsers                                                    
        })
    } catch (error) {
        errorHandler(error, res)
    }
}



exports.getDetailUser = async (req,res)=>{
// mendefininikan fungsi getdatauser, parameter fungsi arrow untuk mewakili req dan res
     const id = parseInt(req.params.id)
     const user = await userModel.findOne(id)
    // melakukan filter user untuk mendapatkan data user dengan ID yang sesuai,dan konfersi id dari string ke nomor
    if(!user){
    // garding, jika array kosong maka
        return res.status(404).json({
        // kembalikan resposn status 404 ke penguna
            success:false,
            message:'user not found'
            // cetak ke penguna
        })
    }
        return res.json({
        // kembalikan jika penguna ditemukan, kirim respons json
            success: true,
            message: 'ok',
            // cetak ke penguna
            results:user
            // kembalikan data user yg di masukan dari pengguna dengan id
        })    
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
    } catch (err) {
        console.log(JSON.stringify(err));

        switch (err.code) {
            case "23502":
                return res.status(400).json({
                    success: false,
                    message: `${err.column} cannot be empty`
                })
                case "23505":
                    const errorMessage = err.column = 'email already exists'
                    return res.status(400).json({
                        success: false,
                        message: errorMessage
                    })
            default:
                return res.status(500).json({
                    success: false,
                    message: 'Internal server error'
                })
        }
    }
}




// mencoba argon sendiri,berhasil tp masih kurang tepat
// exports.updateUser = async (req, res) => {
//     try {
//         const { id } = req.params
//         const updatedUser = await userModel.update(id, req.body)

//         // dihash di sini
//         if (req.body.password) {
//             req.body.password = await argon.hash(req.body.password)
//         }

//         return res.json({
//             success: true,
//             message: 'User updated successfully',
//             results: updatedUser
//         })
//     } catch (err) {
//         console.error(JSON.stringify(err))

//         switch (err.code) {
//             case "42601":
//                 return res.status(400).json({
//                     success: false,
//                     message: 'Fill in the correct data'
//                 });
//             case "22P02":
//                 const errorMessage = 'Key id not found';
//                 return res.status(400).json({
//                     success: false,
//                     message: errorMessage
//                 })
//             default:
//                 return res.status(500).json({
//                     success: false,
//                     message: 'Internal server error'
//                 })
//         }
//     }
// }


exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        
        const data = {
            ...req.body
        }
        if (req.body.password) {
            data.password = await argon.hash(req.body.password);
        }
        const user = await userModel.update(id, data)
        return res.json({
            success: true,
            message: 'ok',
            results: user
        });
    } catch (err) {
        console.error(JSON.stringify(err));

        switch (err.code) {
            case "42601": // jika tidak di isi apa2
                return res.status(400).json({
                    success: false,
                    message: `fill in the  correct data`
                });
            case "22P02":
                const errorMessage = `key id not found`; // jika tidak mengisi id
                return res.status(400).json({
                    success: false,
                    message: errorMessage
                });
            default:
                return res.status(500).json({
                    success: false,
                    message: 'Internal server error'
                });
        }
    }
}


exports.deleteUser = async (req,res)=>{
    const {id} =req.params
    const user = await userModel.delete(id)

    return res.json({
        success :true,
        message : 'delete succes',
        results : user
    })
}