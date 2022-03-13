const fs = require('fs')

module.exports = function(){
  var dados = [];
  const data = fs.readFileSync('./documento.txt', 'utf8');
  dados = data.split("\n");
  return dados;
};
