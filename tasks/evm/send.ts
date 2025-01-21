import bs58 from 'bs58'
import { BigNumber } from 'ethers'
import { task, types } from 'hardhat/config'
import { ActionType, HardhatRuntimeEnvironment } from 'hardhat/types'

import { makeBytes32 } from '@layerzerolabs/devtools'
import { EndpointId } from '@layerzerolabs/lz-definitions'
import { Options } from '@layerzerolabs/lz-v2-utilities'

import { getLayerZeroScanLink } from '../solana'

interface TaskArguments {
    dstEid: number
    amount: string
    to: string
}

const action: ActionType<TaskArguments> = async ({ dstEid, amount, to }, hre: HardhatRuntimeEnvironment) => {
    const signer = await hre.ethers.getNamedSigner('deployer')
    const tokenName = 'WooTokenOFT'
    // @ts-ignore
    const token = (await hre.ethers.getContract(tokenName)).connect(signer)

    if (hre.network.name == 'ethereum') {
        const IERC20 = '@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20'
        const tokenAddress = '0x4691937a7508860f876c9c0a2a617e7d9e945d4b'
        // @ts-ignore
        const erc20Token = (await hre.ethers.getContractAt(IERC20, tokenAddress)).connect(signer)
        const approvalTxResponse = await erc20Token.approve(token.address, amount)
        const approvalTxReceipt = await approvalTxResponse.wait()
        console.log(`approve: ${amount}: ${approvalTxReceipt.transactionHash}`)
    }

    const amountLD = BigNumber.from(amount)
    // drop 5 x 10^13 wei gas = 0.00005 ETH on the dest EVM chain
    // const options = Options.newOptions().addExecutorNativeDropOption(5e13, makeBytes32(to))
    // drop 2 x 10^6 lamport gas = 0.002 SOL on the dest Solana chain
    const options = Options.newOptions().addExecutorNativeDropOption(2e6, makeBytes32(bs58.decode(to)))
    const sendParam = {
        dstEid,
        to: makeBytes32(bs58.decode(to)), // to solana address
        //to: makeBytes32(to), // to evm address
        amountLD: amountLD.toString(),
        minAmountLD: amountLD.mul(9_000).div(10_000).toString(),
        extraOptions: options.toHex(),
        composeMsg: '0x',
        oftCmd: '0x',
    }
    const [msgFee] = await token.functions.quoteSend(sendParam, false)
    const txResponse = await token.functions.send(sendParam, msgFee, signer.address, {
        value: msgFee.nativeFee,
        gasLimit: 500_000,
    })
    const txReceipt = await txResponse.wait()
    console.log(`send: ${amount} to ${to}: ${txReceipt.transactionHash}`)
    console.log(
        `Track cross-chain transfer here: ${getLayerZeroScanLink(txReceipt.transactionHash, dstEid == EndpointId.SOLANA_V2_TESTNET)}`
    )
}

task('send', 'Sends a transaction', action)
    .addParam('dstEid', 'Destination endpoint ID', undefined, types.int, false)
    .addParam('amount', 'Amount to send in wei', undefined, types.string, false)
    .addParam('to', 'Recipient address', undefined, types.string, false)
