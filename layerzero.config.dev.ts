import { EndpointId } from '@layerzerolabs/lz-definitions'
import { ExecutorOptionType } from '@layerzerolabs/lz-v2-utilities'

import type { OAppOmniGraphHardhat, OmniPointHardhat } from '@layerzerolabs/toolbox-hardhat'

const sepoliaContract: OmniPointHardhat = {
    eid: EndpointId.SEPOLIA_V2_TESTNET,
    contractName: 'WooTokenOFTAdapter',
}

const solanaContract: OmniPointHardhat = {
    eid: EndpointId.SOLANA_V2_TESTNET,
    address: 'DKrx8GxUMBwJ1dDDpiJkdBvx31T7fxM3sqzCf2FPsNg9',
}

const lineaContract: OmniPointHardhat = {
    eid: EndpointId.LINEASEP_V2_TESTNET,
    contractName: 'WooTokenOFT',
}

const baseContract: OmniPointHardhat = {
    eid: EndpointId.BASESEP_V2_TESTNET,
    contractName: 'WooTokenOFT',
}

const zksyncContract: OmniPointHardhat = {
    eid: EndpointId.ZKSYNCSEP_V2_TESTNET,
    contractName: 'WooTokenOFT',
}

const mantleContract: OmniPointHardhat = {
    eid: EndpointId.MANTLESEP_V2_TESTNET,
    contractName: 'WooTokenOFT',
}

const sonicContract: OmniPointHardhat = {
    eid: EndpointId.SONIC_V2_TESTNET,
    contractName: 'WooTokenOFT',
}

