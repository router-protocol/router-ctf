const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("[Challenge] CTF3", function () {
	let deployer, attacker;

	before(async function () {
		/** SETUP SCENARIO - NO NEED TO CHANGE ANYTHING HERE */

		[deployer, attacker] = await ethers.getSigners();

		const ProfanityFactory = await ethers.getContractFactory(
			"Profanity",
			deployer
		);

		this.profanity = await ProfanityFactory.deploy();
		expect(await this.profanity.flag()).to.equal(false);
	});

	it("Exploit", async function () {
		/** CODE YOUR EXPLOIT HERE */
		/** Use only the attacker account for the exploit */
	});

	after(async function () {
		/** SUCCESS CONDITIONS */
		expect(await this.profanity.flag()).to.be.equal(true);
	});
});
