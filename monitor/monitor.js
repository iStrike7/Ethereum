const Web3 = require('web3');
const bs = require("binary-search");

async function run_monitor(){
if (typeof web3 !== 'undefined') {
         web3 = await new Web3(web3.currentProvider);
     } else {
         web3 = await new Web3(new Web3.providers.WebsocketProvider("ws://127.0.0.1:8545"));
     }

let addresses = await web3.eth.getAccounts();
var monitored_addresses = addresses.slice();

var referenced_etherTxns = [];

monitored_addresses.forEach((item, i, array) => {
						array[i] = Buffer.from(item.slice(2),'hex');
						});

monitored_addresses.sort(function(a, b)
					{
					    return Buffer.compare(a,b);
				    });


web3.eth.subscribe('newBlockHeaders')
	.on("connected", function(subscriptionId){
					    console.log(subscriptionId);
						}
		)
	.on("data", function(blockHeader){

					    web3.eth.getBlock(blockHeader.number, true)
					    	.then((block)=>{

							block.transactions.forEach((item, i) => {

								from_monitored_bool=false;
								to_monitored_bool=false;

								if (item.value !== '0'){

									if(!!item.from)
									{
										if(bs(monitored_addresses, Buffer.from(item.from.slice(2),'hex'),
											 function(element, needle) {
												 return Buffer.compare(element,needle);
											  })
											>0
										){
											from_monitored_bool = true;
										}
										else if(!!item.to) {
											if(bs(monitored_addresses, Buffer.from(item.to.slice(2),'hex'),
												 function(element, needle) {
													 return Buffer.compare(element,needle);
												  })
												>0
											){
												to_monitored_bool = true;
											}
										}
									}
								}


								if(from_monitored_bool || to_monitored_bool){
										referenced_etherTxns.push(
											{
												txnHash : item.hash,
												from: item.from,
												to: item.to,
												value: item.value
											}
										)
									}
							})

						})
						.then(()=>{
							if (blockHeader.number==17){
								console.log(referenced_etherTxns);
							}
						})

					}

		);

}

run_monitor();
