import axiosInstance from "./axiosInstance.js";
import {useState} from "react";

function Wallet({initialAddress, initialBalance}) {

    const [balance, setBalance] = useState(initialBalance);
    const [address, setAddress] = useState(initialAddress ?? "");

    async function onChange(evt) {

        const onChangeAddress = evt.target.value;

        setAddress(onChangeAddress)

        if (onChangeAddress) {

            const {
                data: {balance},
            } = await axiosInstance.get(`wallets/${onChangeAddress}/balance`);

            setBalance(balance)

        }
    }

    return (
        <div className="container">

            <h1>Your Wallet</h1>

            <label>
                Wallet Address
                <input placeholder="Type an address, for example: 0x1" value={address} onChange={onChange}></input>
            </label>

            <div className="balance">Balance: {balance}</div>

        </div>
    );
}

export default Wallet;
