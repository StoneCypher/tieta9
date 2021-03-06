// Data source
let dataSource = "https://restcountries.eu/rest/v2/all";

// Input field as variable
let inputCountry = document.getElementById("field");

// Catch input when user presses enter
inputCountry.addEventListener("keypress", e => {
    if (e.keyCode == 13) {
        let country = inputCountry.value;        
        handleCountry(country);
    } 
})

handleCountry = (country) => {     
    // Found country
    let foundCountry;
    
    // Array of border countries
    let borderCountries = [];
    
    // Fetch data, loop through and find search item
    fetch(dataSource)
    .then(function(response) {                
        return response.json();
    })
    .then(function(myJson) {        
        // Loop to find the original country
        for (i = 0; i < myJson.length; i++) {
            // Look for original country
            if (myJson[i].name.toString() == country) {                
                foundCountry = myJson[i];                
            }            
        };
        // Loop to find border countries
        for (i = 0; i < myJson.length; i++) {
            // Look for border country
            if (_.contains(foundCountry.borders, myJson[i].alpha3Code)) {
                //console.log("Neighbour found: " + myJson[i].name.toString());
                borderCountries.push(myJson[i].name.toString());                
            }            
        };        
        
        // Format country string with embedded variables
        let countryString = `Maalla '${country}' on ${borderCountries.length} naapuria, ja ne ovat:`;    
        
        // Save the parent div element    
        let container = document.querySelector("#container");
        
        // Create ul element for neighbour list
        let ul = document.createElement("ul");
        
        // Create div for country text
        let countryDiv = document.createElement("div");
    
        // Create text for country
        let countryText = document.createTextNode(countryString);
        
        // Add text to country div
        countryDiv.appendChild(countryText);
            
        // Add country div to container div 
        container.appendChild(countryDiv);

        // Add empty list to container div
        container.appendChild(ul);

        // Push the borderCountries array as li's
        for (i = 0; i < borderCountries.length; i++) {
            let liText = document.createTextNode(borderCountries[i]);
            let li = document.createElement("li");
            li.appendChild(liText);
            container.appendChild(li);
        }
    });
}

