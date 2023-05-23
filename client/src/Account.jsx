import {secp256k1} from "ethereum-cryptography/secp256k1";
import {toHex} from 'ethereum-cryptography/utils'
import axiosInstance from "./axiosInstance.js";
import {keccak256} from "ethereum-cryptography/keccak";

function Account({privateKey, publicKey, address, dispatch}) {

    async function createAccount(e) {

        e.preventDefault()

        const privateKey = secp256k1.utils.randomPrivateKey()
        const publicKey = secp256k1.getPublicKey(privateKey);
        const address = toHex(keccak256(publicKey.slice(1)).slice(-20))

        try {

            const hexPublicKey = toHex(publicKey);

            const {
                data: {balance},
            } = await axiosInstance.post(`wallets`, {address: hexPublicKey});

            dispatch({
                type: "all",
                payload: {
                    privateKey: toHex(privateKey),
                    publicKey: hexPublicKey,
                    address: address,
                    balance
                }
            })
        } catch (ex) {
            alert(ex.response.data.message);
        }

    }

    return <>
        <div className="container">

            <h1>Create your wallet</h1>

            <input type="submit" className="button" value="Create your keys" onClick={createAccount}/>

            {
                privateKey && <div className="account">
                    <label>
                        Private Key
                        <input value={privateKey} disabled/>
                    </label>

                    <label>
                        Public Key
                        <input value={publicKey} disabled/>
                    </label>

                    <label>
                        Address
                        <input value={address} disabled/>
                    </label>
                </div>
            }

        </div>
    </>
}

export default Account;
