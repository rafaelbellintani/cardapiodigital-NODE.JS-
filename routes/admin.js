const express = require('express');
const router = express.Router();
const path = require('path');

//PESQUISAR QUANTIDADE DE PRODUTOS CADASTRADOS
router.get('/sistema', (req, res) => {
    var SelectProduct = require("../modules/models/product");
    SelectProduct.find({}).lean().exec((err,products) => {
      res.render('mainadmin', {layout : 'admin',products:products});
    });
});

module.exports = router