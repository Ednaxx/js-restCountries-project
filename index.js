// start app showing all countries

loadDB('https://restcountries.com/v3.1/all')


// search db

async function loadDB(endpoint) {
    try {
    const db = await fetch(endpoint).then((response) => response.json())
    
    db.sort((a, b) => a.name.common.localeCompare(b.name.common))
    db.forEach(country => renderCountry(country))
    }
    catch (e) {
        console.log(e)
        const errMes = document.createElement('p')
        errMes.style.color = 'red'
        errMes.innerText = "No countries found."

        document.getElementById('countries-box').appendChild(errMes)
    }
}



// renders search on screen


function renderCountry(country) {
    const countryFrame = document.createElement('div')
    countryFrame.id = `#${country.cca3}`

    countryFrame.dataset.countryName = country.name.common
    countryFrame.dataset.officialName = country.name.official
    countryFrame.dataset.countryFlag = country.flags.png
    countryFrame.dataset.region = country.region
    countryFrame.dataset.subregion = country.subregion
    countryFrame.dataset.languages = ((country.languages) ? Object.values(country.languages) : "N/A")
    countryFrame.dataset.area = country.area
    countryFrame.dataset.population = country.population
    countryFrame.dataset.googleMaps = country.maps.googleMaps
    if (country.currencies) {
        let countryCurrencies = ""
        Object.values(country.currencies).forEach(currency => countryCurrencies += `${currency.name} (${currency.symbol}), `)
        countryFrame.dataset.currencies = countryCurrencies
    }
    else {
        countryFrame.dataset.currencies = "N/A"
    }


    const countryFlag = document.createElement('img')
    countryFlag.src = country.flags.png
    countryFlag.alt = country.flags.alt

    const countryName = document.createElement('p')
    countryName.innerText = country.name.common

    countryFrame.appendChild(countryFlag)
    countryFrame.appendChild(countryName)
    document.getElementById('countries-box').appendChild(countryFrame)

    countryFrame.addEventListener('click', ev => showCountryWindow(ev))
}

// show country window

function showCountryWindow(ev) {

    document.getElementById('country-name').innerText = ev.currentTarget.dataset.countryName
    document.getElementById('country-flag').src = ev.currentTarget.dataset.countryFlag
    document.getElementById('official-name').innerText = ev.currentTarget.dataset.officialName
    document.getElementById('region').innerText = ev.currentTarget.dataset.region
    document.getElementById('subregion').innerText = ev.currentTarget.dataset.subregion
    document.getElementById('languages').innerText = ev.currentTarget.dataset.languages
    document.getElementById('area').innerText = ev.currentTarget.dataset.area
    document.getElementById('population').innerText = ev.currentTarget.dataset.population
    document.getElementById('currencies').innerText = ev.currentTarget.dataset.currencies
    document.getElementById('google-maps-link').innerText = ev.currentTarget.dataset.googleMaps
    document.getElementById('google-maps-link').href = ev.currentTarget.dataset.googleMaps
}



// search bar submit

document.querySelector('#submit').addEventListener('click', () => {
    if (document.getElementById('search-input').value === "") {
        if (!document.querySelector('#errorMes')) {
            const errorMes = document.createElement("p")
            errorMes.id = "errorMes"
            errorMes.innerText = "Please fill the input."
            errorMes.style.color = 'red'
            document.getElementById('search-box').appendChild(errorMes)
        }    
    }
    else {
        if (document.querySelector('#errorMes')) {
            document.querySelector('#errorMes').remove()
        }
        
        document.getElementById('countries-box').innerText = ""

        loadDB(`https://restcountries.com/v3.1/name/${document.getElementById('search-input').value}`)
    }
})



// search bar restart

document.querySelector('#restart').addEventListener('click', () => {
    document.getElementById('countries-box').innerText = ""
    document.getElementById('search-input').value = ""

    loadDB('https://restcountries.com/v3.1/all')
})