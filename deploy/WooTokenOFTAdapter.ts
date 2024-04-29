import assert from 'assert'

import { type DeployFunction } from 'hardhat-deploy/types'

const contractName = 'WooTokenOFTAdapter'
// const wooTokenOnETH = '0x4691937a7508860F876c9c0a2a617E7d9E945D4B' // WOO token address on ETH mainnet
const wooTokenOnArbitrum = '0xcAFcD85D8ca7Ad1e1C6F82F651fA15E33AEfD07b' // WOO token address on Arbitrum

const deployOFTAdapter: DeployFunction = async (hre) => {
    const { getNamedAccounts, deployments } = hre

    const { deploy } = deployments
    const { deployer } = await getNamedAccounts()

    assert(deployer, 'Missing named deployer account')

    console.log(`Network: ${hre.network.name}`)
    console.log(`Deployer: ${deployer}`)

    const chainId = await hre.getChainId()

    // REMOVE FOR PRODUCTION ETH Mainnet
    // if (chainId !== '1') {
    //     console.error('This deployment script is only meant for Ethereum mainnet')
    //     return
    // }

    // This is an external deployment pulled in from @layerzerolabs/lz-evm-sdk-v2
    //
    // @layerzerolabs/toolbox-hardhat takes care of plugging in the external deployments
    // from @layerzerolabs packages based on the configuration in your hardhat config
    //
    // For this to work correctly, your network config must define an eid property
    // set to `EndpointId` as defined in @layerzerolabs/lz-definitions
    //
    // For example:
    //
    // networks: {
    //   fuji: {
    //     ...
    //     eid: EndpointId.AVALANCHE_V2_TESTNET
    //   }
    // }
    const endpointV2Deployment = await hre.deployments.get('EndpointV2')

    const { address } = await deploy(contractName, {
        from: deployer,
        args: [
            wooTokenOnArbitrum, // original token for OFT
            endpointV2Deployment.address, // LayerZero's EndpointV2 address
            deployer, // owner
        ],
        log: true,
        skipIfAlreadyDeployed: false,
    })

    console.log(`Deployed contract: ${contractName}, network: ${hre.network.name}, address: ${address}`)
}

deployOFTAdapter.tags = ['WooTokenOFTAdapter']
export default deployOFTAdapter
