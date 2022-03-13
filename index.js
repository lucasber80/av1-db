const express = require('express')
const app = express()
const port = 8081
const Banco = require("./banco.js")

app.get('/', (req,  res) => {
  const banco = new Banco(10)
  
  res.send({data:banco.buckets[0]})
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

String.prototype.hashCode = function(){
  var hash = 0;
  for (var i = 0; i < this.length; i++) {
      var character = this.charCodeAt(i);
      hash = ((hash<<5)-hash)+character;
      hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}





