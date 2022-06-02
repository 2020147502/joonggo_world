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
app.use('/api/board', require('./routes/product'));



app.listen(port, () => console.log(`Example app listening on port${port}!`))