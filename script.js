document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".form1");
    const imgElement = document.querySelector(".image img");
    const nameElement = document.querySelector(".name .name1");
    const numberElement = document.querySelector(".name .number");
    const typeElement = document.querySelector(".Type");
    const abilityElement = document.querySelector(".ability");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const input = form.querySelector("input");
        const pokemonName = input.value.toLowerCase();

        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
            if (!response.ok) {
                throw new Error("Could not fetch the Pokémon.");
            }

            const data = await response.json();

            const name = data.name;
            const number = data.id;
            const type = data.types.map(t => t.type.name).join(", ");
            const abilities = data.abilities.map(a => a.ability.name).join(", ");
            const pokemonSprite = data.sprites.front_default;

            nameElement.textContent = name.charAt(0).toUpperCase() + name.slice(1);
            numberElement.textContent = number;
            typeElement.textContent = `Type: ${type}`;
            abilityElement.textContent = `Abilities: ${abilities}`;

            imgElement.src = pokemonSprite;
            imgElement.style.display = "block";
        } catch (error) {
            console.error("Error:", error);
            imgElement.style.display = "none";
        }
    });
});