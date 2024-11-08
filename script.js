let currentIndex = 1;
const maxIndex = 898;

async function fetchData(index) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${index}`);

        if (!response.ok) {
            throw new Error('Failed to fetch Pokémon');
        }

        const data = await response.json();
        const pokemonSprite1 = data.sprites.front_default;
        const pokemonSprite2 = data.sprites.back_default;

        // Set the source for the front and back sprites
        const imgElement1 = document.getElementById("pokemonSprite1");
        imgElement1.src = pokemonSprite1; 
        imgElement1.style.display = "block";

        const imgElement2 = document.getElementById("pokemonSprite2");
        imgElement2.src = pokemonSprite2; 
        imgElement2.style.display = "block";

        // Display the Pokémon name
        const nameElement = document.getElementById("pokemonNameDisplay");
        nameElement.textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);

        // Enable or disable pagination buttons based on the current index
        document.getElementById("prev-button").disabled = currentIndex === 1;
        document.getElementById("next-button").disabled = currentIndex === maxIndex;
    } catch (error) {
        console.error(error);
        alert("An error occurred: " + error.message);
    }
}

// Event listeners for pagination buttons
document.getElementById("prev-button").addEventListener("click", () => {
    if (currentIndex > 1) {
        currentIndex--;
        fetchData(currentIndex);
    }
});

document.getElementById("next-button").addEventListener("click", () => {
    if (currentIndex < maxIndex) {
        currentIndex++;
        fetchData(currentIndex);
    }
});

// Initial fetch for the first Pokémon
fetchData(currentIndex);