// Function to handle null values
function handleNull(value, defaultValue = '') {
    return value === null || value === 'null' ? defaultValue : value;
}

// Function to process superhero data
function processSuperheroData(data) {
    return {
        ...data,
        powerstats: {
            intelligence: handleNull(data.powerstats.intelligence, 'Not enough information at this time.'),
            strength: handleNull(data.powerstats.strength, 'Not enough information at this time.'),
            speed: handleNull(data.powerstats.speed, 'Not enough information at this time.'),
            durability: handleNull(data.powerstats.durability, 'Not enough information at this time.'),
            power: handleNull(data.powerstats.power, 'Not enough information at this time.'),
            combat: handleNull(data.powerstats.combat, 'Not enough information at this time.')
        },
        biography: {
            ...data.biography,
            'full-name': handleNull(data.biography['full-name']),
            'place-of-birth': handleNull(data.biography['place-of-birth']),
            'first-appearance': handleNull(data.biography['first-appearance'])
        },
        appearance: {
            ...data.appearance,
            race: handleNull(data.appearance.race)
        },
        work: {
            ...data.work,
            occupation: handleNull(data.work.occupation)
        },
        connections: {
            ...data.connections,
            'group-affiliation': handleNull(data.connections['group-affiliation']),
            relatives: handleNull(data.connections.relatives)
        },
        image: {
            ...data.image,
            url: handleNull(data.image.url)
        }
    };
}

// Export the function for use in other scripts
export { processSuperheroData };