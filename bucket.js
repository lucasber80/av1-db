class Bucket {
  constructor() {
    this.tamanhoMax = 2;
    this.listaIndice = [];
    this.overflow;
  }

  //adiciona uma uma linha no bucket, {id da tupla, pagina em que ela se encontra na tabela}
  //caso o numero de linhas tenham sido ultrapassada, ela cria outro bucket e coloca a referência dele na variavel overflow
  addIndice(idTuple, pageNumber) {
    if (this.listaIndice.length == this.tamanhoMax) {
      if (this.overflow == null) {
        this.overflow = new Bucket();
      }
      this.overflow.addIndice(idTuple, pageNumber);
    } else {
      this.listaIndice.push({ idTuple, pageNumber });
    }
  }
}

module.exports = Bucket;
