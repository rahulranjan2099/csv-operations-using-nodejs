const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthorSchema = new Schema ({
    email: [{
        type:String,
        required: true
    }],
    firstName:[
        {
            type:String,
            required: true
        }
    ],
    lastName:[
        {
            type:String,
            required: true
        }
    ]

});

module.exports = mongoose.model('Author',AuthorSchema);