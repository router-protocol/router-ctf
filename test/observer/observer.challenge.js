const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("[Challenge] CTF1", function () {
	let deployer, attacker;

	const TOKENS_IN_POOL = ethers.utils.parseEther("1000");
	before(async function () {
		/** SETUP SCENARIO - NO NEED TO CHANGE ANYTHING HERE */

		[deployer, attacker] = await ethers.getSigners();

		const StakingTokenFactory = await ethers.getContractFactory(
			"StakingToken",
			deployer
		);
		const StakingPoolFactory = await ethers.getContractFactory(
			"StakingPool",
			deployer
		);

		this.stakingToken = await StakingTokenFactory.deploy();
		this.stakingPool = await StakingPoolFactory.deploy(
			this.stakingToken.address
		);

		await this.stakingToken.approve(
			this.stakingPool.address,
			TOKENS_IN_POOL
		);
		await this.stakingPool.addPool(0,this.stakingToken.address);
		await this.stakingPool.deposit(0,TOKENS_IN_POOL);
		this.rewardToken = await ethers.getContractAt('RouterCTFToken',await this.stakingPool.rewardToken());
		expect(
			await this.stakingToken.balanceOf(this.stakingPool.address)
		).to.equal(TOKENS_IN_POOL);

		expect(
			await this.rewardToken.balanceOf(this.stakingPool.address)
		).to.equal(ethers.utils.parseEther("100"));

		expect(
			await this.stakingToken.balanceOf(attacker.address)
		).to.equal(ethers.utils.parseEther("0"));

		expect(
			await this.rewardToken.balanceOf(attacker.address)
		).to.equal(ethers.utils.parseEther("0"));
	});

	it("Exploit", async function () {
		/** CODE YOUR EXPLOIT HERE */
        /** Use only the attacker account for the exploit */
	});

	after(async function () {
		/** SUCCESS CONDITIONS */
		await this.stakingPool.solve();
		expect(await this.stakingPool.flag()).to.be.equal(true);
	});
});
