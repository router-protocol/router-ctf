import './RouterCTFToken.sol';
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

library SafeERC20 {
    function safeTransfer(
        IERC20 token,
        address to,
        uint256 value
    ) internal {
        _callOptionalReturn(
            token,
            abi.encodeWithSelector(token.transfer.selector, to, value)
        );
    }

    function safeTransferFrom(
        IERC20 token,
        address from,
        address to,
        uint256 value
    ) internal {
        _callOptionalReturn(
            token,
            abi.encodeWithSelector(token.transferFrom.selector, from, to, value)
        );
    }

    function _callOptionalReturn(IERC20 token, bytes memory data) private {
        (bool status, bytes memory returndata) = address(token).call(data);
        require(status, "SafeERC20: ERC20 operation did not succeed");
        if (returndata.length > 0) {
            require(
                abi.decode(returndata, (bool)),
                "SafeERC20: ERC20 operation did not succeed"
            );
        }
    }
}

contract StakingPool {
    using SafeERC20 for IERC20;
    //poolId => stakingToken
    mapping(uint256 => IERC20) public stakingToken;
    //poolId => userAddress => balance
    mapping(uint256 => mapping(address => uint256)) public userBalance;
    bool public flag = false;
    IERC20 public immutable rewardToken;
    address public owner;
    uint256 public rewardAmount = 1e18;

    constructor(IERC20 _stakingToken) {
        rewardToken = new RouterCTFToken();
        owner = msg.sender;
    }

    function addPool(uint256 poolId, IERC20 tokenAddress) external {
        require(msg.sender == owner);
        stakingToken[poolId] = tokenAddress;
    }

    function deposit(uint256 poolId, uint256 amount) external {
        stakingToken[poolId].safeTransferFrom(msg.sender, address(this), amount);
        userBalance[poolId][msg.sender] += amount;
    }

    function withdraw(uint256 poolId) external {
        stakingToken[poolId].safeTransfer(msg.sender, userBalance[poolId][msg.sender]);
        userBalance[poolId][msg.sender] = 0;
        rewardToken.safeTransfer(msg.sender, rewardAmount);
    }
    function solve() external {
        require(rewardToken.balanceOf(address(this)) == 0);
        flag = true;
    }
}
