const mongoose = require('mongoose');
const schema = mongoose.Schema({ 
    name: String
});

var Categories = mongoose.model('Categories', schema)

module.exports = Categories;