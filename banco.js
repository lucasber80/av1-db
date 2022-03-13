const Funcoes = require("./funcoes")

class banco{
  constructor(quantTuplasPerPage){
  const funcoes = new Funcoes()
  
    this.table = funcoes.popularTable(quantTuplasPerPage);

    this.buckets = funcoes.popularBuckets(this.table.totalTuplas(),this.table.pages);
    
  }
  
}


  module.exports = banco;