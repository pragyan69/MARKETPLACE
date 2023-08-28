const Boss = artifacts.require('Boss')

module.exports = async (deployer) => {
  const accounts = await web3.eth.getAccounts()

  await deployer.deploy(TimelessNFT, 'BossNFTS', 'BOSS', 10, accounts[1])
}

