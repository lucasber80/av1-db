const Tuple = require("./tuple.js")

class Page{
    constructor(){
        this.tuples = [];
      
    }

    addTuple(key,data){
        this.tuples.push(new Tuple(key,data))
    }
}

module.exports = Page