import { ethers } from 'hardhat';

async function main() {
  const board = await ethers.deployContract('Board');

  await board.waitForDeployment();

  console.log(`Contract deployed to ${board.target}`);
}
//0x318Af3833Ce46302Aad3d6BF1E8628De6017aE47 --deployed contract
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
