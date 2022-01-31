const express = require('express')
const bodyParser = require('body-parser');
const handlebars  = require('express-handlebars');
const mongoose  = require('mongoose');
const app = express()
const port = 37123

require("./modules/database");
const produtosRoutes = require('./routes/produtos');
const cardapioRoutes = require('./routes/cardapio');
const categoriaRoutes = require('./routes/categoria');
const adminRoutes = require('./routes/admin');

app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.engine('handlebars', handlebars.engine({
  helpers: {
  //Helper para soma
    getTotal: function(data){
      let counter = 0;
      while(data[counter] != undefined){
        counter++;
      }
      return counter;   
  },
  //Helper para comparação
  'when': (operand_1, operator, operand_2, options) => {
    let operators = {                     
      'eq': (l,r) => l == r,              
      'noteq': (l,r) => l != r,
      'gt': (l,r) => (+l) > (+r),                       
      'gteq': (l,r) => ((+l) > (+r)) || (l == r),        
      'lt': (l,r) => (+l) < (+r),                        
      'lteq': (l,r) => ((+l) < (+r)) || (l == r),        
      'or': (l,r) => l || r,                             
      'and': (l,r) => l && r,                            
      '%': (l,r) => (l % r) === 0                        
    }
    let result = operators[operator](operand_1,operand_2);
    if(result) return options.fn(this); 
    return options.inverse(this);       
  }
}
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//ROUTES
app.use(produtosRoutes);
app.use(cardapioRoutes);
app.use(categoriaRoutes);
app.use(adminRoutes);

//LIGAR O EXPRESS.JS
app.listen(port, () => {
  console.log(`Cardápio digital ligado na porta ${port}`);
})

//DESLIGAR CONEXAO DO MONGODB ANTES DE SAIR DA APLICAÇÃO
var cleanup = require('./modules/cleanup').Cleanup(myCleanup);
function myCleanup() {
};

// Prevents the program from closing instantly
process.stdin.resume();

// Emits an uncaught exception when called because module does not exist
function error() {
  console.log('error');
  var x = require('');
};
