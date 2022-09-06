const selector = document.getElementById("countries-selector")
const flagContainer = document.querySelector('.flag-container')
const displayName = document.querySelector(".display-name")
const generalInfo = document.querySelector(".general-info")
const mapsContainer = document.querySelector('.maps-container')

async function generateCoutriesOptions () {
    const data = await fetch('https://restcountries.com/v2/all')
    const result = await data.json()
    const countryName = result.map(country => country.name)
    // console.log(countryName);
    for (let i = 0; i < countryName.length; i++) {
        selector.innerHTML +=
        `<option value=${countryName[i]}>${countryName[i]}</option>`
    }
}
generateCoutriesOptions()

async function getCountryObj(country) {
    const data = await fetch (`https://restcountries.com/v3.1/name/${country}`)
    const result = await data.json ()
    return result
}

function showContent (countryObject) {
    const {
        name: {official},
        coatOfArms: {
            svg:coatOfArmsSvg
        },
        flags: {
            svg:flagSvg
        },
        capital,
        currencies,
        independent,
        unMember,
        languages,
        area,
        population,
        continents, 
        maps: {
            googleMaps,
            openStreetMaps
        }
    } = countryObject
    const {name: currencyName, symbol} = Object.entries(currencies)[0][1]
    // const languagesName = Object.entries(languages).map(el => el[1]).join(", ")
    const languagesName = Object.entries(languages).map(([key, val]) => val).join(", ")

    
    console.log(languagesName);
    flagContainer.innerHTML = 
    `<img src=${flagSvg} />
    ${
        coatOfArmsSvg 
        ? `<img src=${coatOfArmsSvg} />`
        : `<img src=${'https://via.placeholder.com/300'} />`
      }
    `
displayName.innerHTML = `<p>${official}</p>`
generalInfo.innerHTML = `
    <li>Capital - ${capital[0]}</li>
    <li>Currency - ${currencyName}(${symbol})</li>  
    <li>Independent - ${independent ? `yes` : `no`}</li>  
    <li>UN Member - ${unMember ? `yes` : `no`}</li> 
    <li>Languages - ${languagesName}</li>
    <li>Area - ${area} &#13218</li>
    <li>Population - ${population}</li>
    <li>Continents - ${continents[0]}</li>
    `  
mapsContainer.innerHTML = `
    <a href=${googleMaps} target=_blank><i class="fa-solid fa-map"></i></a>
    <a href=${openStreetMaps} target=_blank><i class="fa-solid fa-map-location-dot"></i></a>
    ` 
}

selector.addEventListener('change', async (e) => {
    const country = e.target.value
    // console.log(country);
    const [countryObject] = await getCountryObj(country)
    // console.log(countryObject);
    showContent (countryObject)
    
})


