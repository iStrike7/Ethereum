const Web3 = require('web3');
const client_functions = require('./client_functions.js');


async function run_client(){
if (typeof web3 !== 'undefined') {
         web3 = await new Web3(web3.currentProvider);
     } else {
         // set the provider you want from Web3.providers
         web3 = await new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
     }

let addresses = await web3.eth.getAccounts();



let multiSig_contractAddress = await client_functions.createMultiSig({
	fromAccount: addresses[0],
	ownersList: [addresses[0],addresses[1],addresses[2]],
	requiredNumber:2
})

await client_functions.p2anySendEther({
from: addresses[0],
to: addresses[1],
value: web3.utils.toWei('1', 'ether') //in wei
})

await client_functions.getBalance({address: addresses[0]})

await client_functions.submitMultiSig({
contract_address: multiSig_contractAddress,
destination: addresses[5],
value: web3.utils.toWei('1', 'ether') //in wei
})


}
run_client();
