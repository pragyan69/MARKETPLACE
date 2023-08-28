import Web3 from 'web3'
import { setGlobalState , GetGlobalState , setAlert } from './store'
import abi from './abis/Boss.json'

// creating a window object     

const {ethereum}= window

window.web3  = new Web3(ethereum)

// creating the current provider

window.web3 = new Web3(window.web3.currentProvider)

const getEthereumContract = async ()=>{
    const web3 = window.ethereum
    const networkId = await web3.eth.net.getId()
    const networkData = abi.networks[networkId]

    // if the network data is true then we will follow the if and else statement

    if(networkData){
        const contract = new web3.eth.contract(abi.abi , networkData.address )
        return contract
    }

    else{
        return null
    }
}

// function to connect the wallet
const connectWallet = async () => {
    try {
      if (!ethereum) return reportError('Please install Metamask')
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      setGlobalState('connectedAccount', accounts[0].toLowerCase())
    } catch (error) {
      reportError(error)
    }
  }


// function to check the wallet connection and it will update the connection everytime we will refresh the page and it will help us to make changes in different account and check the connection

const isWallectConnected = async () => {
    try {
      if (!ethereum) return reportError('Please install Metamask')
      const accounts = await ethereum.request({ method: 'eth_accounts' })
  
      window.ethereum.on('chainChanged', (chainId) => {
        window.location.reload()
      })
  
      window.ethereum.on('accountsChanged', async () => {
        setGlobalState('connectedAccount', accounts[0].toLowerCase())
        await isWallectConnected()
      })
  
      if (accounts.length) {
        setGlobalState('connectedAccount', accounts[0].toLowerCase())
      } else {
        setGlobalState('connectedAccount', '')
        reportError('Please connect wallet.')
      }
    } catch (error) {
      reportError(error)
    }
  }

  const structuredNfts = (nfts) => {
    return nfts
      .map((nft) => ({
        id: Number(nft.id),
        owner: nft.owner.toLowerCase(),
        cost: window.web3.utils.fromWei(nft.cost),
        title: nft.title,
        description: nft.description,
        metadataURI: nft.metadataURI,
        timestamp: nft.timestamp,
      }))
      .reverse()
  }
  
  const getAllNFTs = async () => {
    try {
      if (!ethereum) return reportError('Please install Metamask')
  
      const contract = await getEtheriumContract()
      const nfts = await contract.methods.getAllNFTs().call()
      const transactions = await contract.methods.getAllTransactions().call()
  
      setGlobalState('nfts', structuredNfts(nfts))
      setGlobalState('transactions', structuredNfts(transactions))
    } catch (error) {
      reportError(error)
    }
  }

  // the .call() we are using in the solidity functions is to call the solidity functions from the smart contract



  const mintNFT = async ({ title, description, metadataURI, price }) => {
    try {
      price = window.web3.utils.toWei(price.toString(), 'ether')
      const contract = await getEtheriumContract()
      const account = getGlobalState('connectedAccount')
      const mintPrice = window.web3.utils.toWei('0.01', 'ether')
  
      await contract.methods
        .payToMint(title, description, metadataURI, price)
        .send({ from: account, value: mintPrice })
  
      return true
    } catch (error) {
      reportError(error)
    }
  }

  // buy nft

  const buyNFT = async ({ id, cost }) => {
    try {
      cost = window.web3.utils.toWei(cost.toString(), 'ether')
      const contract = await getEtheriumContract()
      const buyer = getGlobalState('connectedAccount')
  
      await contract.methods
        .payToBuy(Number(id))
        .send({ from: buyer, value: cost })
  
      return true
    } catch (error) {
      reportError(error)
    }
  }

  // update nft

  const updateNFT = async ({ id, cost }) => {
    try {
      cost = window.web3.utils.toWei(cost.toString(), 'ether')
      const contract = await getEtheriumContract()
      const buyer = getGlobalState('connectedAccount')
  
      await contract.methods.changePrice(Number(id), cost).send({ from: buyer })
    } catch (error) {
      reportError(error)
    }
  }
  
  const reportError = (error) => {
    setAlert(JSON.stringify(error), 'red')
  }
  
  export {
    getAllNFTs,
    connectWallet,
    mintNFT,
    buyNFT,
    updateNFT,
    isWallectConnected,
  }
  

