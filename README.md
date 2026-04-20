## How to run WOO OFT
---

- install dependencies
    - `pnpm install`
- rename `.env.example` → `.env`
    - put the mnemonic of the test wallet of ethereum
    - use `scripts/getBase58Pk.js` to generate `SOLANA_PRIVATE_KEY`
- rename `layerzero.config.dev.ts` to `layerzero.config.ts`
- rename `hardhat.config.dev.ts` to `hardhat.config.ts`
- compile the contract
    - `pnpm compile:hardhat`
- Prepare Program ID
    - `solana-keygen new -o target/deploy/endpoint-keypair.json --force`
    - `solana-keygen new -o target/deploy/oft-keypair.json --force`
    - `anchor keys sync`
    - change `program/src/oft/lib.rs` with new program id
```bash
endpoint: A9xGfr4F2J3NVsk9X7syKLNtKgpwaKW9xtPEmoxYb3i9
oft: EaWXNTXSauuEWUyzBATCCbLfscNAgxS4bfQHnTGKeFXY
```
- build Solana OFT program
    - `anchor build`
    - don’t add -v for verified build as its too slow
- deploy Solana OFT program
    - `solana program deploy --program-id target/deploy/oft-keypair.json target/deploy/oft.so -u devnet`
- Create Solana OFT
    - `pnpm hardhat lz:oft:solana:create --eid 40168 --program-id EaWXNTXSauuEWUyzBATCCbLfscNAgxS4bfQHnTGKeFXY --only-oft-store true --name WOO --symbol WOO`
    - open `./deployments/solana-testnet/OFT.json` , find OFTStore = `DKrx8GxUMBwJ1dDDpiJkdBvx31T7fxM3sqzCf2FPsNg9`
    - change `layerzero.config.ts` with `DKrx8GxUMBwJ1dDDpiJkdBvx31T7fxM3sqzCf2FPsNg9`
- deploy the contract to Ethereum Sepolia
    - first create a test WOO ERC20 token on Sepolia using https://coinfactory.app/, here is the contract: https://sepolia.etherscan.io/token/0xDd481A5FBa15E777fd73493E505C057fe16b0955#readContract
    - set the contract address as `wooTokenOnSepolia` in `deploy/WooTokenOFTAdapter.ts`
    - `npx hardhat lz:deploy`
    - tag use `WooTokenOFTAdapter`
    - https://sepolia.etherscan.io/token/0xd73E4a225f973EA0615EfeB2a23aAb33Ac5759F9#code
- initialize the OFT
    - `npx hardhat lz:oapp:init:solana --oapp-config layerzero.config.ts --solana-secret-key <SOLANA_PRIVATE_KEY> --solana-program-id EaWXNTXSauuEWUyzBATCCbLfscNAgxS4bfQHnTGKeFXY`
- wire the config
    - `npx hardhat lz:oapp:wire --oapp-config layerzero.config.ts --solana-secret-key <SOLANA_PRIVATE_KEY> --solana-program-id EaWXNTXSauuEWUyzBATCCbLfscNAgxS4bfQHnTGKeFXY`

## Test Sending

- Send from Sepolia to Solana devnet
    - `npx hardhat --network sepolia send --dst-eid 40168 --amount 1000000000000000000 --to 3R1QAWUwPNRunitwENqieRv3SS1BTpPTvhemJEuCeSZA`
    - Sepolia: https://sepolia.etherscan.io/tx/0x30bf12fe3db14ba74f7e421fe3f1ec16145b665db26637f0e24fa4d1d3e5e627
    - LayerZero: https://testnet.layerzeroscan.com/tx/0x30bf12fe3db14ba74f7e421fe3f1ec16145b665db26637f0e24fa4d1d3e5e627
    - Solana: https://explorer.solana.com/tx/59XVQvoSYoQ7T6NrXLrSAErzYQ8e9nQj8DWeGyKrHLPvmi1di1iqBoQwZZ2TggVYt6LHms4U7EiyhgrGa63Gy5tu?cluster=devnet

