const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));

app.post("/ussd", (req, res) => {
    let { text, phoneNumber } = req.body;

    let response = "";

    // 1. MAIN MENU
    if (text === "") {
        response = `CON Welcome 👊🏾
1. Buy Item
2. Check Balance`;
    }

    // 2. BUY ITEM
    else if (text === "1") {
        response = `CON Enter amount`;
    }

    // 3. ENTER AMOUNT
    else if (text.startsWith("1*") && text.split("*").length === 2) {
        let amount = text.split("*")[1];

        response = `CON Confirm Payment
1. Pay KES ${amount}
2. Cancel`;
    }

    // 4. CONFIRM PAYMENT
    else if (text.includes("*1")) {
        let amount = text.split("*")[1];

        response = `END Payment request received for KES ${amount} 👍`;
    }

    // 5. CANCEL
    else if (text.includes("*2")) {
        response = `END Transaction cancelled`;
    }

    // 6. CHECK BALANCE
    else if (text === "2") {
        response = `END Your balance is KES 0`;
    }

    else {
        response = `END Invalid option`;
    }

    res.send(response);
});

app.listen(3000, () => {
    console.log("USSD running on port 3000");
});