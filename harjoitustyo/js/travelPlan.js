"use strict"

let container  = document.querySelector("#container"),      // Parent div element
    dataSource = "https://restcountries.eu/rest/v2/all";    // Data source



const atLeastTwoBorderCountries = country  => country.borders.length >= 2,
      decorate                  = arr      => arr.map(i => [Math.random(), i]),
      undecorate                = arr      => arr.map(row => row[1]),
      shuffle_sort              = arr      => arr.sort( (a,b) => a[0] < b[0]),
      shuffle                   = arr      => undecorate(shuffle_sort(decorate(arr.slice()))),
      sample                    = (c, arr) => shuffle(arr).slice(c);

fetch(dataSource)
  .then (function(response) {                          // Error if data missing
    if (response.status !== 200) {
      console.log("Data not found! Code: " + response.status);
      return;
    }
    return response.json();
  })
  .then(function(data) {
    sample(3, data.filter(atLeastTwoBorderCountries))
      .map(buildCountry);
  })
  .catch(function(err) {
    console.log('Fetch catch clause', err);
  });




function buildCountry (country) { // Build country data in a div

    // Country container
    let countryDiv = document.createElement("div");

    // ADD COUNTRY DATA

    // Flag
    let flagDiv = document.createElement("div");
    let flagImg = document.createElement("img");
    flagImg.setAttribute("src", country.flag);
    flagImg.setAttribute("width", "150");
    flagDiv.appendChild(flagImg);

    // Name and capital
    let nameDiv = document.createElement("div");
    let nameSpan = document.createElement("span");
    let capSpan = document.createElement("span");
    nameSpan.innerHTML = "<strong>" + country.name.toString() + "</strong>:<br>"
    capSpan.innerHTML = country.capital.toString() + "<br><br>";
    nameDiv.appendChild(nameSpan);
    nameDiv.appendChild(capSpan);

    // Currency
    let curDiv = document.createElement("div");
    let curHead = document.createElement("span");
    let curLongSpan = document.createElement("span");
    let curShortSpan = document.createElement("span");
    curHead.innerHTML = "<strong>Currency:</strong><br>"
    curLongSpan.innerHTML = country.currencies[0].name.toString();
    curShortSpan.innerHTML = " [" + country.currencies[0].code.toString() + "]<br><br>";
    curDiv.appendChild(curHead);
    curDiv.appendChild(curLongSpan);
    curDiv.appendChild(curShortSpan);

    // Border countries
    let borDiv = document.createElement("div");
    let borHead = document.createElement("span");
    let borListSpan = document.createElement("span");
    borHead.innerHTML = "<strong>Borders:</strong><br>";
    let borderString = "";
    for (let i = 0; i < country.borders.length; i++) {
      if (i == country.borders.length -1) {
        borderString += country.borders[i] + ".";
      }
      else {
        borderString += country.borders[i] + ", ";
      }
    };
    borListSpan.innerHTML = borderString + "<br><br>";
    borDiv.appendChild(borHead);
    borDiv.appendChild(borListSpan);

    // Push elements to country div
    countryDiv.appendChild(flagDiv);
    countryDiv.appendChild(nameDiv);
    countryDiv.appendChild(curDiv);
    countryDiv.appendChild(borDiv);

    // Push country div to container
    container.appendChild(countryDiv);
}