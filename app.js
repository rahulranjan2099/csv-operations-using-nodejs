require('dotenv').config()

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dataRoute = require('./routes/data.js') 

const dbUrl= process.env.DB_URL;
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
console.log('Mongoose connection done!!')
})
.catch((err)=>{
    console.log('ughhh Mongoose connection failed')
    console.log(err)
})


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static('public'))
app.use(bodyParser.json());
app.use('/',dataRoute);

app.get('/',(req,res)=>{
    res.redirect('/')
})

app.listen(3000,()=>{
    console.log("PORT STARTING AT 3000")
})