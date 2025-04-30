// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract chai {

    struct Memo{
        string name;
        string messages;
        uint timestamp;
        address from;
    }

    Memo[] memos; //We create an array to store multiple "Memo" structs. This will hold all the memo data.

    //The keyword payable means this address can receive Ether payments.
    address payable owner;
    constructor(){ // the constructor, which runs when the contract is deployed
        owner = payable(msg.sender); //it sets the owner to be whoever deploys the contract.
    }

    // This defines an external (i.e., can't be called from within another function in this smart contract), payable, and public method named "buyChai":
    //The keyword calldata is an optimization hint to tell Solidity that these strings will be passed in as calldatas, not stored on-chain.
    function buyChai(string calldata name, string calldata message) external payable {
        require(msg.value > 0, "Please pay more than 0 ether");
        owner.transfer(msg.value); //owner will transfer the amount of ether
        //We create a new instance of our custom Memo struct and store it at the end of memos array:
        // The constructor takes four arguments, which are assigned to its corresponding fields.
        // msg.sender: This is an immutable variable that holds the address of whoever called this function.
        memos.push(Memo(name, message, block.timestamp, msg.sender)); //We have another operation where we push a new memo onto our memos array with all data from user input and also owner's address
    }

    //This is an external method that allows anyone to read the entire "memos" array:
    // It has no effects (i.e., it doesn't modify any variables), so we can use the keyword view.
    // The function simply returns all elements in our memo array.
    function getMemo() public view returns(Memo[] memory){
        return memos;
    }
}

//It's an immutable input buffer where you can store function parameters.Think of it as read-only memory for inputs.
//When calling functions, EVM allocates space on the calldata stack to hold incoming values. This allows Solidity to optimize performance by minimizing gas costs and reducing storage usage.
//Now, let's revisit our buyChai function:
//function buyChai(string calldata name, string calldata message) external payable {...}
//We define two parameters: name (string type) and message (also a string). Both have the keyword calldata, indicating they're stored on calldata.
//When someone calls our contract's buyChai method, passing in values for name and message, EVM allocates space on the calldata stack to store these inputs.
//By using calldata, we:
// Avoid storing function parameters as variables (which would occupy memory).
// Reduce gas costs since calldata is read-only.
// Improve performance by minimizing storage usage.