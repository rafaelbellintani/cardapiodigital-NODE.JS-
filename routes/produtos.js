const express = require('express');
const router = express.Router();
const path = require('path');

//REQUISITAR PRODUTOS
router.get('/sistema/produtos', (req,res) => {
    var SelectProduct = require("../modules/models/product");
    var Categories = require("../modules/models/categories");
    SelectProduct.find({}).lean().exec((err,products) => {
      Categories.find({}).lean().exec((err,categories)=>{
        res.render('products',{layout: 'admin',products:products,categories:categories})
      })
    });
  });
  
//ADICIONAR PRODUTOS  
router.post('/sistema/produtos', function(req,res){
      var Product = require("../modules/models/product");
      var nameProduct = req.body.name;
      var priceProduct = req.body.price;
      var descriptionProduct = req.body.description;
      var categoryProduct = req.body.category;
  
      new Product({
         name: nameProduct,
         price: priceProduct,
         description: descriptionProduct,
         category: categoryProduct,
        }).save().then(() => {
            console.log("\nProduto salvo com sucesso!\n");
            res.redirect('/sistema/produtos');
        }).catch((err)=>{
            console.log(`\nNão foi possível cadastrar o produto \"${nameProduct}\"!\n${err}`);
        });
  });
  
//REMOVER PRODUTOS
router.post('/sistema/removerproduto', function(req,res){
    var Product = require("../modules/models/product");
    var idProduct = req.body.idProduto;
    Product.find({_id:idProduct}).deleteOne(()=>{
      console.log("Produto removido com sucesso!");
      res.redirect("/sistema/produtos");
    }).catch((err)=>{
      console.log(`Não foi possível remover o produto\n${err}`);
    });
  });

//EDITAR PRODUTOS
router.post('/sistema/editar', function(req,res){
    var Product = require("../modules/models/product");
    var nameProduct = req.body.nameModal;
    var priceProduct = req.body.priceModal;
    var descriptionProduct = req.body.descriptionModal;
    var categoryProduct = req.body.categoryModal;
    var id = req.body.idModal;

    const filter = { _id: id };
    const update = { name: nameProduct, price: priceProduct, description: descriptionProduct, category: categoryProduct};

    Product.findOneAndUpdate(filter, update).then(()=>{
        console.log("Produto editado com sucesso!");
    });
    res.redirect('/sistema/produtos');
});

module.exports = router