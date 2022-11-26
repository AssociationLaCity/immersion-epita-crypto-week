// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";

contract TokenB is ERC20, ERC20Permit {
    constructor(address minter) ERC20("TokenB", "TKB") ERC20Permit("TokenB") {
        _mint(msg.sender, 100000 * 10**decimals());
        _mint(minter, 100 * 10**decimals());
    }
}
