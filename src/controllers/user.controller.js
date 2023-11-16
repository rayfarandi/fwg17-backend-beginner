exports.getAllUsers = (req,res)=>{
    return res.json({
        succces: true,
        maessage : 'List all users',
        results : [
            {
             id: 1,
             name: 'ran'   
            },
            {
                id: 2,
                name: 'randi'
            }
        ]
    })
}

exports.getAllUsersID = (req,res)=>{
    const userId = req.params.id;
    
    return res.json({
        id: userId,
        maessage : `dengan id ${userId} berhasil`
    })
}

exports.createUsers = (req,res)=>{
        return res.json({
        success: true,
        message: 'User created successfully',

    });
}

exports.updateUsers = (req,res)=>{
    const {id,username} =req.body
    if(username === "user" && id === "1"){
        return res.json ({
            succces : true,
            message: 'update data berhasil'
        })
    }else {
        return res.json({
            succces: false,
            message: 'update data tidak berhasil'
        })
    }
}

exports.deleteUsers = (req,res)=>{
    return res.json({
        success :true,
        message: 'hapus data user'
    })
}