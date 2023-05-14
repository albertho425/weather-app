//APIS

//https://ipapi.co/
// api.openweathermap.org


//Declare constants and variables

// weatherAPIKey = "fc7b8fe047463e35affcaef55f893ab8";
weatherAPIKey = "ca80ffda470e4eca8e4235808230905";
mapAPIKey = "aG8NIzp3QrvPAfPAcatmWUYjhlHsaOcy";
// https://www.youtube.com/watch?v=njJdDjdwSIE
geoAPIkey = "eec122638c9e4b6397e0c2634019c4bc"

// When the page loads, run these functions
window.onload = getData();

// let ipAddressText = document.getElementById("ipAddress");
let cityRegionText = document.getElementById("cityRegion");
let countryText = document.getElementById("country");
let weatherTempText = document.getElementById("weatherTemp");
let weatherConditionsText = document.getElementById("weatherConditions");
let weatherIcon = document.getElementById("weatherIcon");
let visibilityText = document.getElementById("visibility");
let sunriseText = document.getElementById("sunrise");
let sunsetText = document.getElementById("sunset");
let mapText = document.getElementById("map");
let windText = document.getElementById("wind");
let precipText = document.getElementById("precipitation");
let feelsLikeText = document.getElementById("feelsLike");
let highTempText = document.getElementById("weatherHigh");
let lowTempText = document.getElementById("weatherLow");
let chanceOfRainText = document.getElementById("chanceOfRain");
let chanceOfSnowText = document.getElementById("chanceOfSnow");
let humidityText = document.getElementById("humidity");
let windGustText = document.getElementById("windGust");
let uvText = document.getElementById("uv");
let pressureText = document.getElementById("pressure");

let day1dateText = document.getElementById("1dayDate");
let day1Icon = document.getElementById("1dayWeatherIcon");
let day1HighTempText = document.getElementById("1dayTempHigh");
let day1LowTempText = document.getElementById("1dayTempLow");
let day1ChanceOfPrecipText = document.getElementById("1dayPrecip");
let day1Wind = document.getElementById("1dayWind");

//weather alerts
let alertHeadline = document.getElementById("alertHeadline");
let alertCategory = document.getElementById("alertCategory");
let alertEvent = document.getElementById("alertEvent");
let alertDescription = document.getElementById("alertDescription");

let formInput = document.getElementById("formInput");


/**
 *  Get location data from API
 */

async function getData() {

    const apiURL =  "https://ipapi.co/json/"
      
    try {
        const response = await fetch(apiURL, {cache: "no-cache"});
        const result = await response.json();
    
        if (response.ok) {
            console.log("the IP API result is: " , result);
           
            // let ipAdress = result.ip;
            let theCity = result.city;
            let theRegion = result.region;
            let theCountry = result.country_name;

            let theLat = result.latitude;
            let theLong = result.longitude;
            

            console.log("the lat is: " + theLat);
            console.log("the long is: " + theLong);
            getMapfromAPI(theLat,theLong);
            
            // outputIpAddress(ipAdress);
            outputCityRegion(theCity,theRegion);
            outputCountry(theCountry);
            getWeatherData(theCity);      
        }

    } catch (error) {
        if (error) throw error;
        console.log("IP address API error ", error);
    
    }
}


/**
 * Get the weather data from API
 * @param {*} ipAddressInput
 * 
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
            let windSpeed = weatherResult.current.wind_kph;
            let windDir = weatherResult.current.wind_dir;
            let thePrecip = weatherResult.current.precip_mm;
            let itFeelsLike = weatherResult.current.feelslike_c;
            let humidity = weatherResult.current.humidity;
            let windGust = weatherResult.current.gust_kph;
            let uv = weatherResult.current.uv;
            let pressure = weatherResult.current.pressure_mb;

            outputWeatherTemp(theWeather);
            outputWeatherConditions(condtionDescription);
            outputWeatherIcon(theWeatherIcon);
            outputVisibility(theVisibility);
            outputWind(windSpeed,windDir);
            outputPrecip(thePrecip);
            outputItFeelsLike(itFeelsLike);


            outputWindGust(windGust);
            outputUV(uv);
            outputPressure(pressure);

            getSunriseSunset(ipAddressValue);
            getWeatherForcast(ipAddressValue);
            outputHumidity(humidity);
            
        }

       

    } catch (error) {
        if (error) throw error;
        console.log("Weather API error: ", error);
    
    }
}

/**
 * Get the forecast from API using IP Address
 * @param {*} ipAddressInput 
 */

