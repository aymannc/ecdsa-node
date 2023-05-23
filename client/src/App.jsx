import Wallet from "./Wallet";
import Transfer from "./Transfer";
import Account from "./Account";
import "./App.scss";
import {useReducer} from "react";
import Signature from "./Signature.jsx";

function accountReducer(state, action) {

    switch (action.type) {
        case 'privateKey' :
            return {...state, privateKey: action.payload}
        case 'publicKey' :
            return {...state, publicKey: action.payload}
        case 'address' :
            return {...state, address: action.payload}
        case 'balance' :
            return {...state, balance: action.payload}
        case 'all':
            return {...state, ...action.payload}
    }
}

function App() {

    const [account, dispatch] = useReducer(accountReducer, {
        privateKey: undefined,
        publicKey: undefined,
        address: undefined,
        balance: undefined
    });

    return <>
        <div className="row">

            <Account privateKey={account?.privateKey} publicKey={account?.publicKey} address={account?.address}
                     dispatch={dispatch}/>

            <Signature privateKey={account?.privateKey}/>
        </div>

        <div className="row">

            <Wallet initialAddress={account?.publicKey} initialBalance={account?.balance} dispatch={dispatch}/>

            <Transfer address={account?.publicKey} dispatch={dispatch}/>

        </div>

    </>;
}

export default App;
