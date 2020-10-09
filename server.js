const express = require('express');
const fs = require("fs");
const multisig = require("./multisig.js");
const send_ether = require("./send_ether.js");
const get_balance = require("./get_balance.js");
const bodyParser = require('body-parser');
const Web3 = require('web3');

(async()=>{
if (typeof web3 !== 'undefined') {
         web3 = await new Web3(web3.currentProvider);
     } else {
         // set the provider you want from Web3.providers
         web3 = await new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
     }

const app = express();
const jsonParser = bodyParser.json({strict: false});

app.post('/MultiSig/create', jsonParser, function (req, res) {
	// console.log(req.body);
	multisig.createMultiSig(web3,req.body).then((result)=>{res.send(JSON.stringify(result))});
})

app.post('/MultiSig/submit', jsonParser, function (req, res) {
	// console.log(req.body);
	multisig.submitMultiSigTxn(req.body).then((result)=>{res.send(JSON.stringify(result))});
})
//
// app.post('/MultiSig/confirm', jsonParser, function (req, res) {
// 	// console.log(req.body);
// 	multisig.confirmMultiSigTxn(req.body).then((result)=>{res.send(JSON.stringify(result))});
// })
//
// app.post('/MultiSig/execute', jsonParser, function (req, res) {
// 	// console.log(req.body);
// 	multisig.executeMultiSigTxn(req.body).then((result)=>{res.send(JSON.stringify(result))});
// })

app.post('/SendEther/p2any', jsonParser, function (req, res) {
	// console.log(req.body);
	send_ether.p2any(web3, req.body).then((result)=>{res.send(JSON.stringify(result))});
})

app.post('/GetBalance', jsonParser, function (req, res) {
	// console.log(req.body);
	get_balance.getBalance(web3, req.body).then((result)=>{res.send(JSON.stringify(result))});
})



var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
})()
