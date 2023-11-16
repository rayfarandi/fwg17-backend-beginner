exports.login = (req,res)=>{
    console.log(req.body)
    const {username,password} =req.body
    if(username === "admin@mail.com" && password === "1234"){
        return res.json ({
            succces : true,
            message: 'login succes'
        })
    }else {
        return res.json({
            succces: false,
            message: 'wrong username or password'
        })
    }
}