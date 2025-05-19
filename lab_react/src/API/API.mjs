async function getAnimals() {
    const response = await fetch("http://localhost:3000/animal");
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }
}

async function getAnimalByName(name) {
    const response = await fetch(`http://localhost:3000/animal/${name}`);
    const data = await response.json();
    return data;
}

async function getAnimalsByAttributes(attributeMap, allowedNames = []) {
    const params = new URLSearchParams();

    // Add attribute filters
    Object.entries(attributeMap).forEach(([key, value]) => {
        params.append(key, value);
    });

    params.append("exclude", "no"); // convert boolean to string

    // Add allowedNames as repeated query params
    allowedNames.forEach((name) => {
        params.append('allowedNames', name);
    });

    const response = await fetch(`http://localhost:3000/animal?${params.toString()}`);
    const data = await response.json();
    return data;
}

async function retrieveByDifferentAttributesExclusion(attributeName, attributeValue, allowedNames = []) {
    const params = new URLSearchParams();

    // Add attribute filter
    params.append(attributeName, attributeValue);

    // Add exclude flag
    params.append("exclude", "yes"); // convert boolean to string

    // Add allowedNames as repeated query params
    allowedNames.forEach((name) => {
        params.append("allowedNames", name);
    });

    const response = await fetch(`http://localhost:3000/animal?${params.toString()}`);
    const data = await response.json();
    return data;
}


export { getAnimals, getAnimalByName, getAnimalsByAttributes, retrieveByDifferentAttributesExclusion };