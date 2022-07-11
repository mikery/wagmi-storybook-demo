import {Wallet} from "ethers";
import {chain, configureChains, createClient, WagmiConfig} from "wagmi";
import {MockConnector} from "@wagmi/core/connectors/mock";
import {publicProvider} from "wagmi/providers/public";
import {Story} from "@storybook/react";
import {wagmiClient} from "../pages/_app";


const {chains, provider, webSocketProvider} = configureChains(
    [chain.hardhat],
    [publicProvider()],
)

export const WagmiDecorator = (Story: Story) => {
    return (
        <WagmiConfig client={wagmiClient}>
            <Story/>
        </WagmiConfig>
    );
};

/**
 * A wagmi client which provides access to the given Wallet instance.
 */
export const mockWagmiClient = (wallet: Wallet) => createClient({
    autoConnect: true,
    provider,
    webSocketProvider,
    connectors: [
        new MockConnector({
            chains,
            options: {
                signer: wallet,
                chainId: 31337,
            },
        }),
    ],
});

/**
 * A storybook decorator which wraps components in a mock wagmi context.
 */
export const MockWagmiDecorator = (wallet: Wallet) => (Story: Story) => {
    return (
        <WagmiConfig client={mockWagmiClient(wallet)}>
            <Story/>
        </WagmiConfig>
    );
};
