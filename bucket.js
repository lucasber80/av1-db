class Bucket{
    constructor(){
        this.tamanhoMax = 2;
        this.listaIndice = [];
        this.overflow;
    }

    addIndice(idTuple,pageNumber){
        if(this.listaIndice.length == this.tamanhoMax){
            if(this.overflow == null){
                this.overflow = new Bucket();
            }
            this.overflow.addIndice(idTuple,pageNumber)
        }else{
            this.listaIndice.push({idTuple,pageNumber})
        }
        
    }
}

module.exports = Bucket;