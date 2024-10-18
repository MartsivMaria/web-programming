const priceSortCheckbox = document.getElementById("sort_checkbox_input");
const countButton = document.getElementById("count-btn");
const SearchButton = document.getElementById("search-btn");
const chainsawContainer = document.getElementsByClassName("chainsaw");
const searchField = document.getElementById("find-item");
const clearButton = document.getElementById("clear-btn"); 

let chainsawCards = document.querySelectorAll(".chainsaw-container");

let initialOrder = Array.from(chainsawCards);

let chainsawPrices = Array.from(chainsawCards).map(card => {
    return {
      element: card,
      price: parseInt(card.querySelector(".price-chainsaw").textContent.replace("грн", ""))
    };
  });

function arrangeCardsByPrice(isDescending = true) {
    if (isDescending) {
        chainsawPrices.sort((a, b) => a.price - b.price);
    } else {
        chainsawPrices = initialOrder.map(card => {
        return {
          element: card,
          price: parseInt(card.querySelector(".price-chainsaw").textContent.replace("грн", ""))
        };
      });
    }

    let container = document.getElementById("items-container");
    container.innerHTML = '';
    chainsawPrices.forEach(cardObj => {
        container.appendChild(cardObj.element);
    });
}

priceSortCheckbox.addEventListener("change", (event) => {
    const isDescending = event.target.checked;
    arrangeCardsByPrice(isDescending);
});

function searchChainsawCards() {
    const query = searchField.value.toLowerCase();
    
    let matchedCards = Array.from(chainsawCards).filter(card => {
        const title = card.querySelector("h1").textContent.toLowerCase();
        return title.includes(query);
    });

    chainsawCards.forEach(card => card.style.display = "none");
    matchedCards.forEach(card => card.style.display = "block");
}

SearchButton.addEventListener("click", (event) => {
    event.preventDefault();
    searchChainsawCards();
});

function computeVisibleTotalPrice() {
    let total = chainsawPrices.reduce((sum, cardObj) => {
        if (cardObj.element.style.display !== "none") {
            return sum + cardObj.price;
        }
        return sum;
    }, 0);
    return total;
}

function showTotalPrice() {
  let totalPrice = computeVisibleTotalPrice();
  let totalSumElement = document.getElementById("sumprice");
  totalSumElement.textContent = `${totalPrice}грн`;
}

countButton.addEventListener("click", (event) => {
    event.preventDefault();
    showTotalPrice();
});

clearButton.addEventListener("click", (event) => {
    event.preventDefault();
    let totalSumElement = document.getElementById("sumprice");
    totalSumElement.innerHTML = "0";
});