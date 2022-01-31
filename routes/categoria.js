const express = require('express');
const router = express.Router();
const path = require('path');

//ADICIONAR CATEGORIA
router.post('/sistema/produtos/novacategoria', function(req,res){
    var Categories = require("../modules/models/categories");
    var categoryName = req.body.category;
  
    new Categories({
      name: categoryName,
     }).save().then(() => {
         console.log("\nCategoria salva com sucesso!\n");
         res.redirect('/sistema/produtos');
     }).catch((err)=>{
         console.log(`\nNão foi possível cadastrar a categoria \"${nameProduct}\"!\n${err}`);
     });
});

//DELETAR CATEGORIA
router.post('/sistema/deletarcategoria', function(req,res){
    var Categories = require("../modules/models/categories");
    var Id = req.body.categoryDelete;
  
    Categories.find({_id:Id}).deleteOne(()=>{
        console.log("Categoria removida com sucesso!");
        res.redirect("/sistema/produtos");
      }).catch((err)=>{
        console.log(`Não foi possível remover a categoria\n${err}`);
      });
});

module.exports = router