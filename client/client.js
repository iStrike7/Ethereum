const Web3 = require('web3');
const client_functions = require('./client_functions.js');


async function run_client(){
if (typeof web3 !== 'undefined') {
         web3 = await new Web3(web3.currentProvider);
     } else {
         web3 = await new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
     }

let addresses = await web3.eth.getAccounts();
// console.log(addresses);



multiSig_contractAddress = await client_functions.createMultiSig({
					fromAccount: addresses[0],
					ownersList: [addresses[0],addresses[1],addresses[2]],
					requiredNumber:2
					})
					.then((result)=>{return result.replace(/['"]+/g, '')});
// console.log(multiSig_contractAddress);

await client_functions.p2anySendEther({
					from: addresses[0],
					to: multiSig_contractAddress,
					value: web3.utils.toWei('40', 'ether') //in wei
					})

await client_functions.p2anySendEther({
					from: addresses[1],
					to: multiSig_contractAddress,
					value: web3.utils.toWei('40', 'ether') //in wei
					})

await client_functions.p2anySendEther({
					from: addresses[2],
					to: multiSig_contractAddress,
					value: web3.utils.toWei('40', 'ether') //in wei
					})

await client_functions.p2anySendEther({
					from: addresses[3],
					to: multiSig_contractAddress,
					value: web3.utils.toWei('40', 'ether') //in wei
					})

await client_functions.p2anySendEther({
					from: addresses[4],
					to: multiSig_contractAddress,
					value: web3.utils.toWei('40', 'ether') //in wei
					})


//-----------------------------
// To addresses[5]

multisig_txnId = await client_functions.submitMultiSigTxn({
					fromAccount: addresses[0],
					contract_address: multiSig_contractAddress,
					destination: addresses[5],
					value: web3.utils.toWei('20', 'ether') //in wei
					})

await client_functions.confirmMultiSigTxn({
					fromAccount: addresses[1],
					contract_address: multiSig_contractAddress,
					walletTxnId: multisig_txnId
					})

await client_functions.executeMultiSigTxn({
					fromAccount: addresses[1],
					contract_address: multiSig_contractAddress,
					walletTxnId: multisig_txnId
					})

//-----------------------------
// To addresses[6]

multisig_txnId = await client_functions.submitMultiSigTxn({
					fromAccount: addresses[1],
					contract_address: multiSig_contractAddress,
					destination: addresses[6],
					value: web3.utils.toWei('20', 'ether') //in wei
					})

await client_functions.confirmMultiSigTxn({
					fromAccount: addresses[2],
					contract_address: multiSig_contractAddress,
					walletTxnId: multisig_txnId
					})

//-----------------------------
// To addresses[7]

multisig_txnId = await client_functions.submitMultiSigTxn({
					fromAccount: addresses[2],
					contract_address: multiSig_contractAddress,
					destination: addresses[7],
					value: web3.utils.toWei('20', 'ether') //in wei
					})

await client_functions.confirmMultiSigTxn({
					fromAccount: addresses[0],
					contract_address: multiSig_contractAddress,
					walletTxnId: multisig_txnId
					})

//-----------------------------
// To addresses[8]

multisig_txnId = await client_functions.submitMultiSigTxn({
					fromAccount: addresses[1],
					contract_address: multiSig_contractAddress,
					destination: addresses[8],
					value: web3.utils.toWei('20', 'ether') //in wei
					})

await client_functions.confirmMultiSigTxn({
					fromAccount: addresses[0],
					contract_address: multiSig_contractAddress,
					walletTxnId: multisig_txnId
					})

//-----------------------------
// To addresses[9]

multisig_txnId = await client_functions.submitMultiSigTxn({
					fromAccount: addresses[2],
					contract_address: multiSig_contractAddress,
					destination: addresses[9],
					value: web3.utils.toWei('20', 'ether') //in wei
					})

await client_functions.confirmMultiSigTxn({
					fromAccount: addresses[1],
					contract_address: multiSig_contractAddress,
					walletTxnId: multisig_txnId
					})


for (i=0;i<10;i++){

	await client_functions.getBalance({address: addresses[i]})
		.then((balance_in_wei)=>{
			return web3.utils.fromWei(balance_in_wei, 'ether');
		})
		.then((balance_in_ether)=>{
			console.log("Balance of ",i,"\n",addresses[i],"\n",
			balance_in_ether, "ether"
			,"\n\n"
			);
		})

	}

await client_functions.getBalance({address: multiSig_contractAddress})
	.then((balance_in_wei)=>{
		return web3.utils.fromWei(balance_in_wei, 'ether');
	})
	.then((balance_in_ether)=>{
		console.log("Balance of MultiSigWallet","\n",multiSig_contractAddress,"\n",
		balance_in_ether, "ether"
		,"\n\n"
		);
	})




}


run_client();
