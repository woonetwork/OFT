# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

WOO Network's LayerZero V2 OFT (Omnichain Fungible Token) deployment. Bridges the WOO token across EVM chains (Ethereum, Linea, Base, zkSync, Mantle, Sonic) and Solana using LayerZero's cross-chain messaging protocol.

## Build & Development Commands

```bash
pnpm install                    # Install dependencies
pnpm compile:hardhat            # Compile EVM contracts (Solidity 0.8.22)
pnpm compile:forge              # Compile via Foundry
anchor build                    # Build Solana programs
pnpm compile                    # All three concurrently

pnpm test:forge                 # Foundry tests
pnpm test:hardhat               # Hardhat tests
pnpm test:anchor                # Solana/Anchor tests (uses Jest)
pnpm test                       # forge + hardhat

pnpm lint                       # ESLint + Solhint
pnpm lint:fix                   # Auto-fix
```

## LayerZero Wire & Config Commands

The active config file must be named `layerzero.config.ts`. Copy from `layerzero.config.prod.ts` before running:

```bash
cp layerzero.config.prod.ts layerzero.config.ts

# EVM-only wiring (no Solana keys needed — will skip Solana connections)
npx hardhat lz:oapp:wire --oapp-config layerzero.config.ts

# Full config including Solana
npx hardhat lz:oapp:wire --oapp-config layerzero.config.ts \
  --solana-secret-key "$SOLANA_PRIVATE_KEY" \
  --solana-program-id woo98ny1QLULqdTzpNM8PiJpwfzL5MJ9pAmLw1rfvk7

# Inspect current on-chain config vs desired
npx hardhat lz:oapp:config:get --oapp-config layerzero.config.ts

# Initialize Solana OFT accounts
npx hardhat lz:oapp:init:solana --oapp-config layerzero.config.ts \
  --solana-secret-key "$SOLANA_PRIVATE_KEY" \
  --solana-program-id woo98ny1QLULqdTzpNM8PiJpwfzL5MJ9pAmLw1rfvk7
```

## Architecture

### EVM Contracts (`contracts/`)

- **WooTokenOFTAdapter.sol** — Deployed on Ethereum only. Wraps the existing WOO ERC20 token (`0x4691937a7508860F876c9c0a2a617E7d9E945D4B`) for cross-chain transfers. Extends LayerZero's `OFTAdapter`.
- **WooTokenOFT.sol** — Deployed on all other EVM chains (Linea, Base, zkSync, Mantle, Sonic). Mints/burns WOO tokens on destination chains. Extends LayerZero's `OFT`.

### Solana Program (`programs/oft/`)

Anchor-based OFT program (`woo98ny1QLULqdTzpNM8PiJpwfzL5MJ9pAmLw1rfvk7`). Key instructions: `init_oft`, `send`, `lz_receive`, `quote_send`, `set_oft_config`, `set_peer_config`.

### Config Files

- `layerzero.config.prod.ts` — Source of truth. All 7 chains, 42 bidirectional connections, 3/3 DVN security.
- `layerzero.config.dev.ts` — Testnet config (Sepolia + Solana devnet).
- `layerzero.config.ts` — Active config file read by wire/config tasks. Not committed; copy from prod or dev before use.

### Custom Hardhat Tasks (`tasks/`)

- `tasks/common/wire.ts` — Extends LayerZero's `lz:oapp:wire` with Solana signer support (`--solana-secret-key`, `--solana-program-id`, `--multisig-key`).
- `tasks/common/config.get.ts` — Extends `lz:oapp:config:get` for cross-chain config inspection.
- `tasks/evm/send.ts` — Send tokens from EVM (`--dst-eid`, `--amount`, `--to`).
- `tasks/solana/` — Solana-specific tasks: `createOFT`, `sendOFT`, `setAuthority`, rate limits, multisig.

### Deploy Scripts (`deploy/`)

Uses `hardhat-deploy`. Tags: `WooTokenOFT` (destination chains), `WooTokenOFTAdapter` (Ethereum).

## DVN Security

Production config uses 3/3 required DVNs on all connections: **LayerZero Labs + Nethermind + Horizen**. DVN addresses differ per chain — always verify against the [LayerZero metadata API](https://metadata.layerzero-api.com/v1/metadata) when adding new chains. Be careful not to use "lzRead" DVN variants for standard OFT messaging.

## Network Configuration

Networks are defined in `hardhat.config.ts` with LayerZero `EndpointId` mappings. Environment variables `PRIVATE_KEY` (EVM) and `SOLANA_PRIVATE_KEY` (Solana) are required in `.env` for transactions.

EVM OFT contracts are owned by Gnosis Safe multisigs but have a delegate (`0xc031C368b51c28266396273b0C6ce2489b00969d`) set on EndpointV2, allowing direct `setConfig()` calls without multisig for routine config operations.
