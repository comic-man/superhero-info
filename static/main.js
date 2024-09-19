import { processSuperheroData } from "./handleNullValues.js";

document.getElementById('superhero-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent form from submitting the normal way

    // Get search type and value from the input fields
    let searchType = document.getElementById('search_type').value;
    let searchValue = document.getElementById('search_value').value;

    let url;
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `${searchType}=${searchValue}`,
    };

    if (searchType === 'full_name') {
        url = `/name?name=${encodeURIComponent(searchValue)}`;
        options = { method: 'GET' };  // Override options for GET request
    } else {
        url = '/SuperHeroAPICall';
    }

    // Make an AJAX request to fetch superhero data
    fetch(url, options)
    .then(response => response.json())
    .then(data => {
        // Check if there's an error
        if (data.error) {
            document.getElementById('result').innerHTML = `<p>Error: ${data.error}</p>`;
        } else {
            // Process the superhero data to handle null values
            const processedData = processSuperheroData(data);

            // Display the superhero information dynamically
            document.getElementById('result').innerHTML = `
                <h2>${processedData.name}</h2>
                <p><strong>Full Name:</strong> ${processedData.biography['full-name']}</p>
                <p><strong>Power Stats:</strong></p>
                <ul class="stats-list">
                    <li>Intelligence: ${processedData.powerstats.intelligence}</li>
                    <li>Strength: ${processedData.powerstats.strength}</li>
                    <li>Speed: ${processedData.powerstats.speed}</li>
                    <li>Durability: ${processedData.powerstats.durability}</li>
                    <li>Power: ${processedData.powerstats.power}</li>
                    <li>Combat: ${processedData.powerstats.combat}</li>
                </ul>
                <p><strong>Place of Birth:</strong> ${processedData.biography['place-of-birth']}</p>
                <p><strong>First Appearance:</strong> ${processedData.biography['first-appearance']}</p>
                <p><strong>Occupation:</strong> ${processedData.work.occupation}</p>
                <p><img src="${processedData.image.url}" alt="${processedData.name}" width="200"></p>
            `;
        }
    })
    .catch(error => {
        document.getElementById('result').innerHTML = `<p>Error: ${error.message}</p>`;
    });
});