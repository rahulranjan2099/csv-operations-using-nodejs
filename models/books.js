const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BooksSchema = new Schema ({
    title: [{
        type:String,
        required: true
    }],
    isbn:[
        {
            type:String,
            required: true
        }
    ],
    authors:[
        {
            type:String,
            required: true
        }
    ],
    description:[
        {
            type:String,
            required: true
        }
    ]


})

module.exports = mongoose.model('Books',BooksSchema);