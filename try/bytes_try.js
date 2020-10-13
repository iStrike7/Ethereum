const Web3 = require('web3');
const fs = require('fs-extra');
const path = require('path');

(async () => {
if (typeof web3 !== 'undefined') {
         web3 = await new Web3(web3.currentProvider);
     } else {
         web3 = await new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
     }

console.log(web3.utils.toHex(''));

console.log(web3.utils.hexToBytes(web3.utils.toHex('')));

})()
