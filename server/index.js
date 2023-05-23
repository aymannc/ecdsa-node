const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

const {secp256k1} = require("ethereum-cryptography/secp256k1");
const {keccak256} = require("ethereum-cryptography/keccak")
const {utf8ToBytes} = require("ethereum-cryptography/utils")

app.use(cors());
app.use(express.json());

const balancesByAccountAddress = {};

app.get("/wallets/:address/balance", (req, res) => {

    console.log(balancesByAccountAddress)
    const {address} = req.params;
    const balance = balancesByAccountAddress[address] || 0;
    res.send({balance});
});

app.post("/transfer", (req, res) => {

    const {sender, recipient, amount, signature} = req.body;

    const msgHash = keccak256(utf8ToBytes(amount.toString()));

    const signatureValid = secp256k1.verify(signature, msgHash, sender);

    if (!signatureValid)
        return res.status(401).send({message: "Transaction signature invalide!"});

    setInitialBalance(sender);
    setInitialBalance(recipient);

    if (balancesByAccountAddress[sender] < amount) {
        res.status(400).send({message: "Not enough funds!"});
    } else {
        balancesByAccountAddress[sender] -= amount;
        balancesByAccountAddress[recipient] += amount;
        res.send({balance: balancesByAccountAddress[sender]});
    }
});

app.post("/wallets", (req, res) => {

    const {address} = req.body;

    setInitialBalance(address);

    console.log(req.body)

    res.send({balance: balancesByAccountAddress[address]});

});

app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
    if (!balancesByAccountAddress[address]) {
        balancesByAccountAddress[address] = 100;
    }
}
