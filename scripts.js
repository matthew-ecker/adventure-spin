const creditBalance = document.querySelector("#creditBalance");
const reel1Strip = document.querySelector("#reel1Strip");
const reel2Strip = document.querySelector("#reel2Strip");
const reel3Strip = document.querySelector("#reel3Strip");
const betAmount = document.querySelector("#betAmount");
const spinButton = document.querySelector("#spinButton");
const resetButton = document.querySelector("#resetButton");
const message = document.querySelector("#message");

const symbols = [
    { name: "BMO", image: "img/bmo.png" },
    { name: "Finn", image: "img/finn.png" },
    { name: "Jake", image: "img/jake.png" },
    { name: "Ice King", image: "img/king.png" },
    { name: "Marceline", image: "img/marc.png" }
];

let credits = 1000;

const payouts = {
    Finn: 50,
    Jake: 25,
    Marceline: 15,
    "Ice King": 8,
    BMO: 5
};

function showSymbol(reelStrip, symbol) {
    const img = document.createElement("img");
    img.src = symbol.image;
    img.alt = symbol.name;

    reelStrip.innerHTML = "";
    reelStrip.appendChild(img);
}

showSymbol(reel1Strip, symbols[0]);
showSymbol(reel2Strip, symbols[1]);
showSymbol(reel3Strip, symbols[2]);

spinButton.addEventListener("click", function() {
    const bet = Number(betAmount.value);

    if (!Number.isInteger(bet) || bet < 1) {
        message.textContent = "Enter a valid bet.";
        return;
    }

    if (bet > credits) {
        message.textContent = "Not enough money!";
        return;
    }

    credits -= bet;

    const symbol1 = symbols[Math.floor(Math.random() * symbols.length)];
    const symbol2 = symbols[Math.floor(Math.random() * symbols.length)];
    const symbol3 = symbols[Math.floor(Math.random() * symbols.length)];

    showSymbol(reel1Strip, symbol1);
    showSymbol(reel2Strip, symbol2);
    showSymbol(reel3Strip, symbol3);

    if (symbol1.name === symbol2.name && symbol2.name === symbol3.name) {
        const winnings = bet * payouts[symbol1.name];
        credits += winnings;

        message.textContent = "Three " + symbol1.name + 
            "! You won " + winnings + " dollars! ";
    } else {
        message.textContent = "No match! You lost " + bet + " dollars.";
    }

    creditBalance.textContent = credits + "$";
});

resetButton.addEventListener("click", function() {
    credits = 1000;
    creditBalance.textContent = credits + "$";
    betAmount.value = "";
    message.textContent = "Game reset!";

    showSymbol(reel1Strip, symbols[0]);
    showSymbol(reel2Strip, symbols[1]);
    showSymbol(reel3Strip, symbols[2]);
});