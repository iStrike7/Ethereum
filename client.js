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



let multiSig_contractAddress = await client_functions.createMultiSig({
					fromAccount: addresses[0],
					ownersList: [addresses[0],addresses[1],addresses[2]],
					requiredNumber:2
					})
					.then((result)=>{return result.replace(/['"]+/g, '')});
// console.log(multiSig_contractAddress);

await client_functions.p2anySendEther({
					from: addresses[0],
					to: addresses[1],
					value: web3.utils.toWei('1', 'ether') //in wei
					})

await client_functions.getBalance({address: addresses[0]})

await client_functions.p2anySendEther({
					from: addresses[1],
					to: multiSig_contractAddress,
					value: web3.utils.toWei('10', 'ether') //in wei
					})

await client_functions.getBalance({address: multiSig_contractAddress})

let multisig_txnId = await client_functions.submitMultiSig({
					fromAccount: addresses[0],
					contract_address: multiSig_contractAddress,
					destination: addresses[5],
					value: web3.utils.toWei('1', 'ether') //in wei
					})
// console.log(multisig_txnId);
// console.log(typeof(multisig_txnId));
await client_functions.confirmMultiSig({
					fromAccount: addresses[1],
					contract_address: multiSig_contractAddress,
					walletTxnId: multisig_txnId
					})

await client_functions.getBalance({address: addresses[5]})

await client_functions.executeMultiSig({
					fromAccount: addresses[1],
					contract_address: multiSig_contractAddress,
					walletTxnId: multisig_txnId
					})


}
run_client();
