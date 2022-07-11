A quick demonstration of how Storybook decorators can be combined with a mocked [wagmi](https://wagmi.sh/) client to facilitate automated [interaction testing](https://storybook.js.org/docs/react/writing-tests/interaction-testing) for web3-enabled components.

Created with [RainbowKit](https://github.com/rainbow-me/rainbowkit) 🌈 🧰

tl;dr - 👀 `./storybook/decorators.tsx` and `./components/SignMessage.stories.tsx`

# Running the demo

- run `yarn install && yarn dev`, then open http://localhost:3000
- click Connect Wallet, connect your wallet, then click `Sign Typed Data`
- sign the message and you will see the signature and recovered signer address (i.e. your connected wallet)
- terminate `yarn dev`, run `yarn storybook`, then open http://localhost:6006 and navigate to the Sign Typed Data demo story
- open the Interactions tab, and the test framework will automatically click the button to sign the typed data
  - this happens very quickly, so it looks as though the page loads with the signature filled. You can click on each step of the interaction to see how the component appeared at that point in the test
- the data is signed using a wallet which is created in the test and passed into the wagmi client
