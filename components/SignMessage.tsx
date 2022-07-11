import {useEffect, useState} from "react";
import {useAccount, useSignTypedData} from "wagmi";
import {verifyTypedData} from "ethers/lib/utils";
import {Button} from "antd";

// Source: https://docs.ethers.io/v5/api/signer/#Signer-signTypedData
const domain = {
  name: 'Ether Mail',
  version: '1',
  chainId: 1,
  verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
}

// The named list of all type definitions
const types = {
  Person: [
    { name: 'name', type: 'string' },
    { name: 'wallet', type: 'address' },
  ],
  Mail: [
    { name: 'from', type: 'Person' },
    { name: 'to', type: 'Person' },
    { name: 'contents', type: 'string' },
  ],
}

const value = {
  from: {
    name: 'Cow',
    wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
  },
  to: {
    name: 'Bob',
    wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
  },
  contents: 'Hello, Bob!',
}

export default function SignMessage() {
  const [signerAddress, setSignerAddress] = useState<string>()
  const {address, connector} = useAccount()
  const { data: signature, isError, error, isLoading, isSuccess, signTypedData } =
    useSignTypedData({
      domain,
      types,
      value,
    })
  useEffect(() => {
    if (!signature) return
    setSignerAddress(verifyTypedData(domain, types, value, signature))
  }, [signature])

  if (!address) return <div>Wallet not connected</div>
  if (!connector) return <div>Loading...</div>

  return (
    <div>
      <Button disabled={!connector || isLoading} onClick={() => signTypedData()}>
        Sign typed data
      </Button>
      {isSuccess && <div>Signature: {signature?.slice(0,12)}...</div>}
      {signerAddress && <div>Signer: {signerAddress}</div>}
      {isError && <div>{error?.message}</div>}
    </div>
  )
}