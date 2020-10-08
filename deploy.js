// const Web3 = require('web3');
// const EthereumTx = require('ethereumjs-tx').Transaction;



async function deployContract(web3, contract){

let deploy_contract = new web3.eth.Contract(JSON.parse(contract.abi));

return deploy_contract.deploy(contract.payload)
.send(contract.parameters, function(error, transactionHash){})
.then(function(newContractInstance){
    // console.log(newContractInstance.options.address) // instance with the new contract address
    return newContractInstance;
}).catch(e => {console.log("Error:\n",e)});

}

function setupContract(web3, contract_details,contract_fromAccount){
	return {
		abi: contract_details.abi,
		payload : {
				data: contract_details.bytecode
				,
				arguments: [["0x79502D50Ef8BfF72078e0CF46463CE9cCfDb5bF2"], 1]
			},

		parameters : {
			from: contract_fromAccount,
			gas: web3.utils.toHex(contract_details.gas),
			gasPrice: web3.utils.toHex(web3.utils.toWei(contract_details.gasPrice.value, contract_details.gasPrice.units))
			}
		}
}

module.exports = {setupContract,deployContract}


// if (typeof web3 !== 'undefined') {
//          web3 = new Web3(web3.currentProvider);
//      } else {
//          // set the provider you want from Web3.providers
//          web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
//      }
//
// contract_details = {
// 	abi : '[{"constant":false,"inputs":[{"name":"value","type":"uint256"}],"name":"update_quantity","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"get_quantity","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]'
// 	,
// 	bytecode : '608060405234801561001057600080fd5b50606460008190555060ca806100276000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c806380219655146037578063ed0109a5146062575b600080fd5b606060048036036020811015604b57600080fd5b8101908080359060200190929190505050607e565b005b6068608c565b6040518082815260200191505060405180910390f35b806000540160008190555050565b6000805490509056fea265627a7a7230582002f975dfd70c1b1f649671805826a83fc9b92457fe7dd245527f56b7776d043464736f6c634300050a0032'
// 	,
// 	gas : 800000,
// 	gasPrice : {
// 		value: '30',
// 		units: 'gwei'
// 	}
// };

// let fromAccountIndex = 0;

// (async()=>{
// let addresses = await web3.eth.getAccounts();
//
//
// fromAccountIndex = 0;
// let contractInstance = await deployContract(web3,
// 		setupContract(contract_details,addresses[fromAccountIndex])
// 		)
// 		.then((contractInstance)=>{return contractInstance;});
//
// console.log(contractInstance.options.address);
//
// // (async () => {throw 'hi'})().then((result) => {console.log(result)}).catch(e => {console.log('error',e)});
// // (async () => {return 'hey'})().then((result) => {console.log(result)}).catch(e => {console.log('error',e)})
// // .then(() => {throw 'hello'}).then((result) => {console.log(result)}).catch(e => {console.log('error',e)});
//
// })();
