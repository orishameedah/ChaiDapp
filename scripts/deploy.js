
const hre = require("hardhat");

async function main() {
    const Chai = await hre.ethers.getContractFactory("chai"); //fetching bytecode and ABI of the smart contract chai
    //getContractFactory is a function that returns a contract factory, which is an abstraction used to deploy new smart contracts. It takes the name of the contract as an argument.
    const chai = await Chai.deploy(); //creating a contract instance of our smart contract 

    await chai.waitForDeployment() //wait for the contract to be deployed

    //chai.getAddress() is asynchronous and returns a Promise. You need to use await to resolve it and get the actual address.
    // Without await, the Promise object is logged instead of the resolved value.   
    const address = await chai.getAddress(); // Await the result of getAddress()
    console.log("Chai deployed to:", address); // Log the deployed contract address
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
}); //if error occurs, it will be logged in the console and the process will exit with code 1
//this is a way to handle errors in async functions. If an error occurs, it will be logged in the console and the process will exit with code 1.

// 0xa26D19951e8f0a7e5c446d0e6fe5044D727d3436