let tags =[
    {
        id: 1,
        name: 'Leanne Graham'
    },
    {
        id: 2,
        name:'Clamentine Duduque'

    }
] //// array untuk menyimpan data pengguna
let counttag = tags.length
// membuat variabel menghitung jumlah pengguna

const tagModel = require('../../models/tags.model')

exports.getAlltags = async (req,res)=>{
// mendefinisikan fungsi untuk mendapatkan semua penguna parameter fungsi arrow untuk mewakili req dan res
const tags = await tagModel.findAll()
return res.json({
// mengembalikan respon json jika berhasil
    succces: true,
    // pesan sukses        
    maessage : 'List all tags',
    // pesan cetak string list all tags
    results : tags
    // mengembalikan hasil dari array tags
})
}

exports.getDetailtag = async (req,res)=>{
// mendefininikan fungsi getdatatag, parameter fungsi arrow untuk mewakili req dan res
 const id = parseInt(req.params.id)
 const tag = await tagModel.findOne(id)
// melakukan filter tag untuk mendapatkan data tag dengan ID yang sesuai,dan konfersi id dari string ke nomor
if(!tag){
// garding, jika array kosong maka
    return res.status(404).json({
    // kembalikan resposn status 404 ke penguna
        success:false,
        message:'tag not found'
        // cetak ke penguna
    })
}
    return res.json({
    // kembalikan jika penguna ditemukan, kirim respons json
        success: true,
        message: 'ok',
        // cetak ke penguna
        results:tag
        // kembalikan data tag yg di masukan dari pengguna dengan id
    })    
}


// exports.createtag = async (req, res) => {
//     try {
//         const tag = await tagModel.insert(req.body)
//         return res.json({
//             success: true,
//             message: 'create tag success',
//             results: tag
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
exports.createtag = async (req, res) => {
try {
    const tag = await tagModel.insert(req.body);
    return res.json({
        success: true,
        message: 'create tag success',
        results: tag
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



// exports.updatetag = (req,res)=>{
// // mendefininikan fungsi updatetag, parameter fungsi arrow untuk mewakili req dan res
//     const {id} = req.params
//     // mendapatkan id dari paramaeter yg di masukan tag
//     const {name} = req.body
//     // mendapatkan name dari body paramaeter yg di masukan tag
//     const tagId = tags.map(tag => tag.id).indexOf(parseInt(id))
//     //mengunakan metode map dan indexOf untuk mencari indeks pengguna dalam array tags berdasarkan id dan di conversi menjadi angka yang diberikan dari penguna
//     if(tagId === -1){
//     // apakah tagid bernilai -1
//         return res.status(404).json({
//         // kembalikan resposn status 404 ke penguna
//             success: false,
//             message: 'tag not found'
//             // cetak ke penguna
//         })
//     }
//         tags[tagId].name = name
//         // jika tagid ditemukan/sama dari parameter yg di masukan pengua
//         return res.json({
//         // kirim respons json ke penguna 
//             success : true,
//             message :'ok',
//             results :tags[tagId]
//             //tampilkan detail tag yg baru di perbaharui
//         })
 
// }

exports.updatetag = async (req, res) => {
try {
    const {id} = req.params
    const tag = await tagModel.update(req.body);
    if (tag) {
        return res.json({
            success: true,
            message: 'update tag success',
            results: tag
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


exports.deletetag = (req,res)=>{
//// mendefininikan fungsi deletetag, parameter fungsi arrow untuk mewakili req dan res
const {id} = req.params
// mendapatkan id dari paramaeter yg di masukan tag
const tag = tags.filter(tag =>tag.id === parseInt(id))
// menjalankan filter pada array tags untuk mendapatkan tag.id yang hanya berisi id pengguna,mengkonversi nilai id yg di terima dari parameter ke angka, lalu di bandingkan 
if(!tag.length){
// jika data tag dari pengguna tidak di temukan, mengunakan metode garding,melakukan negasi jika array nya kosong
        return res.status(404).json({
        //// kembalikan resposn status 404 ke penguna
        success: false,
        message : 'tag not found'
        // cetak ke penguna
    })
}
        tags = tags.filter(tag=>tag.id !==parseInt(id))
        // mengkonversi nilai id yg di terima dari parameter ke angka, lalu di bandingkan , menjalankan filter di array tags dan jika  menemuka id yg sama makan akan menghilangkan id tersebut
    return res.json({
    // kirim respons json ke penguna 
        success :true,
        message: 'hapus data tag'
        // cetak ke penguna
    })
}