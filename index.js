const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));

app.post("/ussd", (req, res) => {
    const { text } = req.body;

    let response = "";

    if (text === "") {
        response = `CON Welcome to LoanGiver 💰
1. Apply Loan
2. Check Status
3. Help`;
    }

    else if (text === "1") {
        response = `CON Enter loan amount`;
    }

    else if (text.startsWith("1*") && text.split("*").length === 2) {
        response = `CON Enter repayment days`;
    }

    else if (text.split("*").length === 3) {
        const parts = text.split("*");
        const amount = parts[1];
        const days = parts[2];

        let status = amount <= 5000 ? "APPROVED ✔️" : "REJECTED ❌";

        response = `END Loan Result
Amount: KES ${amount}
Days: ${days}
Status: ${status}
STK coming soon 💳`;
    }

    else if (text === "2") {
        response = `END No active loan found`;
    }

    else if (text === "3") {
        response = `END LoanGiver Help:
1. Apply loan
2. Check status
3. Help`;
    }

    else {
        response = `END Invalid option`;
    }

    res.send(response);
});

app.get("/", (req, res) => {
    res.send("LoanGiver USSD is running ✔️");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("USSD running on port " + PORT);
});