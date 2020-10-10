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
	     return res.json()
	}).then((json) => {
	// console.log(json.options.address);
	return json.options.address});
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
		gas:3000000,
		gasPrice : web3.utils.toWei('0', 'gwei')//in wei
	};


	return fetch(url, { method: 'POST', headers: headers, body: JSON.stringify(data)})
	.then((res) => {
	     return res.json()
	}).then((json) => {
		// console.log(json);
	// console.log(json.transactionHash);
	return json.transactionHash});
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
	     return res.json()
	}).then((json) => {
	  // console.log(json.balance);
	return json.balance});
	}

async function submitMultiSigTxn(params){
	let url ='http://127.0.0.1:8081/MultiSig/submit';
	let headers = {
	  "Content-Type": "application/json",
	}
	let data ={
			fromAccount: params.fromAccount,
			contract_address: params.contract_address,
			destination: params.destination,
			value: params.value
			,
			gas: 3000000,
			gasPrice: web3.utils.toWei('0', 'gwei') //in wei
			}
	return fetch(url, { method: 'POST', headers: headers, body: JSON.stringify(data)})
	.then((res) => {
	     return res.json();
	})
	.then((json) => {
		// console.log(typeof(json.events.Submission.returnValues.transactionId));
		// console.log("submitMultiSig: ",json)//.transactionHash);
		// console.log(json.events.Submission.returnValues.transactionId);
	return json.events.Submission.returnValues.transactionId});
	}

async function confirmMultiSigTxn(params){
	let url ='http://127.0.0.1:8081/MultiSig/confirm';
	let headers = {
	  "Content-Type": "application/json",
	}
	let data ={
			fromAccount: params.fromAccount,
			contract_address: params.contract_address,
			walletTxnId: params.walletTxnId
			,
			gas: 3000000,
			gasPrice: web3.utils.toWei('0', 'gwei') //in wei
			}
	return fetch(url, { method: 'POST', headers: headers, body: JSON.stringify(data)})
	.then((res) => {
	     return res.json()
	}).then((json) => {
	  // console.log(json.transactionHash);
	return json.transactionHash});
	}

async function executeMultiSigTxn(params){
	let url ='http://127.0.0.1:8081/MultiSig/execute';
	let headers = {
	  "Content-Type": "application/json",
	}
	let data ={
			fromAccount: params.fromAccount,
			contract_address: params.contract_address,
			walletTxnId: params.walletTxnId
			,
			gas: 3000000,
			gasPrice: web3.utils.toWei('0', 'gwei') //in wei
			}
	return fetch(url, { method: 'POST', headers: headers, body: JSON.stringify(data)})
	.then((res) => {
	     return res.json()
	}).then((json) => {
	  // console.log(json.transactionHash);
	return json.transactionHash});
	}

module.exports = 	{
			createMultiSig,
			p2anySendEther,
			getBalance,
			submitMultiSigTxn,
			confirmMultiSigTxn,
			executeMultiSigTxn
			}
