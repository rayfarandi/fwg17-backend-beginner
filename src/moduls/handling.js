
const errorHandler = (error, res) => {
    console.log(error)
    if(error.code === "23502"){                                                             
        return res.status(400).json({                                                              
            success: false,
            message: `${error.column} cannot be empty`                                                 
        })
    }else if(error.code === "23505"){                                                      
        return res.status(400).json({                                                              
            success: false,
            message:`${error.detail.split(' ')[1].replaceAll(/[()="]/g, ' ').trim()} already exist`                               
        })
    }else if(error.message.includes("found")){                                         
        return res.status(404).json({                                                              
            success: false,
            message: error.message                                                          
        })
    }else if(error.message.includes("not registered") || error.message.includes("wrong password") || error.message.includes("invalid token")){             
            return res.status(401).json({
            success: false,
            message: error.message
            })
    }else if(!error.code){
        return res.status(400).json({                                                              
            success: false,
            message: error.message                                                                               
        })
    }else if(error.message === 'File too large'){
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }else if(error.message === 'extention_issu'){
        return res.status(400).json({
            success: false,
            message: 'file extention not supported'
        }) 
    }

    else{
        return res.status(500).json({              
            success: false,
            messages: `Internal server error`                                                 
        })
    }                                                
}
module.exports = errorHandler
