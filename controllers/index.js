const Books = require('../models/books');
const Magazines = require('../models/magazines');
const Authors = require('../models/authors');
const csvwriter = require('csv-writer');
const fs = require('fs');
var createCsvWriter = csvwriter.createObjectCsvWriter

let results = [];

const csvWriter = createCsvWriter({

    path: './bookplusmagazine_data.csv',
    header: [

        { id: 'title', title: 'Title' },
        { id: 'isbn', title: 'ISBN' },
        { id: 'authors', title: 'Author' },
        { id: 'description', title: 'Description' },
        { id: 'publishedAt', title: 'Published At' },
    ]
});

module.exports.index = async (req, res) => {
    const category = false;
    const books = await Books.find({}).collation({ locale: "en" }).sort({ title: 1 });
    const magazines = await Magazines.find({}).sort({ title: 1 });
    const authors = await Authors.find({});
    res.render('index', { books, magazines, authors, category });
}

module.exports.searchDataCategory = async (req, res) => {
    res.render('searchDataCategory')
}

module.exports.searchDataForm = (req, res) => {
    const { category } = req.query;
    if (category === "books" || category === "magazines" || category === "authors") {
        res.render('searchDataForm', { category })
    } else {
        res.send("UHH OH.... INVALID")
    }
}

module.exports.filteredResult = async (req, res) => {
    const { category } = req.query
    const { title, isbn, publishedAt, author, firstName, lastName } = req.body;
    let regTitle, regAuthor, regisbn, regPublishedAt, regFirstName, regLastName;

    if (title) regTitle = { $regex: new RegExp(title, 'i') }
    else regTitle = title

    if (isbn) regisbn = { $regex: new RegExp(isbn, 'i') }
    else regisbn = isbn

    if (publishedAt) regPublishedAt = { $regex: new RegExp(publishedAt) }
    else regPublishedAt = publishedAt

    if (author) regAuthor = { $regex: new RegExp(author, 'i') }
    else regAuthor = author

    if (firstName) regFirstName = new RegExp(firstName, "i")
    else regFirstName = firstName

    if (lastName) regLastName = new RegExp(lastName, "i")
    else regLastName = lastName

    const books = await Books.find({
        $or: [
            { title: regTitle }, { isbn: regisbn }, { authors: regAuthor }]
    }).collation({ locale: "en" }).sort({ title: 1 })
    const magazines = await Magazines.find({
        $or: [
            { title: regTitle }, { isbn: regisbn }, { authors: regAuthor }, { publishedAt: regPublishedAt }]
    }).collation({ locale: "en" }).sort({ title: 1 })
    const authors = await Authors.find({
        $or: [
            { email: regAuthor }, { firstName: regFirstName }, { lastName: regLastName }]
    });

    results = [
        ...books,
        ...magazines
    ]

    res.render('index.ejs', { books, magazines, authors, category })
}


module.exports.exportCSV = async (req, res) => {
    try {

        await csvWriter
            .writeRecords(results)
            .then(() => console.log('Data uploaded into csv successfully'))
            .catch(err => console.log("Error Found", err))
        return res.download('./bookplusmagazine_data.csv', () => {
            fs.unlinkSync('./bookplusmagazine_data.csv');
        })
    } catch (err) {
        res.send("ERROR FOUND !!!!!!!", err)
    }
}