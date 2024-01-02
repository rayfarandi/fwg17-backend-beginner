
exports.errorHandler = (error, res) => {
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
    }

    return res.status(500).json({                                                              
        success: false,
        messages: `Internal server error`                                                 
    })
}


// exports.errorHandler = (error, res) => {
//     console.log(error)
//     if(error.code === "23502"){                                                             // kode error not null constraint
//         return res.status(400).json({                                                              
//             success: false,
//             message: `${error.column} cannot be empty`                                                 
//         })
//     }else if(error.code === "23505"){                                                       // kode error unique constraint
//         return res.status(400).json({                                                              
//             success: false,
//             message:`${error.detail.split(' ')[1].replaceAll(/[()="]/g, ' ').trim()} already exist`                               
//         })
//     }else if(error.code === "42703"){                                                       // kode error column does not exist
//         return res.status(400).json({
//             success: false,
//             message: error.message.replaceAll('"', '')
//         })
//     }else if(error.code === "22P02"){                                                       // kode error salah input type data
//         return res.status(406).json({
//             success: false,
//             message: error.message.replaceAll('"', '')
//         })
//     }else if(error.code === "23503"){                                                      // kode error foreign key / keterkaitan table
//         return res.status(409).json({
//             success: false,
//             message: error.detail.replaceAll(/[()="]/g, ' ').replace('Key', 'data with')
//         })
//     }else if(error.message.includes("found")){                                         // pesan dan status error not found
//         return res.status(404).json({                                                              
//             success: false,
//             message: error.message                                                          // message error berasal dari error custom =>  throw new Error('message')                                               
//         })
//     }else if(error.message.includes("not registered") || error.message.includes("wrong password") || error.message.includes("invalid token")){             // error forbidden access = login dan otorisasi auth.middleware
//             return res.status(401).json({
//             success: false,
//             message: error.message
//             })
//     }else if(error.message === 'jwt must be provided'){
//         return res.status(403).json({
//             success: false,
//             message: error.message
//             })
//     }else if(!error.code){
//         return res.status(400).json({                                                              
//             success: false,
//             message: error.message                                                          // message error berasal dari error custom =>  throw new Error('message')                                               
//         })
//     }

//     return res.status(500).json({                                                              
//         success: false,
//         messages: `Internal server error`                                                 
//     })
// }