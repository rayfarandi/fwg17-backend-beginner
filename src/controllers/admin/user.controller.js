const userModel = require('../../models/users.model')
 
exports.getAllUsers = async (req, res) => {
    const users = await userModel.findAll();
    return res.json({
        success: true,
        message: 'List all users',
        results: users
    });
};



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


exports.createUser = async (req, res) => {
    try {
        const user = await userModel.insert(req.body)
        return res.json({
            success: true,
            message: 'create user success',
            results: user
        })
    } catch (err) {
        console.log(JSON.stringify(err))
        if(err.code === "23502"){
            return res.status(400).json({
                success: false,
                message: `${err.column} cannot be empty`
        })
    }
        return res.status(400).json({
            success: false,
            message: 'error'
        })
    }
}
// exports.createUser = async (req, res) => {
//     try {
//         const user = await userModel.insert(req.body);
//         return res.json({
//             success: true,
//             message: 'create user success',
//             results: user
//         })
//     } catch (err) {
//         console.log(JSON.stringify(err));

//         switch (err.code) {
//             case "23502":
//                 return res.status(400).json({
//                     success: false,
//                     message: `${err.column} cannot be empty`
//                 })
//                 case "23505":
//                     const errorMessage = err.column = 'email already exists'
//                     return res.status(400).json({
//                         success: false,
//                         message: errorMessage
//                     })
//             default:
//                 return res.status(500).json({
//                     success: false,
//                     message: 'Internal server error'
//                 })
//         }
//     }
// }





// exports.updateUser = async (req, res) => {
//     const {id} = req.params
//     const user = await userModel.update(id, req.body)
    
//     return res.json({
//         succces: true,
//         message: 'ok',
//         results: user
//     })
// }

// exports.updateUser = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const user = await userModel.update(id, req.body);

//         return res.json({
//             success: true,
//             message: 'ok',
//             results: user
//         });
//     } catch (err) {
//         console.error(JSON.stringify(err));

//         switch (err.code) {
//             case "42601": // jika tidak di isi apa2
//                 return res.status(400).json({
//                     success: false,
//                     message: `fill in the  correct data`
//                 });
//             case "22P02":
//                 const errorMessage = `key id not found`; // jika tidak mengisi id
//                 return res.status(400).json({
//                     success: false,
//                     message: errorMessage
//                 });
//             default:
//                 return res.status(500).json({
//                     success: false,
//                     message: 'Internal server error'
//                 });
//         }
//     }
// }
//tes
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.update(id, req.body);

        return res.json({
            success: true,
            message: 'ok',
            results: user
        });
    } catch (err) {
        console.error(JSON.stringify(err));

        switch (err.code) {
            case "42601":
                return res.status(400).json({
                    success: false,
                    message: `Fill in the correct data`
                })
            case "22P02":
                const errorMessage = `Key id not found`;
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


exports.deleteUser = async (req,res)=>{
    const {id} =req.params
    const user = await userModel.delete(id)

    return res.json({
        success :true,
        message : 'delete succes',
        results : user
    })
}