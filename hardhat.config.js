require("@nomiclabs/hardhat-waffle");
require("hardhat-dependency-compiler");

module.exports = {
	networks: {
		hardhat: {
			allowUnlimitedContractSize: true,
		},
	},
	solidity: {
		compilers: [{ version: "0.8.7" }],
	},
};
