"use strict"

let dataSource = "https://restcountries.eu/rest/v2/all";    // Data source



const atLeastTwoBorderCountries = country  => country.borders.length >= 2,
      decorate                  = arr      => arr.map(i => [Math.random(), i]),
      undecorate                = arr      => arr.map(row => row[1]),
      shuffle_sort              = arr      => arr.sort( (a,b) => a[0] < b[0]? -1 : 1),
      shuffle                   = arr      => undecorate(shuffle_sort(decorate(arr.slice()))),
      sample                    = (c, arr) => shuffle(arr).slice(0,c);





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
  return [
    el("img", {class: 'flag', src: country.flag})
  ];
}

function buildNameAndCountry(country) {
  return [
    el("div", {class: 'countryName'}, country.name.toString()),
    el("div", {class: 'capital'},     country.capital.toString())
  ];
}

function buildCurrency(country) {
  let curr = country.currencies[0];
  return [
    el("div", {class: 'currencyLabel'}, "Currency:"),
    el("div", {class: 'currencyData'}, `${curr.name.toString()} [${curr.code.toString()}]`)
  ];
}

function buildBorderCountries(country) {
  return [
    el("div", {class: 'borderList'}, country.borders.join(', ')),
    el("div", {class: 'borders'}, "Borders")
  ];
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