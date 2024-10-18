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
    const nameInput = document.getElementById('name');
    const descriptionInput = document.getElementById('description');
    const powerInput = document.getElementById('power');
    const engineTypeInput = document.getElementById('engine');
    const editButton = document.getElementById('edit');

    const chainsaw = JSON.parse(localStorage.getItem('editingChainsaw'));

    if (chainsaw) {
        nameInput.value = chainsaw.name;
        descriptionInput.value = chainsaw.description;
        powerInput.value = chainsaw.power;
        engineTypeInput.value = chainsaw.engine_type;
    }

editButton.addEventListener('click', (event) => {
    event.preventDefault();
    if (!nameInput.value || !descriptionInput.value || !engineTypeInput.value) {
        alert('Please fill in all the fields!');
        return;
    }

    chainsaw.name = nameInput.value;
    chainsaw.description = descriptionInput.value;
    chainsaw.power = powerInput.value;
    chainsaw.engine_type = engineTypeInput.value;

    const chainsaws = JSON.parse(localStorage.getItem('chainsaws')) || [];
    let updatedChainsaws = [];
    chainsaws.forEach(currentChainsaw => {
        if (currentChainsaw.name === chainsaw.name) {
            updatedChainsaws.push(chainsaw);
        } else {
            updatedChainsaws.push(currentChainsaw); 
        }   
    });
    localStorage.setItem('chainsaws', JSON.stringify(updatedChainsaws));
    window.location.href = 'create_page.html';
    });
});