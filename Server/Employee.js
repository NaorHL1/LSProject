const mongoose =require('mongoose')

const EmployeeSchema=new mongoose.Schema({
    fname:{
        type:String,
        required:true,
    },
    lname:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    roll:{
        type:String,
        required:true,
    },
    datejoined:{
        type:Date,
        required:true,
        default:Date.now
        }
})
mongoose.model("employees",EmployeeSchema)