const config: OAppOmniGraphHardhat = {
    contracts: [
        {
            contract: sepoliaContract,
        },
        {
            contract: solanaContract,
        },
        {
            contract: lineaContract,
        },
        {
            contract: baseContract,
        },
        {
            contract: zksyncContract,
        },
        {
            contract: mantleContract,
        },
        {
            contract: sonicContract,
        },
    ],
    connections: [
        {
            from: sepoliaContract,
            to: solanaContract,
            config: {
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 200000,
                        value: 2500000,
                    },
                    {
                        msgType: 2,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 200000,
                        value: 2500000,
                    },
                    {
                        msgType: 2,
                        optionType: ExecutorOptionType.COMPOSE,
                        index: 0,
                        gas: 0,
                        value: 0,
                    },
                ],
            },
        },
        {
            from: solanaContract,
            to: sepoliaContract,
            config: {
                sendLibrary: '7a4WjyR8VZ7yZz5XJAKm39BUGn5iT9CKcv2pmG9tdXVH',
                receiveLibraryConfig: {
                    receiveLibrary: '7a4WjyR8VZ7yZz5XJAKm39BUGn5iT9CKcv2pmG9tdXVH',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: {
                        maxMessageSize: 10000,
                        executor: 'AwrbHeCyniXaQhiJZkLhgWdUCteeWSGaSN1sTfLiY7xK',
                    },
                    ulnConfig: {
                        confirmations: BigInt(10),
                        requiredDVNs: [
                            '4VDjp6XQaxoZf5RGwiPU9NR1EXSZn2TP4ATMmiSzLfhb',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(2),
                        requiredDVNs: [
                            '4VDjp6XQaxoZf5RGwiPU9NR1EXSZn2TP4ATMmiSzLfhb',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 200000,
                    },
                    {
                        msgType: 2,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 200000,
                    },
                ],
            },
        },
        {
            from: sepoliaContract,
            to: lineaContract,
            config: {
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 150000,
                        value: 0,
                    },
                ],
            },
        },
        {
            from: lineaContract,
            to: sepoliaContract,
            config: {
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 150000,
                        value: 0,
                    },
                ],
            },
        },
        {
            from: lineaContract,
            to: solanaContract,
            config: {
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 200000,
                        value: 2500000,
                    },
                    {
                        msgType: 2,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 200000,
                        value: 2500000,
                    },
                    {
                        msgType: 2,
                        optionType: ExecutorOptionType.COMPOSE,
                        index: 0,
                        gas: 0,
                        value: 0,
                    },
                ],
            },
        },
        {
            from: solanaContract,
            to: lineaContract,
            config: {
                sendLibrary: '7a4WjyR8VZ7yZz5XJAKm39BUGn5iT9CKcv2pmG9tdXVH',
                receiveLibraryConfig: {
                    receiveLibrary: '7a4WjyR8VZ7yZz5XJAKm39BUGn5iT9CKcv2pmG9tdXVH',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: {
                        maxMessageSize: 10000,
                        executor: 'AwrbHeCyniXaQhiJZkLhgWdUCteeWSGaSN1sTfLiY7xK',
                    },
                    ulnConfig: {
                        confirmations: BigInt(10),
                        requiredDVNs: [
                            '4VDjp6XQaxoZf5RGwiPU9NR1EXSZn2TP4ATMmiSzLfhb',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(2),
                        requiredDVNs: [
                            '4VDjp6XQaxoZf5RGwiPU9NR1EXSZn2TP4ATMmiSzLfhb',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 200000,
                    },
                    {
                        msgType: 2,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 200000,
                    },
                ],
            },
        },
        {
            from: sepoliaContract,
            to: baseContract,
            config: {
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 150000,
                        value: 0,
                    },
                ],
            },
        },
        {
            from: baseContract,
            to: sepoliaContract,
            config: {
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 150000,
                        value: 0,
                    },
                ],
            },
        },
        {
            from: lineaContract,
            to: baseContract,
            config: {
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 150000,
                        value: 0,
                    },
                ],
            },
        },
        {
            from: baseContract,
            to: lineaContract,
            config: {
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 150000,
                        value: 0,
                    },
                ],
            },
        },
        {
            from: baseContract,
            to: solanaContract,
            config: {
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 200000,
                        value: 2500000,
                    },
                    {
                        msgType: 2,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 200000,
                        value: 2500000,
                    },
                    {
                        msgType: 2,
                        optionType: ExecutorOptionType.COMPOSE,
                        index: 0,
                        gas: 0,
                        value: 0,
                    },
                ],
            },
        },
        {
            from: solanaContract,
            to: baseContract,
            config: {
                sendLibrary: '7a4WjyR8VZ7yZz5XJAKm39BUGn5iT9CKcv2pmG9tdXVH',
                receiveLibraryConfig: {
                    receiveLibrary: '7a4WjyR8VZ7yZz5XJAKm39BUGn5iT9CKcv2pmG9tdXVH',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: {
                        maxMessageSize: 10000,
                        executor: 'AwrbHeCyniXaQhiJZkLhgWdUCteeWSGaSN1sTfLiY7xK',
                    },
                    ulnConfig: {
                        confirmations: BigInt(10),
                        requiredDVNs: [
                            '4VDjp6XQaxoZf5RGwiPU9NR1EXSZn2TP4ATMmiSzLfhb',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(2),
                        requiredDVNs: [
                            '4VDjp6XQaxoZf5RGwiPU9NR1EXSZn2TP4ATMmiSzLfhb',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 200000,
                    },
                    {
                        msgType: 2,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 200000,
                    },
                ],
            },
        },
        {
            from: sepoliaContract,
            to: zksyncContract,
            config: {
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 150000,
                        value: 0,
                    },
                ],
            },
        },
        {
            from: zksyncContract,
            to: sepoliaContract,
            config: {
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 150000,
                        value: 0,
                    },
                ],
            },
        },
        {
            from: lineaContract,
            to: zksyncContract,
            config: {
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 150000,
                        value: 0,
                    },
                ],
            },
        },
        {
            from: zksyncContract,
            to: lineaContract,
            config: {
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 150000,
                        value: 0,
                    },
                ],
            },
        },
        {
            from: zksyncContract,
            to: baseContract,
            config: {
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 150000,
                        value: 0,
                    },
                ],
            },
        },
        {
            from: baseContract,
            to: zksyncContract,
            config: {
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 150000,
                        value: 0,
                    },
                ],
            },
        },
        {
            from: zksyncContract,
            to: solanaContract,
            config: {
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 200000,
                        value: 2500000,
                    },
                    {
                        msgType: 2,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 200000,
                        value: 2500000,
                    },
                    {
                        msgType: 2,
                        optionType: ExecutorOptionType.COMPOSE,
                        index: 0,
                        gas: 0,
                        value: 0,
                    },
                ],
            },
        },
        {
            from: solanaContract,
            to: zksyncContract,
            config: {
                sendLibrary: '7a4WjyR8VZ7yZz5XJAKm39BUGn5iT9CKcv2pmG9tdXVH',
                receiveLibraryConfig: {
                    receiveLibrary: '7a4WjyR8VZ7yZz5XJAKm39BUGn5iT9CKcv2pmG9tdXVH',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: {
                        maxMessageSize: 10000,
                        executor: 'AwrbHeCyniXaQhiJZkLhgWdUCteeWSGaSN1sTfLiY7xK',
                    },
                    ulnConfig: {
                        confirmations: BigInt(10),
                        requiredDVNs: [
                            '4VDjp6XQaxoZf5RGwiPU9NR1EXSZn2TP4ATMmiSzLfhb',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(2),
                        requiredDVNs: [
                            '4VDjp6XQaxoZf5RGwiPU9NR1EXSZn2TP4ATMmiSzLfhb',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 200000,
                    },
                    {
                        msgType: 2,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 200000,
                    },
                ],
            },
        },
        {
            from: sepoliaContract,
            to: mantleContract,
            config: {
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 150000,
                        value: 0,
                    },
                ],
            },
        },
        {
            from: mantleContract,
            to: sepoliaContract,
            config: {
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 150000,
                        value: 0,
                    },
                ],
            },
        },
        {
            from: lineaContract,
            to: mantleContract,
            config: {
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 150000,
                        value: 0,
                    },
                ],
            },
        },
        {
            from: mantleContract,
            to: lineaContract,
            config: {
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 150000,
                        value: 0,
                    },
                ],
            },
        },
        {
            from: mantleContract,
            to: baseContract,
            config: {
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 150000,
                        value: 0,
                    },
                ],
            },
        },
        {
            from: baseContract,
            to: mantleContract,
            config: {
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 150000,
                        value: 0,
                    },
                ],
            },
        },
        {
            from: mantleContract,
            to: zksyncContract,
            config: {
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 150000,
                        value: 0,
                    },
                ],
            },
        },
        {
            from: zksyncContract,
            to: mantleContract,
            config: {
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 150000,
                        value: 0,
                    },
                ],
            },
        },
        {
            from: mantleContract,
            to: solanaContract,
            config: {
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 200000,
                        value: 2500000,
                    },
                    {
                        msgType: 2,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 200000,
                        value: 2500000,
                    },
                    {
                        msgType: 2,
                        optionType: ExecutorOptionType.COMPOSE,
                        index: 0,
                        gas: 0,
                        value: 0,
                    },
                ],
            },
        },
        {
            from: solanaContract,
            to: mantleContract,
            config: {
                sendLibrary: '7a4WjyR8VZ7yZz5XJAKm39BUGn5iT9CKcv2pmG9tdXVH',
                receiveLibraryConfig: {
                    receiveLibrary: '7a4WjyR8VZ7yZz5XJAKm39BUGn5iT9CKcv2pmG9tdXVH',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: {
                        maxMessageSize: 10000,
                        executor: 'AwrbHeCyniXaQhiJZkLhgWdUCteeWSGaSN1sTfLiY7xK',
                    },
                    ulnConfig: {
                        confirmations: BigInt(10),
                        requiredDVNs: [
                            '4VDjp6XQaxoZf5RGwiPU9NR1EXSZn2TP4ATMmiSzLfhb',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(2),
                        requiredDVNs: [
                            '4VDjp6XQaxoZf5RGwiPU9NR1EXSZn2TP4ATMmiSzLfhb',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 200000,
                    },
                    {
                        msgType: 2,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 200000,
                    },
                ],
            },
        },
        {
            from: sepoliaContract,
            to: sonicContract,
            config: {
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 150000,
                        value: 0,
                    },
                ],
            },
        },
        {
            from: sonicContract,
            to: sepoliaContract,
            config: {
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 150000,
                        value: 0,
                    },
                ],
            },
        },
        {
            from: lineaContract,
            to: sonicContract,
            config: {
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 150000,
                        value: 0,
                    },
                ],
            },
        },
        {
            from: sonicContract,
            to: lineaContract,
            config: {
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 150000,
                        value: 0,
                    },
                ],
            },
        },
        {
            from: sonicContract,
            to: baseContract,
            config: {
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 150000,
                        value: 0,
                    },
                ],
            },
        },
        {
            from: baseContract,
            to: sonicContract,
            config: {
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 150000,
                        value: 0,
                    },
                ],
            },
        },
        {
            from: sonicContract,
            to: zksyncContract,
            config: {
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 150000,
                        value: 0,
                    },
                ],
            },
        },
        {
            from: zksyncContract,
            to: sonicContract,
            config: {
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 150000,
                        value: 0,
                    },
                ],
            },
        },
        {
            from: sonicContract,
            to: mantleContract,
            config: {
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 150000,
                        value: 0,
                    },
                ],
            },
        },
        {
            from: mantleContract,
            to: sonicContract,
            config: {
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 150000,
                        value: 0,
                    },
                ],
            },
        },
        {
            from: sonicContract,
            to: solanaContract,
            config: {
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 200000,
                        value: 2500000,
                    },
                    {
                        msgType: 2,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 200000,
                        value: 2500000,
                    },
                    {
                        msgType: 2,
                        optionType: ExecutorOptionType.COMPOSE,
                        index: 0,
                        gas: 0,
                        value: 0,
                    },
                ],
            },
        },
        {
            from: solanaContract,
            to: sonicContract,
            config: {
                sendLibrary: '7a4WjyR8VZ7yZz5XJAKm39BUGn5iT9CKcv2pmG9tdXVH',
                receiveLibraryConfig: {
                    receiveLibrary: '7a4WjyR8VZ7yZz5XJAKm39BUGn5iT9CKcv2pmG9tdXVH',
                    gracePeriod: BigInt(0),
                },
                sendConfig: {
                    executorConfig: {
                        maxMessageSize: 10000,
                        executor: 'AwrbHeCyniXaQhiJZkLhgWdUCteeWSGaSN1sTfLiY7xK',
                    },
                    ulnConfig: {
                        confirmations: BigInt(10),
                        requiredDVNs: [
                            '4VDjp6XQaxoZf5RGwiPU9NR1EXSZn2TP4ATMmiSzLfhb',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                receiveConfig: {
                    ulnConfig: {
                        confirmations: BigInt(2),
                        requiredDVNs: [
                            '4VDjp6XQaxoZf5RGwiPU9NR1EXSZn2TP4ATMmiSzLfhb',
                        ],
                        optionalDVNs: [],
                        optionalDVNThreshold: 0,
                    },
                },
                enforcedOptions: [
                    {
                        msgType: 1,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 200000,
                    },
                    {
                        msgType: 2,
                        optionType: ExecutorOptionType.LZ_RECEIVE,
                        gas: 200000,
                    },
                ],
            },
        },
    ],
}

export default config
