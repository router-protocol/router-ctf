import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
contract StakingToken is ERC20{
    constructor() ERC20('STK','STK') {
        _mint(msg.sender, 1e21);
    }
}