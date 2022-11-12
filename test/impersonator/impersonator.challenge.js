const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("[Challenge] CTF2", function () {
	let deployer, attacker;

	before(async function () {
		/** SETUP SCENARIO - NO NEED TO CHANGE ANYTHING HERE */

		[deployer, attacker] = await ethers.getSigners();

		const SimpleProxyFactory = await ethers.getContractFactory(
			"SimpleProxy",
			deployer
		);

		this.simpleProxy = await SimpleProxyFactory.deploy();
		expect(await this.simpleProxy.flag()).to.equal(false);
	});

	it("Exploit", async function () {
		/** CODE YOUR EXPLOIT HERE */
		/** Use only the attacker account for the exploit */
	});

	after(async function () {
		/** SUCCESS CONDITIONS */
		expect(await this.simpleProxy.flag()).to.be.equal(true);
	});
});
