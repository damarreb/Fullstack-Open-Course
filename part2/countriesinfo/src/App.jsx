import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {


  const [countrySearched, SetCountrySearched] = useState('')
  const [countriesJSON, SetCountriesJSON] = useState([])
  const [countryView, SetCountryView] = useState(undefined)
  const [weather, SetWeather] = useState(undefined)
  const countriesFilter = countriesJSON
    .filter(c => c.name.common.toLowerCase().startsWith(countrySearched.toLowerCase()))
  
  let countryViewing = undefined
  const Country = ({country}) =>{
    const onClick = e => {
      SetCountryView(country)
    }
    return <li key={country.name.common}>
    {country.name.common} <button onClick={onClick}>show</button>
    </li>
  }

  const CountryList = ({countries,maxCountries}) =>{
    if (countries.length === 1) {countryViewing = countries[0];return <></>}
    else if (countries.length <= maxCountries)
      return<>
      <ul>
        {countries
        .map(c =><Country key={c.name.common} country={c}/>)}
      </ul>
      </>
      
    else return <p>Too many matches, specify another filter</p>
  }

  const Weather = () => {
    console.log(weather)
    if (weather) return <>
    <h3>weather in {countryViewing.capital[0]}</h3>
    <b>temperature: </b> {weather.temp_c} Celsius <br/>
    <img src={weather.condition.icon} alt={"weather in " + countryViewing.capital[0]} /> <br />
    <b>wind: </b> {weather.wind_kph} kph direction {weather.wind_dir}
    </>
    else return <></>
  }

  const CountryInfo = () => {


    if (countryViewing === undefined) countryViewing = countryView 
    if (countryViewing === undefined) return <></>
    else return <>
      <h1>{countryViewing.name.common}</h1>
      <p>capital {countryViewing.capital[0]}<br/>
        population {countryViewing.population}
      </p>
      <h3>languages</h3>
      <ul>
        {Object.entries(countryViewing.languages).map(p => <li key={p[1]}>{p[1]}</li>)}
      </ul>
      <img src={countryViewing.flags.png} alt={"flag of " + countryViewing.name.common} />
      <Weather/>
      </>
  }

  const onChangeFilter = (e) =>{
    SetCountrySearched(e.target.value)
  }

  const hook = () =>{
    axios
    .get("https://restcountries.com/v3.1/all")
    .then(response => SetCountriesJSON(response.data))
  }

  useEffect(hook,[])

  const hook1 = () => {
    if (countryViewing != countryView) SetCountryView(countryViewing)
  }
  useEffect(hook1,undefined)
  
  const hook_weather = () =>{
    const api_key = import.meta.env.VITE_API_KEY
    if (countryViewing)
      axios
      .get(`http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${countryViewing.capital[0]}&aqi=no`)
      .then(response => {SetWeather(response.data.current)})
  }

  useEffect(hook_weather,[countryView])

  return <>
    find countries <input onChange={onChangeFilter}/>
    <CountryList countries={countriesFilter} maxCountries={10}/>
    <CountryInfo/>
    </>
}

export default App
