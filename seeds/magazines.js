require('dotenv').config()

const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const BooksModel = require('../models/magazines.js')

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

// MAGAZINES
const Magazines = function (title, isbn, authors, publishedAt) {
    this.title = title,
        this.isbn = isbn,
        this.authors = authors,
        this.publishedAt = publishedAt
}

function getData(file, type) {
    return new Promise((resolve, reject) => {

        let resultsMagazines = [];
        let obj1 = {};
        const arrObj = [];

        fs.createReadStream(file)
            .pipe(csv({}))
            .on('error', err => reject(err))
            .on('data', data => resultsMagazines.push(data))
            .on('end', () => {

                resultsMagazines.forEach((data) => {
                    let string1 = JSON.stringify(Object.values(data));
                    string1 = string1.slice(2);
                    string1 = string1.slice(0, -2);

                    //title
                    let title = string1.split(';')[0].split('","');
                    //isbn
                    let isbn = string1.split(';')[1].split('","');
                    //authors
                    let authors = string1.split(';')[2].split('","');
                    //publishedAt
                    let publishedAt = string1.split(';')[3].split('","');

                    obj1 = new Magazines(title, isbn, authors, publishedAt);
                    arrObj.push(obj1);
                })
                resolve(arrObj);
            })
    })
}

const seedBooksDB = async () => {
    try {
        await BooksModel.deleteMany({})
        const data = await getData("../resources/magazines.csv");
        for (let index = 0; index < data.length; index++) {
            const c = new BooksModel({
                title: data[index].title,
                isbn: data[index].isbn,
                authors: data[index].authors,
                publishedAt: data[index].publishedAt,
            })
            await c.save();
        }
    } catch (err) {
        console.log('Error Found!!!!!!!!')
        console.log(err)
    }
}

seedBooksDB()

