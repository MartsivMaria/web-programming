const priceSortCheckbox = document.getElementById("sort_checkbox_input");
const countButton = document.getElementById("count-btn");
const searchButton = document.getElementById("search-btn");
const searchField = document.getElementById("find-item");
const clearButton = document.getElementById("clear-btn"); 
let chainsawCards = [];
let initialOrder = [];
let chainsawPrices = [];

async function loadChainsaws() {
    try {
        const response = await fetch('http://localhost:3000/chainsaws');
        const chainsaws = await response.json();

        let container = document.getElementById("items-container");
        container.innerHTML = '';

        chainsawCards = chainsaws.map((chainsaw) => {
            const card = createChainsawCard(chainsaw);
            container.appendChild(card);
            return card;
        });

        initialOrder = Array.from(chainsawCards);

        chainsawPrices = chainsawCards.map(card => {
            return {
                element: card,
                price: parseInt(card.querySelector(".price-chainsaw").textContent.replace("грн", ""))
            };
        });
    } catch (error) {
        console.error('Error loading chainsaws:', error);
    }
}

function createChainsawCard(chainsaw) {
    const card = document.createElement('li');
    card.classList.add('chainsaw-container');
    card.innerHTML = `
        <img class="chainsaw-img" src=${chainsaw.image} alt="">
        <h1 class="name-chainsaw">${chainsaw.name}</h1>
        <p class="description-chainsaw">${chainsaw.description}</p>
        <p class="price-chainsaw">${chainsaw.price} грн</p>
    `;
    return card;
}

async function arrangeCardsByPrice(isDescending) {
    try {
        const response = await fetch('http://localhost:3000/chainsaws');
        const chainsaws = await response.json();

        chainsawPrices = chainsaws.map(chainsaw => {
            return {
                element: createChainsawCard(chainsaw),
                price: parseInt(chainsaw.price)
            };
        });

        const sortedPrices = chainsawPrices.sort((a, b) => {
            if (isDescending) {
                return a.price - b.price;
            }
        });

        const container = document.getElementById("items-container");
        container.innerHTML = '';

        sortedPrices.forEach(item => {
            container.appendChild(item.element);
        });
    } catch (error) {
        console.error('Error arranging cards by price:', error);
    }
}

priceSortCheckbox.addEventListener("change", (event) => {
    const isDescending = event.target.checked;
    arrangeCardsByPrice(isDescending);
});

async function searchChainsawCards() {
    const query = searchField.value.toLowerCase();
    try {
        const response = await fetch(`http://localhost:3000/chainsaws/search?q=${query}`);
        const matchedChainsaws = await response.json();

        displayChainsaws(matchedChainsaws); 
    } catch (error) {
        console.error('Error searching chainsaws:', error);
    }
}

function displayChainsaws(chainsaws) {
    const container = document.getElementById("items-container");
    container.innerHTML = '';

    if (chainsaws.length > 0) {
        chainsaws.forEach(chainsaw => {
            const card = createChainsawCard(chainsaw);
            container.appendChild(card);
        });
    } else {
        container.innerHTML = '<p>Бензопилу не знайдено.</p>';
    }
}


async function showTotalPrice() {
    try {
        const response = await fetch('http://localhost:3000/chainsaws');

        const chainsaws = await response.json();
        const totalPrice = chainsaws.reduce((sum, chainsaw) => {
            return sum + chainsaw.price;
        }, 0);

        let totalSumElement = document.getElementById("sumprice");
        totalSumElement.innerHTML = `${totalPrice} грн`;
    } catch (error) {
        console.error('Error calculating total price:', error);
    }
}

async function clearTotalPrice() {
    try {
        const response = await fetch('http://localhost:3000/chainsaws/clearTotal');

        const { totalPrice } = await response.json();
        let totalSumElement = document.getElementById("sumprice");
        totalSumElement.innerHTML = `${totalPrice} грн`;
    } catch (error) {
        console.error('Error clearing total price:', error);
    }
}


countButton.addEventListener("click", (event) => {
    event.preventDefault();
    showTotalPrice();
});

clearButton.addEventListener("click", (event) => {
    event.preventDefault();
    clearTotalPrice()
});

searchButton.addEventListener("click", (event) => {
    event.preventDefault();
    searchChainsawCards();
});

window.addEventListener("DOMContentLoaded", loadChainsaws);
