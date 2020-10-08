const compile = require('./compile.js')
const deploy = require('./deploy.js')
const Web3 = require('web3');


async function run(){
if (typeof web3 !== 'undefined') {
         web3 = await new Web3(web3.currentProvider);
     } else {
         // set the provider you want from Web3.providers
         web3 = await new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
     }

let addresses = await web3.eth.getAccounts();
let contractFileName = await 'MultiSigWallet.sol';

let compiled_contract = await compile.compileSingleContract(contractFileName);
let contract_details = await {
	abi : JSON.stringify(compiled_contract.abi),
	bytecode : compiled_contract.evm.bytecode.object
	,
	// abi0 : JSON.stringify(compiled_contract.abi),
	// bytecode0 : compiled_contract.evm.bytecode.object.toString('utf8').replace(/['"]+/g, '').replace(/\s/g, '')
	// ,
	// abi : fs.readFileSync(path.resolve(__dirname, 'build', 'MultiSigWallet.abi'), 'utf8'),
	// bytecode : fs.readFileSync(path.resolve(__dirname, 'build', 'MultiSigWallet.bytecode'),'utf8').replace(/['"]+/g, '').replace(/\s/g, '')
	// ,
	gas : 3000000,
	gasPrice : {
		value: '0',
		units: 'wei'
	}
};

fromAccountIndex = 0;
// console.log(typeof(contract_details.bytecode));
// console.log(contract_details.abi0,"\n",contract_details.abi);
// console.log(contract_details.bytecode0,"\n",contract_details.bytecode);
// console.log(typeof(contract_details.abi0),"\n",typeof(contract_details.bytecode0));
// console.log(typeof(contract_details.abi),"\n",typeof(contract_details.bytecode));
//
// console.log(contract_details.abi0===contract_details.abi);
// console.log(contract_details.bytecode0===contract_details.bytecode);

let contractInstance = await deploy.deployContract(web3,
		deploy.setupContract(web3, contract_details,addresses[fromAccountIndex])
		)
		.then((contractInstance)=>{return contractInstance;});

console.log(contractInstance.options.address);
return contractInstance.options.address;
}


// run();
module.exports = {run};
