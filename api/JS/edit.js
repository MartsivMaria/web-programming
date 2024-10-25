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

document.addEventListener('DOMContentLoaded', async () => {
    const nameInput = document.getElementById('name');
    const descriptionInput = document.getElementById('description');
    const powerInput = document.getElementById('power');
    const engineTypeInput = document.getElementById('engine');
    const editButton = document.getElementById('edit');
    const chainsawId = new URLSearchParams(window.location.search).get('id');

    if (chainsawId) {
        const response = await fetch(`/api/createchainsaw/${chainsawId}`);
        const chainsaw = await response.json();

        if (chainsaw) {
            nameInput.value = chainsaw.name;
            descriptionInput.value = chainsaw.description;
            powerInput.value = chainsaw.power;
            engineTypeInput.value = chainsaw.engineType;
        }
    }

    editButton.addEventListener('click', async (event) => {
        event.preventDefault();
        if (!nameInput.value || !descriptionInput.value || !engineTypeInput.value) {
            alert('Please fill in all the fields!');
            return;
        }

        const updatedChainsaw = {
            name: nameInput.value,
            description: descriptionInput.value,
            power: powerInput.value,
            engineType: engineTypeInput.value
        };

        await fetch(`/api/createchainsaw/${chainsawId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedChainsaw)
        });

        window.location.href = 'create_page.html';
    });
});
