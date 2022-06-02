const mongoose = require('mongoose');

const BoardSchema = mongoose.Schema({
    title:{
        type: String,
        minlength: 2,
        required : true
    },
    body:{
        type: String,
        required : true
    },
    type:{
        type:String,
        required : true
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    views: {
        type: Number,
        default : 0
    },
    numId:{
        type: Number,
        required : true
    },
    images:{
        type:Array,
        default:[]
    },
    createdDate:{
        type:Date,
        default:Date.now
    },
    updatedDate:{
        type:Date
    }
})

BoardSchema.methods.getCreatedDate = function () {
    var date = this.createdAt;
    return date.getFullYear() + "-" + get2digits(date.getMonth()+1)+ "-" + get2digits(date.getDate());
};

BoardSchema.methods.getCreatedTime = function () {
    var date = this.createdAt;
    return get2digits(date.getHours()) + ":" + get2digits(date.getMinutes())+ ":" + get2digits(date.getSeconds());
};
function get2digits(num){
    return ("0" + num).slice(-2); 
}

const Board = mongoose.model('Board', BoardSchema)

module.exports = { Board }