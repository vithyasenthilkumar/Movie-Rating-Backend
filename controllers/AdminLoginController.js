const AdminModel = require('../model/Adminmodel');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_TOKEN = 'bxhbdkfehchgwvehbcjndbcyfbcejnfvhbbugvdch';

const AddNewAdmin = async(request,response) => {
    try{
        const {AdminName,AdminEmail,Password} = request.body;
        const existingAdmin = await AdminModel.findOne({AdminEmail:AdminEmail});
        if(existingAdmin){
            return response.status(400).json({message:"Admin with this Email already exists"});
        }
    const encryptedPassword = await bcrypt.hash(request.body.Password,7);
    const admin = new AdminModel({
        AdminName:request.body.AdminName,
        AdminEmail:request.body.AdminEmail,
        Password: encryptedPassword
    });
    
        const newAdmin = await admin.save()
        response.status(200).json(newAdmin)
    }
    catch(error)
    {
        response.status(500).json({message:error.message})
    }
}

const AdminLogin = async(request,response) => {
  const {AdminEmail,Password} = request.body
  console.log(AdminEmail,Password)

  const validAdmin = await AdminModel.findOne({AdminEmail:AdminEmail})
  console.log(validAdmin)

  if(!validAdmin)
    {
        return response.status(404).json({message:"Invalid Email"})
    }
if(bcrypt.compare(Password,validAdmin.Password))
    {
      const AUTH_TOKEN = jwt.sign({AdminEmail: AdminLogin.AdminEmail},JWT_TOKEN)
      if(response.status(201))
        {
            return response.json({status: 'OK', token:AUTH_TOKEN})
        } 
    }
}

module.exports = {AdminLogin,AddNewAdmin}