const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

function compilingPreperations() {
    const buildPath = path.resolve(__dirname, 'build');
    fs.removeSync(buildPath);
    return buildPath;
}



function createConfiguration(contractFileName) {
    return {
        language: 'Solidity',
        sources: {
            [contractFileName]: {
                content: fs.readFileSync(path.resolve(__dirname, 'contracts', contractFileName), 'utf8')
            },
        },
        settings: {
            outputSelection: {
                '*': {
                    '*': ['*']
                }
            }
        }
    };
}

function compileSources(config) {
    try {
	    //console.log(config);
	return JSON.parse(solc.compile(JSON.stringify(config), { import: getImports }));
	//console.log(config);
	//return JSON.parse(solc.compile(JSON.stringify(config)));
    } catch (e) {
        console.log(e);
    }
}

function getImports(dependency) {
    console.log('Searching for dependency: ', dependency);
	return {contents: fs.readFileSync(path.resolve(__dirname, 'contracts', dependency), 'utf8')};
    }

function errorHandling(compiledSources) {
    if (!compiledSources) {
        console.error('>>>>>>>>>>>>>>>>>>>>>>>> ERRORS <<<<<<<<<<<<<<<<<<<<<<<<\n', 'NO OUTPUT');
    } else if (compiledSources.errors) {
        console.error('>>>>>>>>>>>>>>>>>>>>>>>> ERRORS <<<<<<<<<<<<<<<<<<<<<<<<\n');
        compiledSources.errors.map(error => console.log(error.formattedMessage));
    }
}

function writeOutput(compiled, buildPath) {
    fs.ensureDirSync(buildPath);

    for (let contractFileName in compiled.contracts) {
        const contractName = contractFileName.replace('.sol', '');
        // console.log('Writing: ', contractName + '.json');
        fs.outputJsonSync(
            path.resolve(buildPath, contractName + '.abi'),
            compiled.contracts[contractFileName][contractName].abi
        );
	fs.outputJsonSync(
            path.resolve(buildPath, contractName + '.bytecode'),
            compiled.contracts[contractFileName][contractName].evm.bytecode.object
        );
	fs.outputJsonSync(
            path.resolve(buildPath, contractName + '.json'),
            compiled.contracts[contractFileName][contractName]
        );
    }
}

async function compileSingleContract(contractFileName){
	const buildPath = compilingPreperations();
	const config = createConfiguration(contractFileName);
	const compiled = compileSources(config);
	// errorHandling(compiled);
	writeOutput(compiled, buildPath);
	let contractName = contractFileName.replace('.sol', '');
	return compiled.contracts[contractFileName][contractName];
}

module.exports = { compileSingleContract }
