const express = require('express')
const router = express.Router()
const { Board } = require("../models/Board");
const multer = require('multer')
const viewObj = new Object() 
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
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;

    Board.find()
            .polulate('author')
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
    let price =  req.body.price

    let findArgs = {product_type:product_type};
    findArgs["price"] = {
        //Greater than equal
        $gte: price[0],
        //Less than equal
        $lte: price[1],
      };
    if (term) {
        Board.find(findArgs)
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
        Board.find(findArgs)
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
        {$set: {'title' : req.body.title , 'body' : req.body.body,'product_type' : req.body.type}},
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

// id로 상품정보 불러오기
router.get("/products_by_id", (req, res) => {
    let productIds = req.query.id;
    console.log(req.params)
    // if (!viewObj[req.params.post_id]) {
    //     viewObj[req.params.post_id] = []
    //   }
      
    //   if (viewObj[req.params.post_id].indexOf(req.user.username) == -1) {
      
    //     //username이 없다면 배열에 추가하고 조회수 증가
    //     viewObj[req.params.post_id].push(req.user.username)
    //     post.view++
      
    //     //10분이 지나면 배열에서 삭제
    //     setTimeout(() => {
    //       viewObj[req.params.post_id].splice(
    //       viewObj[req.params.post_id].indexOf(req.user.username), 1)
    //       }, 600000)
      
    //       for (let i in viewObj) {
    //         //공간 절약을 위해 username이 하나도 없으면 해당 오브젝트 삭제
    //         if (i.length == 0) {
    //           delete viewObj.i
    //         }
    //       }  
    //   }
    Board.findById(productIds)
       .populate("author")
      .exec((err, product) => {
        if (err) return res.status(400).send(err);
        console.log(product.views++)
        product.save()
        return res.status(200).send(product);
      });
  });

//이미지 등록
var storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null, 'uploads/')
    },
    filename: function ( req,file,cb){
        cb(null,file.fieldname + '-' + Date.now())
    }
})

var upload = multer({storage : storage}).single("file")

router.post('/image', (req,res) => {
    upload(req,res,err => {
        upload(req,res,err => {
            if (err) {
                return req,json({ success: false,err})
            }
            return res.json({sucess:true, filePath : res.req.file.path, fileName: res.req.file.filename})
        })
    })
})
module.exports = router;