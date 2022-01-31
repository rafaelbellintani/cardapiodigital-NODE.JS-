const mongoose = require('mongoose');
const schema = mongoose.Schema({ 
    name: String,
    price: String,
    description: String,
    imageLocation: String,
    category: String,
});

var Product = mongoose.model('Product', schema)

module.exports = Product;