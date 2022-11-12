import '@openzeppelin/contracts/utils/Address.sol';
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
contract Profanity {

    using Address for address;
    bool public flag;

    function solve(address a, address b) external {
        (bool success, bytes memory data) =  (address(a).staticcall(abi.encode(b)));
        uint8 v = abi.decode(data,(uint8));
        require(success && !address(a).isContract() && (v & 1) == 1);
        assembly {
            sstore(0, v)
        }
        require(flag);
    }

}