- Send from Solana devnet to Sepolia
    - open `./deployments/solana-testnet/OFT.json` to find out the mint and escrow address
    - `npx hardhat lz:oft:solana:send --amount 1000000000 --from-eid 40168 --to 0xc031C368b51c28266396273b0C6ce2489b00969d --to-eid 40161 --mint HzY4dNBHd2mjwsDV7mT22uJ9Eag2tX26rCW3YvEdEPrg --program-id EaWXNTXSauuEWUyzBATCCbLfscNAgxS4bfQHnTGKeFXY --escrow B6yC6NLN2WpSU5fJnCXC6p32Uzz2u9h7RKnnochaVd9w`
    - Solana: https://explorer.solana.com/tx/5pF9FnzjiXzVQfNXBAwENBMgZVZkyWUQTmkfn4XuXvGDZhBWYm3SRMGQJCetoHWFE7DgvYhXfS1xfyrUVVZfWAfy?cluster=devnet
    - LayerZero: https://testnet.layerzeroscan.com/tx/5pF9FnzjiXzVQfNXBAwENBMgZVZkyWUQTmkfn4XuXvGDZhBWYm3SRMGQJCetoHWFE7DgvYhXfS1xfyrUVVZfWAfy
    - Sepolia: https://sepolia.etherscan.io/tx/0x1ffc9a118ef8fb9f769b8a066ea6f5e9081e5bc1743208df83bff63a5c72a109


## Production Ownership & Access Control

### EVM OFT Ownership

All EVM OFT contracts have been transferred to WOO Network treasury multisig (Gnosis Safe) addresses:

| Chain | Contract | Owner (Multisig) |
|-------|----------|-----------------|
| Ethereum | WooTokenOFTAdapter | `0x155eef9731aff5ae6cb2741f7bec0f005037acb0` |
| Linea | WooTokenOFT | `0x1354fde75b51e388e79e9b721cf6fc9773ac8ac5` |
| Base | WooTokenOFT | `0xc06e2968afd4a029d4623f9a5f534c45e5bf0bdf` |
| zkSync | WooTokenOFT | `0x91ff1c154b72004d0591868ceb98efdc4023371b` |
| Mantle | WooTokenOFT | `0x5cc24db3b7f0099d141a4bc96b4fddf9f5f3b614` |
| Sonic | WooTokenOFT | `0x3d2f54bac9eb3bdb360bc3bab6e77243377a3586` |

### EVM OFT Delegate

Chi's developer address `0xc031C368b51c28266396273b0C6ce2489b00969d` has been set as the **delegate** on all EVM chains via LayerZero EndpointV2. This allows the delegate to call `setConfig()` (e.g. DVN changes, executor config) on behalf of the OApp without requiring multisig transactions for routine config operations.

### Solana OFT Ownership

The Solana OFT program (`woo98ny1QLULqdTzpNM8PiJpwfzL5MJ9pAmLw1rfvk7`) ownership is held by Chi's developer Solana address:

| | Address |
|---|---------|
| Owner | `8ATsKQ16gNa3M9hXF7zAPvkjEREmzyhrXGHM6aKPPPDm` |
| OFT Store | `8wX49KNNCPqfMUb8F1x3XipDEfqZnsCP5dDqxaxHjLCw` |

As the owner, Chi can directly perform config operations (DVN changes, enforced options, etc.) for the Solana OFT without multisig.

---

## Debugging the error on receiver side

- https://scan-testnet.layerzero-api.com/v1/messages/tx/0x79bfff15f23ed6b309ee9f04321cb8a91f5b5515e32bb3e8396cc737620e9e03

![Xnip2024-11-25_20-11-24](https://github.com/user-attachments/assets/49971a95-c2af-4b2e-9d29-bd32d91f784f)


- you can find the error tx on Solana: https://solscan.io/tx/wqPf3tmMVd1SsqqEVN3sMChr7HZif96DgJTJxKLG4UvLBXhtrXHYB6j3XujQvALNk1xn1KKmfwoRnte9PtDXjne?cluster=devnet
- Lz endpoint receive tx: https://solscan.io/tx/4gnu9WCmZ2eN4F8ckrVMLGonM2hd1Hgnk5aWsiTd4Ntr8QJDnkcpsYfacrHmVFyGU2yLbj5wQoHutXrHftwwrd7E?cluster=devnet