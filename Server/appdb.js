const express=require('express')
const app=express()
const bodyparser=require('body-parser')
const mongoose=require('mongoose')
const bcrypt =require('bcrypt')
const cors = require('cors');

require('./User')
require('./Employee')

app.use(cors());
app.use(bodyparser.json())
const User = mongoose.model("users")
const Employee = mongoose.model("employees")
const mongoKey = process.env.MONGODB_URI || "mongodb+srv://Naorhl:213221393@cluster0.how8n.mongodb.net/manage?retryWrites=true&w=majority";

mongoose.connect(mongoKey,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
mongoose.connection.on("connected",()=>{
    console.log("Connected to mongo")
})
mongoose.connection.off("error",(err)=>{
    console.log("Failed to mongo",err)
})
app.get('/employees',async(req,res)=>{
    try{
    await Employee.find({}).then(data=>{
        res.send(data)
    })
}catch{
    res.send('Load failed try loading again')
}
})
app.get('/users',(req,res)=>{
    User.find({}).then(data=>{
        res.send(data)
    })
})

app.post('/signup',async (req,res)=>{
    try{
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password,salt)
        console.log(salt)
        console.log(hashedPassword)
        const user=new User({
            fname:req.body.fname,
            lname:req.body.lname,
            email:req.body.email,
            password:hashedPassword
        })
        user.save()
        .then(data=>{
            console.log(data)
            res.send(data)
        }).catch(err=>{
            console.log(err)
        })
    }catch{
        res.status(500).send()
    }
})
app.post('/signin',async (req,res)=>{
    const user = await User.findOne({'email':req.body.email});
    if(user==null){
        return res.status(400).send('Cannot find user')
    }
    try{
        if(await bcrypt.compare(req.body.password,user.password)) {
            res.send('Success')
        }else{
            res.send('Not Allowed')
        }
    }catch{
        res.status(500).send()
    }
})
app.post('/addemployee',(req,res)=>{
    const employee=new Employee({
        fname:req.body.fname,
        lname:req.body.lname,
        phone:req.body.phone,
        address:req.body.address,
        roll:req.body.roll
    })
    employee.save()
    .then(data=>{
        console.log(data)
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
})
app.post('/deleteemployee',(req,res)=>{
    Employee.findByIdAndRemove(req.body.id)
    .then(data=>{
        console.log(data)
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
})
app.post('/update',(req,res)=>{
    Employee.findByIdAndUpdate(req.body.id,{$set:{
        fname:req.body.fname,
        lname:req.body.lname,
        phone:req.body.phone,
        address:req.body.address,
        roll:req.body.roll
    }},{new:true})
    .then(data=>{
        console.log(data)
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
})
app.listen(process.env.PORT || 5000,()=>{
    console.log('Server Running')
})
