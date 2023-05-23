import {useState} from "react";
import axiosInstance from "./axiosInstance.js";

function Transfer({address, setBalance}) {

    const [sendAmount, setSendAmount] = useState("");

    const [recipient, setRecipient] = useState("");

    const [signature, setSignature] = useState(undefined);

    const disabled = sendAmount === undefined || recipient === undefined || signature === undefined

    const setValue = (setter) => (evt) => setter(evt.target.value);

    async function transfer(evt) {
        evt.preventDefault();

        if (sendAmount && signature && address) {

            try {
                const {
                    data: {balance},
                } = await axiosInstance.post(`transfer`, {
                    sender: address,
                    amount: parseInt(sendAmount),
                    recipient,
                    signature
                });
                setBalance(balance);
            } catch (ex) {
                alert(ex.response.data.message);
            }

        }
    }

    return (
        <form className="container transfer" onSubmit={transfer}>
            <h1>Send Transaction</h1>

            <label>
                Recipient
                <input
                    placeholder=" Type an address, for example: 0x2"
                    value={recipient}
                    onChange={setValue(setRecipient)}
                ></input>
            </label>

            <label>
                Send Amount
                <input
                    type="number"
                    placeholder="1, 2, 3..."
                    value={sendAmount}
                    onChange={setValue(setSendAmount)}
                ></input>
            </label>


            <label>
                Signature
                <textarea
                    rows={4}
                    value={signature}
                    onChange={setValue(setSignature)}
                ></textarea>
            </label>

            <input type="submit" className="button" value="Transfer" disabled={disabled}
                   style={{cursor: disabled ? "not-allowed" : "pointer"}}/>

        </form>
    )
        ;
}

export default Transfer;
