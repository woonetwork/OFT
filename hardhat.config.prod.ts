// Get the environment configuration from .env file
//
// To make use of automatic environment setup:
// - Duplicate .env.example file and name it .env
// - Fill in the environment variables
import 'dotenv/config'

import 'hardhat-deploy'
import '@nomicfoundation/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'
import 'hardhat-deploy-ethers'
import 'hardhat-contract-sizer'
import '@nomiclabs/hardhat-ethers'
import '@layerzerolabs/toolbox-hardhat'
import './tasks'

import { HardhatUserConfig, HttpNetworkAccountsUserConfig } from 'hardhat/types'

import { EndpointId } from '@layerzerolabs/lz-definitions'

// Set your preferred authentication method
//
// If you prefer using a mnemonic, set a MNEMONIC environment variable
// to a valid mnemonic
const MNEMONIC = process.env.MNEMONIC

// If you prefer to be authenticated using a private key, set a PRIVATE_KEY environment variable
const PRIVATE_KEY = process.env.PRIVATE_KEY

const accounts: HttpNetworkAccountsUserConfig | undefined = MNEMONIC
    ? { mnemonic: MNEMONIC }
    : PRIVATE_KEY
      ? [PRIVATE_KEY]
      : undefined

if (accounts == null) {
    console.warn(
        'Could not find MNEMONIC or PRIVATE_KEY environment variables. It will not be possible to execute transactions in your example.'
    )
}

const config: HardhatUserConfig = {
    paths: {
        cache: 'cache/hardhat',
        tests: 'test/hardhat',
    },
    solidity: {
        compilers: [
            {
                version: '0.8.22',
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
        ],
    },
    networks: {
        ethereum: {
            eid: EndpointId.ETHEREUM_V2_MAINNET,
            url: `https://rpc.ankr.com/eth`,
            accounts,
        },
        merlin: {
            eid: EndpointId.MERLIN_V2_MAINNET,
            url: `https://rpc.merlinchain.io`,
            accounts,
        },
        linea: {
            eid: EndpointId.ZKCONSENSYS_V2_MAINNET,
            url: `https://rpc.linea.build`,
            accounts,
        },
        base: {
            eid: EndpointId.BASE_V2_MAINNET,
            url: `https://mainnet.base.org`,
            accounts,
        },
        zksync: {
            eid: EndpointId.ZKSYNC_V2_MAINNET,
            url: `https://mainnet.era.zksync.io`,
            accounts,
        },
        mantle: {
            eid: EndpointId.MANTLE_V2_MAINNET,
            url: `https://rpc.mantle.xyz`,
            accounts,
        },
        sonic: {
            eid: EndpointId.SONIC_V2_MAINNET,
            url: `https://rpc.soniclabs.com`,
            accounts,
        },
    },
    namedAccounts: {
        deployer: {
            default: 0, // wallet address of index[0], of the mnemonic in .env
        },
    },
}

export default config