async function getWeatherForcast(ipAddressInput) {

    

     const weatherUrl = "https://api.weatherapi.com/v1/forecast.json?key=" + weatherAPIKey + "&q=" + ipAddressInput + "&days=3&aqi=yes&alerts=yes";
     
    try {
        const weatherResponse = await fetch(weatherUrl, {cache: "no-cache"});
        const weatherResult = await weatherResponse.json();


        if (weatherResponse.ok) {
            console.log("the weather forecast API result is: " , weatherResult);

            let dailyHigh = weatherResult.forecast.forecastday[0].day.maxtemp_c;
            let dailyLow = weatherResult.forecast.forecastday[0].day.mintemp_c;

            
            let chanceOfRain = weatherResult.forecast.forecastday[0].day.daily_chance_of_rain;
            let chanceOfSnow = weatherResult.forecast.forecastday[0].day.daily_chance_of_snow;


            let forecastDay1 = weatherResult.forecast.forecastday[0];
            let forecastDay2 = weatherResult.forecast.forecastday[1];
            let forecastDay3 = weatherResult.forecast.forecastday[2];

            let alert = weatherResult.alerts.alert[0].headline;
            let alertCategory = weatherResult.alerts.alert[0].category;
            let alertEvent = weatherResult.alerts.alert[0].event;
            let alertDescription = weatherResult.alerts.alert[0].desc;
            
            console.log(alert);
            console.log("Alert category is:" + alertCategory);
            console.log(alertEvent);
            console.log(alertDescription);
            outputAlert(alert,alertCategory,alertEvent,"");

            //Forecast date
            let forecastDay1Date = forecastDay1.date;
            let forecastDay1TempHigh = forecastDay1.day.maxtemp_c;
            let forecastDay1TempLow = forecastDay1.day.mintemp_c;
            let forecastDay1Rain = forecastDay1.day.daily_chance_of_rain;
            let forecastDay1Snow = forecastDay1.day.daily_chance_of_snow;
            let forecastDay1MaxWind = forecastDay1.day.maxwind_kph;
            let forecastDay1Icon = forecastDay1.day.condition.icon;

            outputDayForecast(forecastDay1Date, forecastDay1Icon,forecastDay1TempHigh, forecastDay1TempLow, forecastDay1Rain, forecastDay1MaxWind);
            
            outputHighLowTemp(dailyHigh,dailyLow);
            outputChanceOfRainSnow(chanceOfRain,chanceOfSnow);
        }

    } catch (error) {
        if (error) throw error;
        console.log("the weather forecast API: ", error);
    
    }
}

/**
 * After user inputs form value, get the weather date for user
 * @param {*} formInput 
 */

async function getWeatherDataForm(formInput) {

    const weatherUrl = "https://api.weatherapi.com/v1/current.json?key=" + weatherAPIKey + "&q=" + formInput + "&aqi=no";


    getWeatherData(formInput);      

     
    try {
        const weatherResponse = await fetch(weatherUrl, {cache: "no-cache"});
        const weatherResult = await weatherResponse.json();


        if (weatherResponse.ok) {
            console.log("the Weather API result from form input is: " , weatherResult);

            let theCity = weatherResult.location.name;
            let theRegion = weatherResult.location.region;
            let theCountry = weatherResult.location.country;
            outputCityRegion(theCity,theRegion);
            outputCountry(theCountry);

            let theWeather = weatherResult.current.temp_c;
            let condtionDescription = weatherResult.current.condition["text"];
            let theWeatherIcon = weatherResult.current.condition["icon"];
            let theVisibility = weatherResult.current.vis_km;
            let windSpeed = weatherResult.current.wind_kph;
            let windDir = weatherResult.current.wind_dir;
            let thePrecip = weatherResult.current.precip_mm;
            let itFeelsLike = weatherResult.current.feelslike_c;
            let humidity = weatherResult.current.humidity;
            let windGust = weatherResult.current.gust_kph;
            let uv = weatherResult.current.uv;
            let pressure = weatherResult.current.pressure_mb;

            outputWeatherTemp(theWeather);
            outputWeatherConditions(condtionDescription);
            outputWeatherIcon(theWeatherIcon);
            outputVisibility(theVisibility);
            outputWind(windSpeed,windDir);
            outputPrecip(thePrecip);
            outputItFeelsLike(itFeelsLike);


            outputWindGust(windGust);
            outputUV(uv);
            outputPressure(pressure);

            getSunriseSunset(formInput);
            getWeatherForcast(formInput);
            outputHumidity(humidity);
            
        }

       

    } catch (error) {
        if (error) throw error;
        console.log("Weather API error: ", error);
    
    }
}
/**
 * Get the weather forecaset from API based on ip address
 * @param {*} ipAddressInput 
 */


async function getSunriseSunset(ipAddressInput) {

    const weatherUrl = "https://api.weatherapi.com/v1/forecast.json?key=" + weatherAPIKey + "&q=" + ipAddressInput;
    
   try {
       const weatherResponse = await fetch(weatherUrl, {cache: "no-cache"});
       const weatherResult = await weatherResponse.json();

       if (weatherResponse.ok) {
           console.log("the Weather API Astronomy result is: " , weatherResult);

           let theSunrise = weatherResult.forecast.forecastday[0].astro.sunrise;
           let theSunset = weatherResult.forecast.forecastday[0].astro.sunset;

           console.log("sunrise is: " + theSunrise);
           console.log("sunset is: " + theSunset);
        //    let theSunset = weatherResult.astronomy.astro.sunset;

           
           outputSunrise(theSunrise);
           outputSunset(theSunset);
           
       }

   } catch (error) {
       if (error) throw error;
       console.log("Weather API Astronomy error: ", error);
 
   }
}



