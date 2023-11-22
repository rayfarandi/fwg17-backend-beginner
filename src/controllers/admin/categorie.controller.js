let categories =[
        {
            id: 1,
            name: 'Leanne Graham'
        },
        {
            id: 2,
            name:'Clamentine Duduque'

        }
    ] //// array untuk menyimpan data pengguna
let countcategorie = categories.length
// membuat variabel menghitung jumlah pengguna

const categorieModel = require('../../models/categories.model')
 
exports.getAllcategories = async (req,res)=>{
// mendefinisikan fungsi untuk mendapatkan semua penguna parameter fungsi arrow untuk mewakili req dan res
    const categories = await categorieModel.findAll()
    return res.json({
    // mengembalikan respon json jika berhasil
        succces: true,
        // pesan sukses        
        maessage : 'List all categories',
        // pesan cetak string list all categories
        results : categories
        // mengembalikan hasil dari array categories
    })
}

exports.getDetailcategorie = async (req,res)=>{
// mendefininikan fungsi getdatacategorie, parameter fungsi arrow untuk mewakili req dan res
     const id = parseInt(req.params.id)
     const categorie = await categorieModel.findOne(id)
    // melakukan filter categorie untuk mendapatkan data categorie dengan ID yang sesuai,dan konfersi id dari string ke nomor
    if(!categorie){
    // garding, jika array kosong maka
        return res.status(404).json({
        // kembalikan resposn status 404 ke penguna
            success:false,
            message:'categorie not found'
            // cetak ke penguna
        })
    }
        return res.json({
        // kembalikan jika penguna ditemukan, kirim respons json
            success: true,
            message: 'ok',
            // cetak ke penguna
            results:categorie
            // kembalikan data categorie yg di masukan dari pengguna dengan id
        })    
}


// exports.createcategorie = async (req, res) => {
//     try {
//         const categorie = await categorieModel.insert(req.body)
//         return res.json({
//             success: true,
//             message: 'create categorie success',
//             results: categorie
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
exports.createcategorie = async (req, res) => {
    try {
        const categorie = await categorieModel.insert(req.body);
        return res.json({
            success: true,
            message: 'create categorie success',
            results: categorie
        });
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



// exports.updatecategorie = (req,res)=>{
// // mendefininikan fungsi updatecategorie, parameter fungsi arrow untuk mewakili req dan res
//     const {id} = req.params
//     // mendapatkan id dari paramaeter yg di masukan categorie
//     const {name} = req.body
//     // mendapatkan name dari body paramaeter yg di masukan categorie
//     const categorieId = categories.map(categorie => categorie.id).indexOf(parseInt(id))
//     //mengunakan metode map dan indexOf untuk mencari indeks pengguna dalam array categories berdasarkan id dan di conversi menjadi angka yang diberikan dari penguna
//     if(categorieId === -1){
//     // apakah categorieid bernilai -1
//         return res.status(404).json({
//         // kembalikan resposn status 404 ke penguna
//             success: false,
//             message: 'categorie not found'
//             // cetak ke penguna
//         })
//     }
//         categories[categorieId].name = name
//         // jika categorieid ditemukan/sama dari parameter yg di masukan pengua
//         return res.json({
//         // kirim respons json ke penguna 
//             success : true,
//             message :'ok',
//             results :categories[categorieId]
//             //tampilkan detail categorie yg baru di perbaharui
//         })
     
// }

exports.updatecategorie = async (req, res) => {
    try {
        const {id} = req.params
        const categorie = await categorieModel.update(req.body);
        if (categorie) {
            return res.json({
                success: true,
                message: 'update categorie success',
                results: categorie
            });
        } else {
            // menghendel case jika data tidak di temukan
            return res.status(404).json({
                success: false,
                message: 'Data not found for update'
            });
        }
    } catch (err) {
        console.log(JSON.stringify(err));

        switch (err.code) {
           
            case "23502":
                return res.status(400).json({
                    success: false,
                    message: `${err.column} data not found`
                });
            default:
                
                return res.status(500).json({
                    success: false,
                    message: 'Internal server error'
                });
        }
    }
}


exports.deletecategorie = (req,res)=>{
//// mendefininikan fungsi deletecategorie, parameter fungsi arrow untuk mewakili req dan res
    const {id} = req.params
    // mendapatkan id dari paramaeter yg di masukan categorie
    const categorie = categories.filter(categorie =>categorie.id === parseInt(id))
    // menjalankan filter pada array categories untuk mendapatkan categorie.id yang hanya berisi id pengguna,mengkonversi nilai id yg di terima dari parameter ke angka, lalu di bandingkan 
    if(!categorie.length){
    // jika data categorie dari pengguna tidak di temukan, mengunakan metode garding,melakukan negasi jika array nya kosong
            return res.status(404).json({
            //// kembalikan resposn status 404 ke penguna
            success: false,
            message : 'categorie not found'
            // cetak ke penguna
        })
    }
            categories = categories.filter(categorie=>categorie.id !==parseInt(id))
            // mengkonversi nilai id yg di terima dari parameter ke angka, lalu di bandingkan , menjalankan filter di array categories dan jika  menemuka id yg sama makan akan menghilangkan id tersebut
        return res.json({
        // kirim respons json ke penguna 
            success :true,
            message: 'hapus data categorie'
            // cetak ke penguna
        })
}