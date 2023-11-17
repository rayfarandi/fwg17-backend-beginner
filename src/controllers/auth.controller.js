exports.login = (req,res)=>{
// mendefinisikan fungsi login,dengan parameter fungsi arrow untuk mewakili req dan res
    console.log(req.body)
    //cetak req dari body yg dikirimkan penguna
    const {username,password} =req.body
    //mendefinisikan username dan password yg di terima dari penguna dengan postman
    if(username === "admin@mail.com" && password === "1234"){
    //pengecekan apakah username dan password sesuai
        return res.json ({
        //jika sesuai makan kirim respon json 
            succces : true,
            message: 'login succes'
            // cetak ke penguna
        })
    }else {
    //jika salah
        return res.json({
        //jika makan kirim respon json 
            succces: false,
            message: 'wrong username or password'
            //cetak ke pengguna
        })
    }
}