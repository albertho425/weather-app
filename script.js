//APIS

//https://ipapi.co/
// api.openweathermap.org


//Declare constants and variables

// weatherAPIKey = "fc7b8fe047463e35affcaef55f893ab8";
weatherAPIKey = "ca80ffda470e4eca8e4235808230905";
mapAPIKey = "aG8NIzp3QrvPAfPAcatmWUYjhlHsaOcy";
// https://www.youtube.com/watch?v=njJdDjdwSIE

// When the page loads, run these functions
window.onload = getData();

let ipAddressText = document.getElementById("ipAddress");
let weatherTempText = document.getElementById("weatherTemp");
let weatherConditionsText = document.getElementById("weatherConditions");
let weatherIcon = document.getElementById("weatherIcon");
let visibilityText = document.getElementById("visibility");
let sunriseText = document.getElementById("sunrise");
let sunsetText = document.getElementById("sunset");


async function getData() {

    const apiURL =  "https://ipapi.co/json/"
      

    try {
        const response = await fetch(apiURL, {cache: "no-cache"});
        const result = await response.json();
    
        if (response.ok) {
            console.log("the IP API result is: " , result);
           
            let ipAdress = result.ip;
            let theCity = result.city;
            console.log(ipAdress);
            console.log("the city is: " + theCity);
            outputIpAddress(ipAdress);
            
            getWeatherData(theCity);
            
        }

    } catch (error) {
        if (error) throw error;
        console.log("IP address API error ", error);
    
    }
}


function outputIpAddress(ipInput) {
    ipAddressText.innerHTML = ipInput;
}


/**
 * Get the weather data from API
 * @param {*} lat 
 * @param {*} long 
 */

async function getWeatherData(ipAddressInput) {

    let ipAddressValue = ipAddressInput;

    console.log("the value before calling weather API URL is: " + ipAddressInput);

     const weatherUrl = "https://api.weatherapi.com/v1/current.json?key=" + weatherAPIKey + "&q=" + ipAddressInput + "&aqi=no";
     
    try {
        const weatherResponse = await fetch(weatherUrl, {cache: "no-cache"});
        const weatherResult = await weatherResponse.json();


        if (weatherResponse.ok) {
            console.log("the Weather API result is: " , weatherResult);

            let theWeather = weatherResult.current.temp_c;
            let condtionDescription = weatherResult.current.condition["text"];
            let theWeatherIcon = weatherResult.current.condition["icon"];
            let theVisibility = weatherResult.current.vis_km;
            

            outputWeatherTemp(theWeather);
            outputWeatherConditions(condtionDescription);
            outputWeatherIcon(theWeatherIcon);
            outputVisibility(theVisibility);
        }

        getSunriseSunset(ipAddressValue);

    } catch (error) {
        if (error) throw error;
        console.log("Weather API error: ", error);
    
    }
}

/**
 * Get the Sunrise and Sunset from API using IP Address
 * @param {*} ipAddressInput 
 */

async function getSunriseSunset(ipAddressInput) {

    

     const weatherUrl = "https://api.weatherapi.com/v1/astronomy.json?key=" + weatherAPIKey + "&q=" + ipAddressInput;
     
    try {
        const weatherResponse = await fetch(weatherUrl, {cache: "no-cache"});
        const weatherResult = await weatherResponse.json();


        if (weatherResponse.ok) {
            console.log("the Weather API Astronomy result is: " , weatherResult);

            let theSunrise = weatherResult.astronomy.astro.sunrise;
            let theSunset = weatherResult.astronomy.astro.sunset;

            outputSunrise(theSunrise);
            outputSunset(theSunset);
            
        }

    } catch (error) {
        if (error) throw error;
        console.log("Weather API Astronomy error: ", error);
    
    }
}



function outputWeatherTemp(tempInput)
{
    weatherTempText.innerHTML = tempInput;
    console.log(tempInput);
}

function outputWeatherConditions(conditionInput)
{
    weatherConditionsText.innerHTML = conditionInput;
}

function outputWeatherIcon(iconInput)
{
    let tempString = iconInput;
    let newString = tempString.substring(2);
    
    
    // weatherIcon.innerHTML = "<img src=https://" + theIconCode +  "'>";

    console.log(newString);

    weatherIcon.innerHTML = "<img src='" + newString + "'>";

    // weatherIconText.innerHTML = "<img src='http://openweathermap.org/img/w/" + theIconCode +  ".png'>";


}

function outputVisibility(visibilityInput) {
    visibilityText.innerHTML = visibilityInput;
}

function outputSunset(sunsetInput) {

    sunsetText.innerHTML = sunsetInput;
}

function outputSunrise(sunriseInput) {
    sunriseText.innerHTML = sunriseInput;
}