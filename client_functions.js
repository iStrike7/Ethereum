const fetch = require('node-fetch');

async function createMultiSig(params){
let url ='http://127.0.0.1:8081/MultiSig/create';
let headers = {
  "Content-Type": "application/json",
}
let data = {
	fromAccount: params.fromAccount,
	ownersList: params.ownersList,
	requiredNumber: params.requiredNumber,
	gas:3000000,
	gasPrice : web3.utils.toWei('0', 'gwei')
};

return fetch(url, { method: 'POST', headers: headers, body: JSON.stringify(data)})
.then((res) => {
     return res.text()
}).then((text) => {
  console.log(text)
return text});
}

async function p2anySendEther(params){
let url ='http://127.0.0.1:8081/SendEther/p2any';
let headers = {
  "Content-Type": "application/json",
}
let data = {
	from: params.from,
	to: params.to,
	value: params.value //in wei
	,
	gas:21000,
	gasPrice : web3.utils.toWei('0', 'gwei')//in wei
};


return fetch(url, { method: 'POST', headers: headers, body: JSON.stringify(data)})
.then((res) => {
     return res.json()
}).then((json) => {
  console.log(json.transactionHash)
return json});
}


async function getBalance(params){
let url ='http://127.0.0.1:8081/GetBalance';
let headers = {
  "Content-Type": "application/json",
}
let data = {
	address: params.address
};


return fetch(url, { method: 'POST', headers: headers, body: JSON.stringify(data)})
.then((res) => {
     return res.text()
}).then((text) => {
  console.log(text)
return text});
}

async function submitMultiSig(params){
let url ='http://127.0.0.1:8081/MultiSig/submit';
let headers = {
  "Content-Type": "application/json",
}
let data = params;

return fetch(url, { method: 'POST', headers: headers, body: JSON.stringify(data)})
.then((res) => {
     return res.text()
}).then((text) => {
  console.log(text)
return text});
}

module.exports = 	{
			createMultiSig,
			p2anySendEther,
			getBalance,
			submitMultiSig
			}
