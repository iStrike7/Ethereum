const express = require('express');
const app = express();
const fs = require("fs");
const multisig = require("./run.js");

app.get('/newMultiSig', function (req, res) {
	multisig.run().then((result)=>{res.send(JSON.stringify(result))});
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
