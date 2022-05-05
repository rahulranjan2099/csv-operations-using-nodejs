require('dotenv').config()

const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const BooksModel = require('../models/books')

const dbUrl = process.env.DB_URL;
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    // useCreateIndex:true, 
    useUnifiedTopology: true
    // useFindAndModify:false
})
    .then(() => {
        console.log('Mongoose connection done!!')
    })
    .catch((err) => {
        console.log('ughhh Mongoose connection failed')
        console.log(err)
    })

// BOOKS
const Books = function (title, isbn, authors, description) {
    this.title = title,
        this.isbn = isbn,
        this.authors = authors,
        this.description = description
}


function getData(file, type) {
    return new Promise((resolve, reject) => {
        let resultsBooks = [];
        let obj1 = {};
        const arrObj = [];
        fs.createReadStream(file)
            .pipe(csv({}))
            .on('error',err=>{reject(err)})
            .on('data', data => resultsBooks.push(data))
            .on('end', () => {

                resultsBooks.forEach((data, index) => {
                    let string1 = JSON.stringify(Object.values(data));
                    string1 = string1.slice(2);
                    string1 = string1.slice(0, -2);

                    //title
                    let title = string1.split(';')[0].split('","');
                    //isbn
                    let isbn = string1.split(';')[1].split('","');
                    //authors
                    let authors = string1.split(';')[2].split('","');
                    //description
                    let descriptions = string1.split(';')[3].replace(/","/g, ',');

                    obj1 = new Books(title, isbn, authors, descriptions);
                    arrObj.push(obj1);
                })
                resolve(arrObj);
            });
    })
}

const seedBooksDB = async () => {
    try{
        await BooksModel.deleteMany({})
        const data = await getData("../resources/books.csv", {});
        for(let index=0;index<data.length;index++){
            const c = new BooksModel({
                title:data[index].title,
                isbn:data[index].isbn,
                authors:data[index].authors,
                description:data[index].description,
            })
            await c.save();
        }
    }catch(err){
        console.log('Error Found!!!!!!!!')
        console.log(err)
    }
}

seedBooksDB()