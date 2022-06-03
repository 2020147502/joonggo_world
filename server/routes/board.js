const express = require('express')
const router = express.Router()
const { Board } = require("../models/Board");
// ----------------------게시판------------------------

router.post('/',(req,res) => {
    const post = new Board(req.body);
    post.save((err) => {
        if(err) return res.json({ success: false,err})
        return res.status(200).json({
            success: true
        })
    })
})




module.exports = router;