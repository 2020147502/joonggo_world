const express = require('express');
const app = express();
const port = process.env.PORT || 5000
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');

app.use(bodyParser.urlencoded({ extended: true}));

app.use(bodyParser.json());
app.use(cookieParser())
const mongoose = require('mongoose');
const { type } = require('express/lib/response');
const res = require('express/lib/response');
mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology:true,
}).then(() => {
    console.log('mongo db connected...')}).catch((err) => {
        console.log(err)})

app.use('/api/users', require('./routes/users'));
app.use('/api/board', require('./routes/board'));



<<<<<<< HEAD
            user.generateToken((err,user) => {
                if(err) return res.status(400).send(err);
                res.cookie("x_auth",user.token)
                .status(200)
                .json({loginSuccess:true,userId:user._id})
            })
        })
    })
})

app.get('/api/users/auth',auth,(req,res)=>{
    res.status(200).json({
        _id:req.user._id,
        isAdmin: req.user.role ===0 ? false:true, 
        isAuth:true,
        email: req.user.email,
        username:req.user.username,
        role:req.user.role,
        image:req.user.image
    })
})

app.get('/api/users/logout',auth,(req,res)=>{
    User.findOneAndUpdate({_id: req.user._id},
        {token:""}
        ,(err,user) => {
            if(err) return res.json({success:false,err});
            return res.status(200).send({
                success: true
            })
        })
})
=======
>>>>>>> da03a365e99a99cb141e9d14392c5bda72eeaacb
app.listen(port, () => console.log(`Example app listening on port${port}!`))