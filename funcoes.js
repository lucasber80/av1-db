const Table = require("./table.js")
const Page = require("./page.js")
const Bucket = require("./bucket")
const dados = require("./leitura.js")

class funcoes{
    popularTable(quantTuplas){
    var cont = 1;
    var cont2 = 0;
    var id = 0;
    let table = new Table()
    let page = new Page()

  dados().forEach(element => {
    if(cont > quantTuplas){
      table.addPage(page);
      page = new Page();
      page.addTuple(id,element)
      cont = 1;
      id++;
    }else{
      page.addTuple(id,element)
      id++;
      
    }
    cont++;
    cont2++;
  });
  
  table.addPage(page);
  return table;
}

popularBuckets(totalTuplas,pages){
    
    const buckets = [];
    for(var i = 0; i < totalTuplas/new Bucket().tamanhoMax;i++){
        buckets[i] = new Bucket()
    }
    for(var i = 0; i < pages.length;i++){
        
        for(var j = 0;j < pages[i].tuples.length;j++){
            const pos = this.createHash(pages[i].tuples[j].id);           
            if(pos >= buckets.length){
                buckets[buckets.length-1].addIndice(pages[i].tuples[j].id,i)
            }else{
                buckets[pos].addIndice(pages[i].tuples[j].id,i)
            }
        
        }
    }

    return buckets;
}

createHash(id){
    return Math.round(id%3);
}

}

module.exports = funcoes;