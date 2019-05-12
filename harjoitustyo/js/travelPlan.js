"use strict"

let container  = document.querySelector("#container"),      // Parent div element
    dataSource = "https://restcountries.eu/rest/v2/all";    // Data source



const atLeastTwoBorderCountries = country  => country.borders.length >= 2,
      decorate                  = arr      => arr.map(i => [Math.random(), i]),
      undecorate                = arr      => arr.map(row => row[1]),
      shuffle_sort              = arr      => arr.sort( (a,b) => a[0] < b[0]),
      shuffle                   = arr      => undecorate(shuffle_sort(decorate(arr.slice()))),
      sample                    = (c, arr) => shuffle(arr).slice(c);





function buildCountriesFromData(data) {
  sample(3, data.filter(atLeastTwoBorderCountries))
    .map(buildCountry);
}

fetch(dataSource)
  .then(response => response.json())
  .then(buildCountriesFromData)
  .catch(err => console.log('Fetch catch clause', err));





function el(tag, opts = {}, inner = '', children = []) {
  const elem = document.createElement(tag);                        // create the element
  Object.keys(opts).map(opt => elem.setAttribute(opt, opts[opt])); // any key on opts should be sameval on tag
  elem.innerHTML = inner;                                          // if an innerhtml string exists, set it
  children.map(child => elem.appendChild(child));                  // append any children
  return elem;                                                     // bail
}

function buildFlag(country) {
  let flagImg = el("img", {src: country.flag, width: 150});
  let flagDiv = el("div", {}, '', [flagImg]);
  return flagDiv;
}

function buildNameAndCountry(country) {
  let nameSpan = el("span", {}, "<strong>" + country.name.toString() + "</strong>:<br>");
  let capSpan  = el("span", {}, country.capital.toString() + "<br><br>");
  let nameDiv  = el("div",  {}, '', [nameSpan, capSpan]);
  return nameDiv;
}

function buildCountry(country) { // Build country data in a div

  let flagDiv = buildFlag(country);
  let nameDiv = buildNameAndCountry(country);

  // Currency
  let curHead      = el("span", {}, "<strong>Currency:</strong><br>");
  let curLongSpan  = el("span", {}, country.currencies[0].name.toString());
  let curShortSpan = el("span", {}, " [" + country.currencies[0].code.toString() + "]<br><br>");
  let curDiv       = el('div',  {}, '', [curHead, curLongSpan, curShortSpan]);

  // Border countries
  let borderString = country.borders.join(', ') + '.';
  let borListSpan  = el("span", {}, borderString + '<br/><br/>');
  let borHead      = el("span", {}, "<strong>Borders:</strong><br>");
  let borDiv       = el("div", {}, '', [borHead, borListSpan]);

  // The actual country
  let countryDiv   = el("div", {}, '', [flagDiv, nameDiv, curDiv, borDiv]);

  // Push country div to container
  container.appendChild(countryDiv);

}