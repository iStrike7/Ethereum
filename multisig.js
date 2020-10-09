const compile = require('./compile.js')
const deploy = require('./deploy.js')


async function createMultiSig(web3, data){
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
let contractInstance = await deploy.deployContract(web3,
		deploy.setupContract(web3, contract_details,data.fromAccount)
		)
		.then((contractInstance)=>{return contractInstance;});

// console.log(contractInstance.options.address);
return contractInstance.options.address;
}

async function submitMultiSigTxn(web3, data){
// const contract = await web3.eth.Contract(
// 					JSON.parse(
// 					fs.readFileSync(path.resolve(__dirname, 'build', 'MultiSigWallet.abi'), 'utf8')
// 					)
// 					,
// 					data.contract_address
// 					);

// console.log(data);


return ''
	// contract.methods.submitTransaction	(
	// 				data.destination,
	// 				data.value,
	// 				web3.utils.hexToBytes(web3.utils.toHex(''))
	// 				)

}

// async function confirmMultiSigTxn(web3, data){}
//
// async function executeMultiSigTxn(web3, data){}

module.exports = {	createMultiSig
			,
			submitMultiSigTxn,
			// confirmMultiSigTxn,
			// executeMultiSigTxn
		};
