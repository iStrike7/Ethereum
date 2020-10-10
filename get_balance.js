async function getBalance(web3, addressDataObject){
	// console.log(data);
	return web3.eth.getBalance(addressDataObject.address)
		.then((result)=>{
					// console.log("getBalance typeof(result)",typeof(result));
					return {balance: result};
				})
		.catch(e=>{console.log(e)});

}

module.exports = {getBalance};
