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

    const chainsawId = new URLSearchParams(window.location.search).get('id'); 

    if (chainsawId) {
        fetch(`http://localhost:3000/api/createchainsaw/${chainsawId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch chainsaw data.');
                }
                return response.json();
            })
            .then(chainsaw => {
                nameInput.value = chainsaw.name;
                descriptionInput.value = chainsaw.description;
                powerInput.value = chainsaw.power;
                engineTypeInput.value = chainsaw.engineType;
            })
            .catch(error => {
                console.error('Error fetching chainsaw:', error);
                alert('There was an issue retrieving the chainsaw data.');
            });
    }

    editButton.addEventListener('click', (event) => {
        event.preventDefault();

        if (!nameInput.value.trim() || !descriptionInput.value.trim() || !engineTypeInput.value.trim()) {
            alert('Please fill in all the fields!');
            return;
        }

        const updatedChainsaw = {
            name: nameInput.value,
            description: descriptionInput.value,
            power: powerInput.value,
            engineType: engineTypeInput.value,
        };

        fetch(`http://localhost:3000/api/createchainsaw/${chainsawId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedChainsaw),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update chainsaw.');
            }
            return response.json();
        })
        .then(data => {
            alert('Chainsaw updated successfully!');
            window.location.href = 'create_page.html';
        })
        .catch(error => {
            console.error('Error updating chainsaw:', error);
            alert('There was an issue updating the chainsaw.');
        });
    });
});
