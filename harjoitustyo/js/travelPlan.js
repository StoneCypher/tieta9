"use strict"

let dataSource = "https://restcountries.eu/rest/v2/all";    // Data source



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

function el(tag, opts = {}, inner = '', children = []) {
  const elem = document.createElement(tag);                        // create the element
  Object.keys(opts).map(opt => elem.setAttribute(opt, opts[opt])); // any key on opts should be sameval on tag
  elem.innerHTML = inner;                                          // if an innerhtml string exists, set it
  children.map(child => elem.appendChild(child));                  // append any children
  return elem;                                                     // bail
}

function buildFlag(country) {
  let flagImg = el("img", {src: country.flag, width: 150});
  return [flagImg];
}

function buildNameAndCountry(country) {
  let nameSpan = el("div", {class: 'countryName'}, country.name.toString());
  let capSpan  = el("div", {class: 'capital'},     country.capital.toString());
  return [nameSpan, capSpan];
}

function buildCurrency(country) {
  let curr    = country.currencies[0];
  let curHead = el("div", {class: 'currencyLabel'}, "Currency:");
  let curSpan = el("div", {class: 'currencyData'}, `${curr.name.toString()} [${curr.code.toString()}]`);
  return [curHead, curSpan];
}

function buildBorderCountries(country) {
  let borderString = `${country.borders.join(', ')}.`;
  let borListSpan  = el("span", {}, `${borderString}<br/><br/>`);
  let borHead      = el("span", {}, "<strong>Borders:</strong><br>");
  return [borHead, borListSpan];
}

function buildCountry(country) { // Build country data in a div
  document.querySelector("#container").appendChild(
    el("div", {}, '', [
      ... buildFlag(country),
      ... buildNameAndCountry(country),
      ... buildCurrency(country),
      ... buildBorderCountries(country)
    ])
  );
}





function run() {

  fetch(dataSource)
    .then(response => response.json())
    .then(buildCountriesFromData)
    .catch(err => console.log('Fetch catch clause', err));

}

window.onload = run;