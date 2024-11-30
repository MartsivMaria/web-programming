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


const submitButton = document.getElementById("submit");
const form = document.getElementById("form-chainsaw");
const nameInput = document.getElementById("name");
const descriptionInput = document.getElementById("description");
const powerInput = document.getElementById("power");
const engineTypeInput = document.getElementById("engine");

submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    const chainsaw = {
        name: nameInput.value.trim(),
        description: descriptionInput.value.trim(),
        power: powerInput.value.trim(),
        engineType: engineTypeInput.value.trim(),
    };

    fetch("http://localhost:3000/api/createchainsaw", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(chainsaw),
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Failed to add chainsaw.");
        }
    })
    .then((data) => {
        alert("Chainsaw added successfully!");
        form.reset();
        fetchChainsaws();
    })
    .catch((error) => {
        console.error("Error:", error);
        alert("There was an issue adding the chainsaw.");
    });
});

function fetchChainsaws() {
    fetch("http://localhost:3000/api/createchainsaws")
        .then(response => response.json())
        .then(data => {
            renderChainsaws(data);
        })
        .catch(error => {
            console.error("Error fetching chainsaws:", error);
        });
}

function renderChainsaws(chainsaws) {
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.innerHTML = '';

    chainsaws.forEach(chainsaw => {
        const card = document.createElement('li');
        card.className = 'card';
        card.innerHTML = `
            <h3>Chainsaw Details</h3>
            <p><strong>Name:</strong> ${chainsaw.name}</p>
            <p><strong>Description:</strong> ${chainsaw.description}</p>
            <p><strong>Power:</strong> ${chainsaw.power}</p>
            <p><strong>Engine Type:</strong> ${chainsaw.engineType}</p>
            <button class="edit-btn"><a href='http://127.0.0.1:5501/api/html/edit_page.html'><strong>Edit</strong></a></button>
            <button class="delete-btn"><strong>Delete</strong></button>
        `;
        cardContainer.appendChild(card);

        const editBtn = card.querySelector('.edit-btn');
            editBtn.addEventListener('click', () => {
                window.location.href = `edit_page.html?id=${chainsaw._id}`;
            });

        const deleteBtn = card.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            fetch(`http://localhost:3000/api/createchainsaw/${chainsaw._id}`, {
                method: 'DELETE',
            })
            .then(() => {
                fetchChainsaws();
            })
            .catch((error) => {
                console.error("Error deleting chainsaw:", error);
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', fetchChainsaws);
