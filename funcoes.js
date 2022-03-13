const Table = require("./table.js");
const Page = require("./page.js");
const Bucket = require("./bucket");
const dados = require("./leitura.js");

class funcoes {
  //retorna uma tabela com todas as paginas e tuplas criadas, N paginas = numero de tuplas/ numero de tuplas por pagina
  popularTable(quantTuplas) {
    var cont = 1;
    var cont2 = 0;
    var id = 0;
    let table = new Table();
    let page = new Page();

    dados().forEach((element) => {
      if (cont > quantTuplas) {
        table.addPage(page);
        page = new Page();
        page.addTuple(id, element);
        cont = 1;
        id++;
      } else {
        page.addTuple(id, element);
        id++;
      }
      cont++;
      cont2++;
    });

    table.addPage(page);
    return table;
  }

  //cria todos os buckets sendo N buckets = numero de tuplas / total de linhas por bucket
  //popula todos os buckets com as linhas, usando a função createHash() para identificar com bucket cada linha pertence
  popularBuckets(totalTuplas, pages) {
    const buckets = [];
    for (var i = 0; i < totalTuplas / new Bucket().tamanhoMax; i++) {
      buckets[i] = new Bucket();
    }
    for (var i = 0; i < pages.length; i++) {
      for (var j = 0; j < pages[i].tuples.length; j++) {
        const pos = this.createHash(pages[i].tuples[j].id);
        if (pos >= buckets.length) {
          buckets[buckets.length - 1].addIndice(pages[i].tuples[j].id, i);
        } else {
          buckets[pos].addIndice(pages[i].tuples[j].id, i);
        }
      }
    }

    return buckets;
  }

  /*
recebe todos os buckets do banco e o id da linha na qual deseja encontrar, 
depois calcula em qual bucket o item se encontra usando a função createHash, com o bucket encontrado,
ele procura entre todas as linhas do bucket
*/
  //caso o item não esteja em nenhuma linha do bucket, ele faz uma iteração para pegar toda a cadeia de overflow referenciada no bucket, lendo todos os dados delas até achar o item procurado
  returnBucketItem(id, buckets) {
    var pos;
    var tupla;
    var overflow;
    if (this.createHash(id) >= buckets.length) {
      pos = buckets.length - 1;
    } else {
      pos = this.createHash(id);
    }

    for (var i = 0; i < buckets[pos].listaIndice.length; i++) {
      var linhaAtual = buckets[pos].listaIndice[i];
      if (linhaAtual.idTuple == id) {
        tupla = linhaAtual;
        return tupla;
      }
    }

    if (buckets[pos].overflow != null) {
      overflow = buckets[pos].overflow;

      while (overflow != null) {
        for (var i = 0; i < overflow.listaIndice.length; i++) {
          var linhaAtual = overflow.listaIndice[i];
          if (linhaAtual.idTuple == id) {
            tupla = linhaAtual;
            return tupla;
          }
        }
        overflow = overflow.overflow;
      }
    }

    return tupla;
  }

  returnTableItem(id, banco) {
    var linha = this.returnBucketItem(id, banco.buckets);

    var tuples = banco.table.pages[linha.pageNumber].tuples;
    for (var i = 0; i < tuples.length; i++) {
      if (tuples[i].id == id) {
        return tuples[i];
      }
    }
  }

  createHash(id) {
    return Math.round(id % 3);
  }
}

module.exports = funcoes;
