

async function getAnimals() {
    const response = await fetch("http://localhost:3000/animal");

    const data = await response.json();
    return data;
}

export { getAnimals };