import API_TOKEN from "./config.js"

let cityName = document.getElementById('city-name')
let tempF = document.getElementById('current-temp-fah')
let tempC = document.getElementById('current-temp-cel')
let form = document.getElementById('yourCity')
let formCity=document.getElementById('formCity')
let yourFah=document.getElementById('current-temp-fahYours')
let yourCel=document.getElementById('current-temp-celYours')
let sunRise =document.getElementById('sunRise')
let sunSet =document.getElementById('sunSet')

fetch(`http://api.weatherapi.com/v1/current.json?key=${API_TOKEN}&q=Oxon Hill&aqi=no`)
    /*** .then(response =>response.json())*/
    .then(response =>{
        console.log(response.status)
        return response.json()
    })
    .then(data=>{
        console.log(data)
        //we're accessing everything as objects
        cityName.innerText=data.location.name
        tempF.innerText=Math.round(data.current.temp_f)
        tempC.innerText=Math.round(data.current.temp_c)
    })
    form.addEventListener('submit', (event)=>{
        event.preventDefault()

        let formData = new FormData(form)

        let userCity = formData.get('inputCity')
        console.log(userCity)
        let newFetch = `http://api.weatherapi.com/v1/current.json?key=${API_TOKEN}&q=${userCity}&aqi=no`
        console.log(newFetch)
        fetch(newFetch)
            .then(response =>response.json())
   
    
            .then(data=>{
            console.log(data)
            //we're accessing everything as objects
            formCity.innerText=data.location.name
            yourFah.innerText=Math.round(data.current.temp_f)
            yourCel.innerText=Math.round(data.current.temp_c)
        })
        let astronFetch = `http://api.weatherapi.com/v1/astronomy.json?key=${API_TOKEN}&q=${userCity}&dt=2023-03-30`


        fetch(astronFetch)
            .then(response =>response.json())
   
    
            .then(data=>{
            console.log(data)
         
            sunRise.innerText = data.astronomy.astro.sunrise
            sunSet.innerText = data.astronomy.astro.sunset
        })

    })