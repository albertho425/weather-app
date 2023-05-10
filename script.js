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

    console.log("the value before calling weather API URL is: " + ipAddressInput);

     const weatherUrl = "https://api.weatherapi.com/v1/current.json?key=" + weatherAPIKey + "&q=" + ipAddressInput + "&aqi=no";
     
     
    // const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=" + weatherAPIKey + "&units=metric";

    try {
        const weatherResponse = await fetch(weatherUrl, {cache: "no-cache"});
        const weatherResult = await weatherResponse.json();


        if (weatherResponse.ok) {
            console.log("the Weather API result is: " , weatherResult);

            let theWeather = weatherResult.current.temp_c;
            let condtionDescription = weatherResult.current.condition["text"];
            let theWeatherIcon = weatherResult.current.condition["icon"];
            

            outputWeatherTemp(theWeather);
            outputWeatherConditions(condtionDescription);
            outputWeatherIcon(theWeatherIcon);
            
        }

    } catch (error) {
        if (error) throw error;
        console.log("Weather API error: ", error);
    
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