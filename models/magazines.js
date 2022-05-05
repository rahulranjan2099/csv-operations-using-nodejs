const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MagazinesSchema = new Schema ({
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
    publishedAt:[
        {
            type:String,
            required: true
        }
    ]


})

module.exports = mongoose.model('Magazines',MagazinesSchema);