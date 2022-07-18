const express = require('express')
const router = express.Router()
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");
const nodemailer = require("nodemailer")

// --------------------로그인----------------------
router.post('/configEmail',async(req,res) =>{
    let authNum = Math.random().toString().substr(2,6);
    let transporter = nodemailer.createTransport({
        service:"gmail",
        host: 'smtp.gmail.com',
        port : 587,
        auth: {
            user: "sssaysssay@yonsei.ac.kr",
            pass: "chang525!"
        },
    });

    let mailOptions = {
        from: 'joonggo',
        to: req.body.email,
        subject: '회원가입을 위한 인증번호를 입력해주세요.',
        text: authNum
    };
    if(req.body.email.includes('ac.kr') || req.body.email.includes('edu')){
        transporter.sendMail(mailOptions, function (err, info) {
            if(err) return res.status(400).json({ success: false,err })
            console.log("Finish sending email : " + info.response);
            return res.status(200).json({
                success: true,
                number : authNum
            }),
            transporter.close()
        });
}
    else{
        res.status(200).json({success:false, message:'대학 이메일이 아닙니다'})
    }
});

router.post('/register',(req,res) => {
    const user = new User(req.body);
    user.save((err) => {
        if(err) return res.json({ success: false,err})
        return res.status(200).json({
            success: true
        })
    })
})

router.post('/login',(req,res) => {
    User.findOne({ email:req.body.email },(err,user) => {
        if(!user){
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }

        user.comparePassword(req.body.password,(err,isMatch) => {
            if(!isMatch)
                {return res.json({ loginSuccess:false,message: "비밀번호가 틀렸습니다."})}

            user.generateToken((err,user) => {
                if(err) return res.status(400).send(err);
                res.cookie("x_auth",user.token)
                .status(200)
                .json({loginSuccess:true,userId:user._id})
            })
        })
    })
})

router.get('/auth',auth,(req,res)=>{
    res.status(200).json({
        _id:req.user._id,
        isAdmin: req.user.role ===0 ? false:true, 
        isAuth:true,
        email: req.user.email,
        name:req.user.username,
        role:req.user.role,
        image:req.user.image
    })
})


router.get('/logout',auth,(req,res)=>{
    User.findOneAndUpdate({_id: req.user._id},
        {token:""}
        ,(err,user) => {
            if(err) return res.json({success:false,err});
            return res.status(200).send({
                success: true
            })
        })
})

module.exports = router;