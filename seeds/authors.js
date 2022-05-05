require('dotenv').config()

const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const BooksModel = require('../models/authors.js')
const dbUrl= process.env.DB_URL;

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

// AUTHOR

const Authors = function (email, firstName, lastName) {
    this.email = email,
        this.firstName = firstName,
        this.lastName = lastName
}

function getData(file) {
    return new Promise((resolve, reject) => {
        const resultsAuthor = [];

        fs.createReadStream(file)
            .pipe(csv({}))
            .on('error', err => reject(err))
            .on('data', data => resultsAuthor.push(data))
            .on('end', () => {
                let obj1 = {};
                const arrObj = [];

                resultsAuthor.forEach((data) => {
                    let string1 = JSON.stringify(Object.values(data));
                    string1 = string1.slice(2);
                    string1 = string1.slice(0, -2);

                    //email
                    let email = string1.split(';')[0].split('","');
                    //firstName
                    let firstName = string1.split(';')[1].split('","');
                    //lastName
                    let lastName = string1.split(';')[2].split('","');

                    obj1 = new Authors(email, firstName, lastName);
                    arrObj.push(obj1);
                })
                resolve(arrObj);
            })
    })
}

const seedBooksDB = async () => {
    try {
        await BooksModel.deleteMany({})
        const data = await getData('../resources/authors.csv');
        for (let index = 0; index < data.length; index++) {
            const c = new BooksModel({
                email: data[index].email,
                firstName: data[index].firstName,
                lastName: data[index].lastName
            })
            await c.save();
        }
    } catch (err) {
        console.log('Error Found!!!!!!!!')
        console.log(err)
    }
}

seedBooksDB()





