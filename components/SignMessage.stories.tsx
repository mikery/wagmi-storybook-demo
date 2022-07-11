import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import SignMessage from "./SignMessage";
import {MockWagmiDecorator, WagmiDecorator} from "../.storybook/decorators";
import {Wallet} from "ethers";
import {userEvent, within, waitFor} from "@storybook/testing-library";
import {expect} from "@storybook/jest";

// 👇 Components within this story will act as though they are connected to this wallet
const demoWallet = new Wallet("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80")

export default {
    title: "Sign typed data",
    component: SignMessage,
    decorators: [MockWagmiDecorator(demoWallet)]
} as ComponentMeta<typeof SignMessage>;

const Template: ComponentStory<typeof SignMessage> = (args) => <SignMessage/>;


export const Demo = Template.bind({});
Demo.play = async ({canvasElement}) => {
    // 👇 Start querying the component from its root element
    const canvas = within(canvasElement);

    // 👇 Wait until the wallet is connected and signing button is enabled
    await waitFor(async () =>
        expect(
            await canvas.findByRole("button", {name: "Sign typed data"})
        ).not.toHaveAttribute("disabled")
    )

    // 👇 Simulate interactions with the component
    await userEvent.click(await canvas.findByRole("button", {name: "Sign typed data"}));
    // 👇 Assert DOM structure
    await expect(
        await canvas.findByText(
            `Signer: ${demoWallet.address}`
        )
    ).toBeInTheDocument();
}