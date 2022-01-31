console.log("\nVerificando a conexão com o banco de dados...\n");
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/cdigital").then(()=>{
    console.log("\nConexão com o banco de dados realizada com sucesso!\n");
}).catch((err)=>{
    console.log(`\nNão foi possível conectar ao banco de dados!${err}\n`);
});

module.exports = { };