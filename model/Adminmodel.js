const mongoose = require('mongoose')
const Admindata = require('../data/Admindata')

const passwordValidator = (Password)=>{
    const passwordpattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    return passwordpattern.test(Password)
}

const AdminSchema = new mongoose.Schema(
    {
        AdminName:{
            type:String,
            required:true
        },
        AdminEmail:{
            type:String,
            required:true,
            unique:true,
        },
        Password:{
            type:String,
            required:true,
            validate:{
            validator:passwordValidator
        }
        }
    },
    {
        collection:'Admin'
    }
)
 
module.exports = mongoose.model('Admin',AdminSchema)