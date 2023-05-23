import {useState} from "react";
import {secp256k1} from "ethereum-cryptography/secp256k1";
import { utf8ToBytes} from "ethereum-cryptography/utils";
import {keccak256} from "ethereum-cryptography/keccak";


function Signature({privateKey}) {

    const [message, setMessage] = useState(undefined);
    const [signature, setSignature] = useState(undefined);

    const setValue = (setter) => (evt) => setter(evt.target.value);

    async function sign(evt) {

        evt.preventDefault();

        if (message) {

            const messageHash = keccak256(utf8ToBytes(message))

            const signature = secp256k1.sign(messageHash, privateKey)

           setSignature(signature.toCompactHex())

        }
    }

    const disabled = message === undefined;

    return <>
        <form className="container transfer" onSubmit={sign}>
            <h1>Sign Message</h1>

            {privateKey && <>
                <label>
                    Message
                    <input
                        placeholder="Message"
                        value={message}
                        onChange={setValue(setMessage)}
                    ></input>
                </label>

                <label>
                    Signature
                    <textarea
                        value={signature}
                        disabled
                        rows={4}
                    ></textarea>
                </label>

                <input type="submit" className="button" value="Sign" disabled={disabled}
                       style={{cursor: disabled ? "not-allowed" : "pointer"}}/>
            </>}


        </form>
    </>
}

export default Signature;