/**
 * 
 * Get the map URL from API
 * @param {*} latInput 
 * @param {*} longInput 
 * @returns 
 */

function getMapfromAPI (latInput,longInput) {

    let URL = "https://maps.geoapify.com/v1/staticmap?style=osm-carto&width=600&height=400&center=lonlat:" + longInput + "," + latInput + "&zoom=5&apiKey=" + geoAPIkey;

    console.log("returning: " + URL);
    outputMap(URL);

}

/**
 * Get the IP address or city from a form and process
 * @param {*} input 
 */

function  processForm() {

    // 176.100.43.109 Van
    // 185.219.141.41 Seattle
    // 185.212.118.40 Toronto

    console.log("Running a function after a form submission");

    let tempFormInput = formInput.value;

    console.log("Form input is: " + tempFormInput);

    getWeatherDataForm(tempFormInput);



}

    




/**
 * Output the map to the screen
 * @param {*} mapInput 
 */

function outputMap(mapInput)
{

    let mapImage = "<img class='location-map' src='" + mapInput + "'>"
    console.log(mapImage);
    mapText.innerHTML = mapImage;


}

/**
 * 
 * Functions that output to the screen
 */

function outputIpAddress(ipInput) {
    ipAddressText.innerHTML = ipInput;
}


function outputIpAddress(ipInput) {
    ipAddressText.innerHTML = ipInput;
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

/**
 * 
 * Output the weather icon to the screen as an image
 * @param {*} iconInput 
 */

function outputWeatherIcon(iconInput)
{
     weatherIcon.innerHTML = "<img class='weather-icon' src='https:" + iconInput +  "'>";
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

//Output wind speed and direction

function outputWind(windInput1,windInput2) {

    let combinedWind = windInput1 + " " + windInput2;
    console.log(combinedWind);
    windText.innerHTML = combinedWind;

}

//Output the city to the screen

function outputCity(cityInput) {

    cityText.innerHTML = cityInput;

}

//Output the state or province to the screen

function outputRegion(regionInput) {

    regionText.innerHTML = regionInput; 

}

//Output the country to the screen

function outputCountry(countryInput) {

    countryText.innerHTML = countryInput;

}

//Output city and region to the screen

function outputCityRegion(cityInput,regionInput) {

    cityRegionText.innerHTML = cityInput + ", " + regionInput;

}

//Out the precipiration to the screen

function outputPrecip(precipInput) {
    precipText.innerHTML = precipInput;
}

//Output it feels like temperature to screen

function outputItFeelsLike(feelsLikeInput) {
    feelsLikeText.innerHTML = feelsLikeInput;
}

//Output the high and low temperature forecase to screen

function outputHighLowTemp(highTemp,lowTemp)
{
    highTempText.innerHTML = highTemp;
    lowTempText.innerHTML = lowTemp;

}

//Output the chance of rain or snow

function outputChanceOfRainSnow(chanceOfRain,chanceOfSnow) {
    
    chanceOfRainText.innerHTML = chanceOfRain;
    chanceOfSnowText.innerHTML = chanceOfSnow;
}

//Output the humidity
function outputHumidity(humidityInput) {
    humidityText.innerHTML = humidityInput;
    console.log(humidityText);
}

function outputUV(uvInput) 
{
    uvText.innerHTML = uvInput;
}

function outputWindGust(windGustInput) 
{
    windGustText.innerHTML = windGustInput;
}

function outputPressure(pressureInput) {
    pressureText.innerHTML  = pressureInput;
}

function outputDayForecast(
    dateInput, iconInput, highTempInput, lowTempInput, chanceOfPrecipInput, windInput) {
 
        day1dateText.innerHTML = dateInput;
        day1Icon.innerHTML = "<img class='weather-icon' src='https:" + iconInput +  "'>";
        day1HighTempText.innerHTML = highTempInput;
        day1LowTempText.innerHTML = lowTempInput;
        day1ChanceOfPrecipText.innerHTML = chanceOfPrecipInput;
        day1Wind.innerHTML = windInput;
}

/**
 * Output the weather alert
 * 
 * @param {*} headlineInput 
 * @param {*} categoryInput 
 * @param {*} eventInput 
 * @param {*} descriptionInput 
 */

function outputAlert(headlineInput, categoryInput, eventInput, descriptionInput) {

    alertHeadline.innerHTML = headlineInput;
    alertCategory.innerHTML = categoryInput;
    alertEvent.innerHTML = eventInput;

    console.log(descriptionInput);

}
