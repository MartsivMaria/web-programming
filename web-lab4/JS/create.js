const slideValue = document.getElementById("slide-value");
const inputSlider = document.getElementById("power");
inputSlider.oninput = (() => {
    let value = inputSlider.value;
    slideValue.textContent = value;
    slideValue.style.left = (value / 100) + "%";
    slideValue.classList.add("show");
    });
    inputSlider.onblur = (() => {
        slideValue.classList.remove("show");
    });

document.addEventListener('DOMContentLoaded', () => {
    loadCards(); // Завантажуємо картки під час завантаження сторінки
});

const submitButton = document.getElementById("submit");
const form = document.getElementById("form-chainsaw");
const nameInput = document.getElementById("name");
const descriptionInput = document.getElementById("description");
const powerInput = document.getElementById("power");
const engineTypeInput = document.getElementById("engine");
    
submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    if (!nameInput.value || !descriptionInput.value || !engineTypeInput.value) {
        alert('Please fill in all the fields!');
        return;
    }
    const chainsaw = {
        name: nameInput.value,
        description: descriptionInput.value,
        power: powerInput.value,
        engine_type: engineTypeInput.value
    };
    
    createCard(chainsaw);
    saveCardToStorage(chainsaw);
    form.reset();
    
});

function createCard(chainsaw) {
    const card = document.createElement('li')
    card.className = 'card';
    card.innerHTML = `
        <h3>Chainsaw Details</h3>
        <p><strong>Name:</strong> ${chainsaw.name}</p>
        <p><strong>Description:</strong> ${chainsaw.description}</p>
        <p><strong>Power:</strong> ${chainsaw.power}</p>
        <p><strong>Engine Type:</strong> ${chainsaw.engine_type}</p>
        <button class="edit-btn"><strong>Edit</strong></button>
        <button class="delete-btn"><strong>Delete</strong></button>
        `
        ;
    cardContainer.appendChild(card)
    const editBtn = card.querySelector('.edit-btn');
    editBtn.addEventListener('click', () => {
        localStorage.setItem('editingChainsaw', JSON.stringify(chainsaw));
        window.location.href = 'edit_page.html';
    });
    const deleteBtn = card.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
        cardContainer.removeChild(card);
        deleteCardFromStorage(chainsaw.name);
    });
}

function saveCardToStorage(chainsaw) {
    const chainsaws = JSON.parse(localStorage.getItem('chainsaws')) || [];
    chainsaws.push(chainsaw);
    localStorage.setItem('chainsaws', JSON.stringify(chainsaws));
}

function loadCards() {
    let chainsaws = JSON.parse(localStorage.getItem('chainsaws'));

    if (!Array.isArray(chainsaws)) {
        chainsaws = []; 
    }

    chainsaws.forEach(chainsaw => createCard(chainsaw));
}

function deleteCardFromStorage(name) {
    let chainsaws = JSON.parse(localStorage.getItem('chainsaws')) || [];
    chainsaws = chainsaws.filter(chainsaw => chainsaw.name !== name);
    localStorage.setItem('chainsaws', JSON.stringify(chainsaws));
}

