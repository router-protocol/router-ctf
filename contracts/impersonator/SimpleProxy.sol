// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract SimpleProxy {

   bool public flag = false;

   function solve(address a) external {
      (bool success, bytes memory data) = a.delegatecall("");
      require(data.length != 0 && success);

      require(flag);
   }

}