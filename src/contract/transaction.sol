// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract APFOS {

    struct TransactionInfo {
        address sender;
        address receiver;
        uint256 value;
        uint256 timestamp; 
    }

    TransactionInfo[] public transactions;

    // Function to send Ether to any user
    function sendToUser(address payable receiver) public payable {
        // Transfer Ether to the specified receiver
        (bool sent) = receiver.send(msg.value);
        require(sent, "Transaction failed");

        // Capture the transaction information
        TransactionInfo memory newTransaction = TransactionInfo({
            sender: msg.sender,
            receiver: receiver,
            value: msg.value,
            timestamp: block.timestamp // Capture the block timestamp
        });

        // Add the transaction information to the array
        transactions.push(newTransaction);
    }

    // Function to retrieve the number of transactions
    function getTransactionsCount() public view returns (uint256) {
        return transactions.length;
    }

    // Function to retrieve transaction information by index
    function getTransaction(uint256 index) public view returns (address, address, uint256, uint256) {
        require(index < transactions.length, "Index out of bounds");
        TransactionInfo memory transaction = transactions[index];
        return (transaction.sender, transaction.receiver, transaction.value, transaction.timestamp);
    }
}
