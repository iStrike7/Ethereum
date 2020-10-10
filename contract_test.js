const Web3 = require('web3');
const fs = require('fs-extra');
const path = require('path');

(async () => {
if (typeof web3 !== 'undefined') {
         web3 = await new Web3(web3.currentProvider);
     } else {
         web3 = await new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
     }

let addresses = await web3.eth.getAccounts();

const contract = await new web3.eth.Contract(
					JSON.parse(
					fs.readFileSync(path.resolve(__dirname, 'build', 'MultiSigWallet.abi'), 'utf8')
					)
					,
					"0x298014DdBf434c97dDf1364E5747318C668d0f53"
					);

contract.methods.getOwners().call().then((result)=>{console.log(result)});

})()
