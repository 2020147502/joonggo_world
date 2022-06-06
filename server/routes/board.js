const express = require('express')
const router = express.Router()
const { Board } = require("../models/Board");

// ----------------------게시판------------------------

// 상품 등록하기

router.post('/',(req,res) => {
    const post = new Board(req.body);
    post.save((err) => {
        if(err) return res.json({ success: false,err})
        return res.status(200).json({
            success: true
        })
    })
})

// 모든 상품들 가져오기
router.post('/index',(req,res) => {
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = req.body.limit ? parseInt(req.body.skip) : 0;

    Board.find()
            // .polulate('author')
            .sort({'product_id':-1})
            .skip(skip)
            .limit(limit)
            .exec(((err,productInfo) => {
                if(err) return res.status(400).json({success:false,err})
                return res.status(200).json({success:true,productInfo,postSize:productInfo.length})
            }))
}) 

//특정 조건에 맞는 상품들 가져오기
router.post('/products',(req,res) => {
    
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = req.body.limit ? parseInt(req.body.skip) : 0;
    let term = req.body.searchTerm;
    let product_type = req.body.product_type;
    
    if (term) {
        Board.find({"product_type":product_type})
            // .polulate('author')
            .sort({'product_id':-1})
            .skip(skip)
            .limit(limit)
            .exec(((err,productInfo) => {
                if(err) return res.status(400).json({success:false,err})
                return res.status(200).json({success:true,productInfo,postSize:productInfo.length})
            }))
    }
    else {
        Board.find({"product_type":product_type})
            // .polulate('author')
            .sort({'product_id':-1})
            .skip(skip)
            .limit(limit)
            .exec(((err,productInfo) => {
                if(err) return res.status(400).json({success:false,err})
                return res.status(200).json({success:true,productInfo,postSize:productInfo.length})
            }))
        }
})

// 상품 수정하기
router.post('/fix',(req,res) => {
    Board.findOneAndUpdate({"product_id":req.body.product_id},
        {$set: {'title' : req.body.title , 'body' : req.body.body}},
        { returnNewDocument: true }
    ).exec(((err) => {
        if(err) return res.status(400).json({success:false,err})
        return res.status(200).json({success:true})
    }))
})

// 상품 삭제하기
router.post('/delete',(req,res) =>{
    Board.findOneAndDelete({"product_id":req.body.product_id})
    .exec(((err) => {
    if(err) return res.status(400).json({success:false,err})
    return res.status(200).json({success:true})
}))
})

module.exports = router;