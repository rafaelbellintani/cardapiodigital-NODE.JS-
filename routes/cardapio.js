const express = require('express');
const router = express.Router();
const path = require('path');

//REQUISITAR PRODUTOS DO BANCO PARA O CARDAPIO
router.get('/', (req, res) => {
    var SelectProduct = require("../modules/models/product");
    var Categories = require("../modules/models/categories");
    SelectProduct.find({}).lean().exec((err,products) => {
      Categories.find({}).lean().exec((err,categories)=>{
      res.render('main',{layout: 'index',products:products,categories:categories})
      })
    });
});

module.exports = router