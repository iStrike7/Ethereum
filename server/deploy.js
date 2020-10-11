async function deployContract(web3, contract){

let deploy_contract = new web3.eth.Contract(JSON.parse(contract.abi));

return deploy_contract.deploy(contract.payload)
.send(contract.parameters, function(error, transactionHash){})
.then(function(newContractInstance){
    return newContractInstance;
}).catch(e => {console.log("Error:\n",e)});

}

function setupContract(web3, contract_details,contract_fromAccount){
	return {
		abi: contract_details.abi,
		payload : {
				data: contract_details.bytecode
				,
				arguments: contract_details.arguments
			},

		parameters : {
			from: contract_fromAccount,
			gas: contract_details.gas,
			gasPrice: contract_details.gasPrice
			}
		}
}

module.exports = {setupContract,deployContract}
