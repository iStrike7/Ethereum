const compile = require('./compile.js');
const deploy = require('./deploy.js');
const fs = require('fs-extra');
const path = require('path');


async function createMultiSig(web3, data){
	// console.log(data);
	let contractFileName = await 'MultiSigWallet.sol';


	let compiled_contract = await compile.compileSingleContract(contractFileName);
	let contract_details = await {
					abi : JSON.stringify(compiled_contract.abi),
					bytecode : compiled_contract.evm.bytecode.object
					,
					arguments: [data.ownersList,data.requiredNumber],
					gas : data.gas,
					gasPrice : data.gasPrice
				};

	// console.log(data.fromAccount);
	// console.log(typeof(data.fromAccount));

	let contractInstance = await deploy.deployContract(web3,
			deploy.setupContract(web3, contract_details,data.fromAccount)
			)
			.then((contractInstance)=>{return contractInstance;});

	// console.log(contractInstance);
	return contractInstance;
	}

async function submitMultiSigTxn(web3, data){

	// console.log(data);
	const contract = await new web3.eth.Contract(
						JSON.parse(
						fs.readFileSync(path.resolve(__dirname, '../','build', 'MultiSigWallet.abi'), 'utf8')
						)
						,
						data.contract_address
						);


	return contract.methods.submitTransaction(
						data.destination,
						data.value,
						web3.utils.toHex('')
					).send({
						from: data.fromAccount,
						gas: data.gas,
						gasPrice: data.gasPrice,
					})
					.then((result)=>{
								// console.log("submitTransaction: ")
								// console.log(result.events.Submission.returnValues.transactionId);
								return result;
								})


}

async function confirmMultiSigTxn(web3, data){
	// console.log(data);

	const contract = await new web3.eth.Contract(
						JSON.parse(
						fs.readFileSync(path.resolve(__dirname, 'build', 'MultiSigWallet.abi'), 'utf8')
						)
						,
						data.contract_address
						);
	// contract.methods.getOwners().call().then((result)=>{console.log(result)});
	return contract.methods.confirmTransaction(
						data.walletTxnId,
					).send({
						from: data.fromAccount,
						gas: data.gas,
						gasPrice: data.gasPrice,
					})
					.then((result)=>{
								// console.log(result);
								return result;
								})

}

async function executeMultiSigTxn(web3, data){
	const contract = await new web3.eth.Contract(
						JSON.parse(
						fs.readFileSync(path.resolve(__dirname, 'build', 'MultiSigWallet.abi'), 'utf8')
						)
						,
						data.contract_address
						);

	return contract.methods.executeTransaction(
						data.walletTxnId,
					).send({
						from: data.fromAccount,
						gas: data.gas,
						gasPrice: data.gasPrice,
					})
					.then((result)=>{
								// console.log(result);
								return result;
								})

}

module.exports = {	createMultiSig
			,
			submitMultiSigTxn,
			confirmMultiSigTxn,
			executeMultiSigTxn
		};
