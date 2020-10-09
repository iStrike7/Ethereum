async function p2any(web3, data){
	// console.log(data);
	return web3.eth.sendTransaction(data)
		.then((result)=>{
			console.log(result);
			return result;})

}

module.exports = {p2any};
