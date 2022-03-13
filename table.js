class Table {
  constructor() {
    this.pages = [];
  }

  addPage(page) {
    this.pages.push(page);
  }

  totalTuplas() {
    var cont = 0;
    this.pages.forEach((element) => {
      cont += element.tuples.length;
    });
    return cont;
  }
}

module.exports = Table;
