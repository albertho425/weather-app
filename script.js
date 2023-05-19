//Declare constants and variables

weatherAPIKey = "ca80ffda470e4eca8e4235808230905";
mapAPIKey = "aG8NIzp3QrvPAfPAcatmWUYjhlHsaOcy";
geoAPIkey = "eec122638c9e4b6397e0c2634019c4bc"

let formPlaceholder = document.getElementById("formInput").placeholder;
// let ipAddressText = document.getElementById("ipAddress");
let cityRegionText = document.getElementById("cityRegion");
let countryText = document.getElementById("country");
let dateTimeText = document.getElementById("localTime");

let weatherTempText = document.getElementById("weatherTemp");
let weatherConditionsText = document.getElementById("weatherConditions");
let weatherIcon = document.getElementById("weatherIcon");
let visibilityText = document.getElementById("visibility");
let sunriseText = document.getElementById("sunrise");
let sunsetText = document.getElementById("sunset");
let mapText = document.getElementById("map");

let windText = document.getElementById("wind");
let windGustText = document.getElementById("windGust");
let windDegree = document.getElementById("windDegree");

let precipText = document.getElementById("precipitation");
let feelsLikeText = document.getElementById("feelsLike");
let highTempText = document.getElementById("weatherHigh");
let lowTempText = document.getElementById("weatherLow");
let chanceOfRainText = document.getElementById("chanceOfRain");
let chanceOfSnowText = document.getElementById("chanceOfSnow");
let humidityText = document.getElementById("humidity");

let uvText = document.getElementById("uv");
let pressureText = document.getElementById("pressure");

let day1dateText = document.getElementById("1dayDate");
let day1Icon = document.getElementById("1dayWeatherIcon");
let day1HighTempText = document.getElementById("1dayTempHigh");
let day1LowTempText = document.getElementById("1dayTempLow");
let day1ChanceOfPrecipText = document.getElementById("1dayPrecip");
let day1Wind = document.getElementById("1dayWind");

let day2dateText = document.getElementById("2dayDate");
let day2Icon = document.getElementById("2dayWeatherIcon");
let day2HighTempText = document.getElementById("2dayTempHigh");
let day2LowTempText = document.getElementById("2dayTempLow");
let day2ChanceOfPrecipText = document.getElementById("2dayPrecip");
let day2Wind = document.getElementById("2dayWind");


//weather alerts
let alertHeadline = document.getElementById("alertHeadline");
let alertCategory = document.getElementById("alertCategory");
let alertEvent = document.getElementById("alertEvent");
let alertDescription = document.getElementById("alertDescription");

let theFormInput = document.getElementById("formInput");
let alertDiv = document.getElementById("alert");

let countryIcon = document.getElementById("countryEmoji");
let timeZone =  document.getElementById("timezone");


// When the page loads, run these functions
window.onload = getData();


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

            let countryCode = result.country_code;
            let countryEmoji = getFlagEmoji(countryCode);
            
            getMapfromAPI(theLat,theLong);
            
            // outputIpAddress(ipAdress);
            outputCityRegion(theCity,theRegion);
            outputCountry(theCountry);
            getWeatherData(theCity);      

            outputCountryEmoji(countryEmoji);

            console.log(theCity);
            
            // when getting weather data automatically by IP, get the city and fill it in the form box
            let formPlaceholder = document.getElementById("formInput").placeholder = theCity;



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
            let dateTime = weatherResult.location.localtime;
            let theTimeZone = weatherResult.location.tz_id;
            let autoWindDegree = weatherResult.current.wind_degree;

            outputTimeZone(theTimeZone);
            outputWeatherTemp(theWeather);
            outputWeatherConditions(condtionDescription);
            outputWeatherIcon(theWeatherIcon);
            outputVisibility(theVisibility);
            outputWind(windSpeed,windDir);
            outputPrecip(thePrecip);
            outputItFeelsLike(itFeelsLike);
            outputDateTime(dateTime);

            outputWindDegree(autoWindDegree);
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
 * Display weather alerts using the weather API
 * @param {*} alertInput 
 */

async function weatherAlerts(alertInput) {

    const weatherUrl = "https://api.weatherapi.com/v1/forecast.json?key=" + weatherAPIKey + "&q=" + alertInput + "&days=1&aqi=yes&alerts=yes";

    try {
        const weatherResponse = await fetch(weatherUrl, {cache: "no-cache"});
        const weatherResult = await weatherResponse.json();

    

        // check if there are weather alerts.
        if (weatherResult.alerts.alert.length == 0) {
            outputAlert("","","","");
            console.log("no weather alerts");
            alertDiv.classList.add("hide");
            
        } else {
            let alert = weatherResult.alerts.alert[0].headline;
            let alertCategory = weatherResult.alerts.alert[0].category;
            let alertEvent = weatherResult.alerts.alert[0].event;
            let alertDescription = weatherResult.alerts.alert[0].desc;

            outputAlert(alert,alertCategory,alertEvent);
            console.log("*** Weather alert ***")
        }
    }
 catch (error) {
    if (error) throw error;
    console.log("the weather forecast Alert API: ", error);

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

            weatherAlerts(ipAddressInput);
            
            let dailyHigh = weatherResult.forecast.forecastday[0].day.maxtemp_c;
            let dailyLow = weatherResult.forecast.forecastday[0].day.mintemp_c;

            
            let chanceOfRain = weatherResult.forecast.forecastday[0].day.daily_chance_of_rain;
            let chanceOfSnow = weatherResult.forecast.forecastday[0].day.daily_chance_of_snow;


            let forecastDay1 = weatherResult.forecast.forecastday[1];
            let forecastDay2 = weatherResult.forecast.forecastday[2];
            // let forecastDay3 = weatherResult.forecast.forecastday[2];


            //Forecast date
            let forecastDay1Date = forecastDay1.date;
            let forecastDay1TempHigh = forecastDay1.day.maxtemp_c;
            let forecastDay1TempLow = forecastDay1.day.mintemp_c;
            let forecastDay1Rain = forecastDay1.day.daily_chance_of_rain;
            let forecastDay1Snow = forecastDay1.day.daily_chance_of_snow;
            let forecastDay1MaxWind = forecastDay1.day.maxwind_kph;
            let forecastDay1Icon = forecastDay1.day.condition.icon;

            let forecastDay2Date = forecastDay2.date;
            let forecastDay2TempHigh = forecastDay2.day.maxtemp_c;
            let forecastDay2TempLow = forecastDay2.day.mintemp_c;
            let forecastDay2Rain = forecastDay2.day.daily_chance_of_rain;
            let forecastDay2Snow = forecastDay2.day.daily_chance_of_snow;
            let forecastDay2MaxWind = forecastDay2.day.maxwind_kph;
            let forecastDay2Icon = forecastDay2.day.condition.icon;

            outputDayForecast(forecastDay1Date, forecastDay1Icon,forecastDay1TempHigh, forecastDay1TempLow, forecastDay1Rain, forecastDay1MaxWind);

            outputDay2Forecast(forecastDay2Date, forecastDay2Icon,forecastDay2TempHigh, forecastDay2TempLow, forecastDay2Rain, forecastDay2MaxWind);
            
            
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
            
            let theWeather = weatherResult.current.temp_c;
            let condtionDescription = weatherResult.current.condition["text"];
            let theWeatherIcon = weatherResult.current.condition["icon"];
            let theVisibility = weatherResult.current.vis_km;

            let windSpeed = weatherResult.current.wind_kph;
            let windDir = weatherResult.current.wind_dir;
            let theWindDegree = weatherResult.current.wind_degree;
            console.log("wind degree from form " + theWindDegree);
            let windGust = weatherResult.current.gust_kph;

            let thePrecip = weatherResult.current.precip_mm;
            let itFeelsLike = weatherResult.current.feelslike_c;
            let humidity = weatherResult.current.humidity;
            
            let uv = weatherResult.current.uv;
            let pressure = weatherResult.current.pressure_mb;

            let lat = weatherResult.location.lat;
            let lon = weatherResult.location.lon;
            let countryFromFormInput = weatherResult.location.country;
            console.log(countryFromFormInput);
            

            // let found = countryListAllIsoData.find(country => country.name === races.Circuit.Location.country);
            // let code = found ? found.code3 : 'n/a';


            outputCityRegion(theCity,theRegion);
            // outputCountry(theCountry);
            let theCountryCode = getCodeOfCountry(theCountry);
            console.log("*** country code from form input is: " + theCountryCode);
            let countryEmoji = getFlagEmoji(theCountryCode);
            outputCountryEmoji(countryEmoji);


            getMapfromAPI(lat,lon);

            outputWeatherTemp(theWeather);
            outputWeatherConditions(condtionDescription);
            outputWeatherIcon(theWeatherIcon);
            outputVisibility(theVisibility);
            outputWind(windSpeed,windDir);
            outputPrecip(thePrecip);
            outputItFeelsLike(itFeelsLike);

            console.log("***********" + theWindDegree);
            outputWindDegree(theWindDegree);
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
 *  Get the flag emoji from a country code
 * @param {*} countryCode 
 * @returns the country emoji
 */

function getFlagEmoji(countryCode) {

    return countryCode.toUpperCase().replace(/./g, char => 
        String.fromCodePoint(127397 + char.charCodeAt())
    );
  }

/**
 * Get a two character country code from a country name
 * @param {*} countryInput 
 * @returns country code
 */
function getCodeOfCountry(countryInput) {

    
    // let codeResult = countries.find( country => country.name === countryInput.value).code;
    // console.log("*** " + codeResult);
    // // return codeResult;

    // console.log("*** *** " + countries.find( country => country.name === countryInput ).code);
    
    let value = countryInput;
    console.log("*** *** *** value of countryInput is " + value);
    // let answer =  countries.find( country => country.name === countryInput.value ).code
    let answer =  countries.find( country => country.name === value ).code
    console.log("*** *** " + answer);
    return answer;

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

function outputDay2Forecast(
    dateInput, iconInput, highTempInput, lowTempInput, chanceOfPrecipInput, windInput) {
 
        day2dateText.innerHTML = dateInput;
        day2Icon.innerHTML = "<img class='weather-icon' src='https:" + iconInput +  "'>";
        day2HighTempText.innerHTML = highTempInput;
        day2LowTempText.innerHTML = lowTempInput;
        day2ChanceOfPrecipText.innerHTML = chanceOfPrecipInput;
        day2Wind.innerHTML = windInput;
       
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

function outputDateTime(dateTimeInput) {

    dateTimeText.innerHTML = dateTimeInput;
}

function outputCountryEmoji(emojiInput) {
    countryIcon.innerHTML = emojiInput;
}

function outputTimeZone(timezoneInput) {
    timeZone.innerHTML = timezoneInput;
}

function outputWindDegree(windDegreeInput) {
    windDegree.innerHTML = windDegreeInput;
    
}

const countries = [
    {name: "Afghanistan",code: "AF"},
    {name: "Aland Islands",code: "AX"},
    {name: "Albania",code: "AL"},
    {name: "Algeria",code: "DZ"},
    {name: "American Samoa",code: "AS"},
    {name: "Andorra",code: "AD"},
    {name: "Angola",code: "AO"},
    {name: "Anguilla",code: "AI"},
    {name: "Antarctica",code: "AQ"},
    {name: "Antigua and Barbuda",code: "AG"},
    {name: "Argentina",code: "AR"},
    {name: "Armenia",code: "AM"},
    {name: "Aruba",code: "AW"},
    {name: "Australia",code: "AU"},
    {name: "Austria",code: "AT"},
    {name: "Azerbaijan",code: "AZ"},
    {name: "Bahamas",code: "BS"},
    {name: "Bahrain",code: "BH"},
    {name: "Bangladesh",code: "BD"},
    {name: "Barbados",code: "BB"},
    {name: "Belarus",code: "BY"},
    {name: "Belgium",code: "BE"},
    {name: "Belize",code: "BZ"},
    {name: "Benin",code: "BJ"},
    {name: "Bermuda",code: "BM"},
    {name: "Bhutan",code: "BT"},
    {name: "Bolivia",code: "BO"},
    {name: "Bonaire, Sint Eustatius and Saba",code: "BQ"},
    {name: "Bosnia and Herzegovina",code: "BA"},
    {name: "Botswana",code: "BW"},
    {name: "Bouvet Island",code: "BV"},
    {name: "Brazil",code: "BR"},
    {name: "British Indian Ocean Territory",code: "IO"},
    {name: "Brunei Darussalam",code: "BN"},
    {name: "Bulgaria",code: "BG"},
    {name: "Burkina Faso",code: "BF"},
    {name: "Burundi",code: "BI"},
    {name: "Cambodia",code: "KH"},
    {name: "Cameroon",code: "CM"},
    {name: "Canada",code: "CA"},
    {name: "Cape Verde",code: "CV"},
    {name: "Cayman Islands",code: "KY"},
    {name: "Central African Republic",code: "CF"},
    {name: "Chad",code: "TD"},
    {name: "Chile",code: "CL"},
    {name: "China",code: "CN"},
    {name: "Christmas Island",code: "CX"},
    {name: "Cocos (Keeling) Islands",code: "CC"},
    {name: "Colombia",code: "CO"},
    {name: "Comoros",code: "KM"},
    {name: "Congo",code: "CG"},
    {name: "Congo, Democratic Republic of the Congo",code: "CD"},
    {name: "Cook Islands",code: "CK"},
    {name: "Costa Rica",code: "CR"},
    {name: "Cote D'Ivoire",code: "CI"},
    {name: "Croatia",code: "HR"},
    {name: "Cuba",code: "CU"},
    {name: "Curacao",code: "CW"},
    {name: "Cyprus",code: "CY"},
    {name: "Czech Republic",code: "CZ"},
    {name: "Denmark",code: "DK"},
    {name: "Djibouti",code: "DJ"},
    {name: "Dominica",code: "DM"},
    {name: "Dominican Republic",code: "DO"},
    {name: "Ecuador",code: "EC"},
    {name: "Egypt",code: "EG"},
    {name: "El Salvador",code: "SV"},
    {name: "Equatorial Guinea",code: "GQ"},
    {name: "Eritrea",code: "ER"},
    {name: "Estonia",code: "EE"},
    {name: "Ethiopia",code: "ET"},
    {name: "Falkland Islands (Malvinas)",code: "FK"},
    {name: "Faroe Islands",code: "FO"},
    {name: "Fiji",code: "FJ"},
    {name: "Finland",code: "FI"},
    {name: "France",code: "FR"},
    {name: "French Guiana",code: "GF"},
    {name: "French Polynesia",code: "PF"},
    {name: "French Southern Territories",code: "TF"},
    {name: "Gabon",code: "GA"},
    {name: "Gambia",code: "GM"},
    {name: "Georgia",code: "GE"},
    {name: "Germany",code: "DE"},
    {name: "Ghana",code: "GH"},
    {name: "Gibraltar",code: "GI"},
    {name: "Greece",code: "GR"},
    {name: "Greenland",code: "GL"},
    {name: "Grenada",code: "GD"},
    {name: "Guadeloupe",code: "GP"},
    {name: "Guam",code: "GU"},
    {name: "Guatemala",code: "GT"},
    {name: "Guernsey",code: "GG"},
    {name: "Guinea",code: "GN"},
    {name: "Guinea-Bissau",code: "GW"},
    {name: "Guyana",code: "GY"},
    {name: "Haiti",code: "HT"},
    {name: "Heard Island and McDonald Islands",code: "HM"},
    {name: "Holy See (Vatican City State)",code: "VA"},
    {name: "Honduras",code: "HN"},
    {name: "Hong Kong",code: "HK"},
    {name: "Hungary",code: "HU"},
    {name: "Iceland",code: "IS"},
    {name: "India",code: "IN"},
    {name: "Indonesia",code: "ID"},
    {name: "Iran, Islamic Republic of",code: "IR"},
    {name: "Iraq",code: "IQ"},
    {name: "Ireland",code: "IE"},
    {name: "Isle of Man",code: "IM"},
    {name: "Israel",code: "IL"},
    {name: "Italy",code: "IT"},
    {name: "Jamaica",code: "JM"},
    {name: "Japan",code: "JP"},
    {name: "Jersey",code: "JE"},
    {name: "Jordan",code: "JO"},
    {name: "Kazakhstan",code: "KZ"},
    {name: "Kenya",code: "KE"},
    {name: "Kiribati",code: "KI"},
    {name: "Korea, Democratic People's Republic of",code: "KP"},
    {name: "Korea, Republic of",code: "KR"},
    {name: "Kosovo",code: "XK"},
    {name: "Kuwait",code: "KW"},
    {name: "Kyrgyzstan",code: "KG"},
    {name: "Lao People's Democratic Republic",code: "LA"},
    {name: "Latvia",code: "LV"},
    {name: "Lebanon",code: "LB"},
    {name: "Lesotho",code: "LS"},
    {name: "Liberia",code: "LR"},
    {name: "Libyan Arab Jamahiriya",code: "LY"},
    {name: "Liechtenstein",code: "LI"},
    {name: "Lithuania",code: "LT"},
    {name: "Luxembourg",code: "LU"},
    {name: "Macao",code: "MO"},
    {name: "Macedonia, the Former Yugoslav Republic of",code: "MK"},
    {name: "Madagascar",code: "MG"},
    {name: "Malawi",code: "MW"},
    {name: "Malaysia",code: "MY"},
    {name: "Maldives",code: "MV"},
    {name: "Mali",code: "ML"},
    {name: "Malta",code: "MT"},
    {name: "Marshall Islands",code: "MH"},
    {name: "Martinique",code: "MQ"},
    {name: "Mauritania",code: "MR"},
    {name: "Mauritius",code: "MU"},
    {name: "Mayotte",code: "YT"},
    {name: "Mexico",code: "MX"},
    {name: "Micronesia, Federated States of",code: "FM"},
    {name: "Moldova, Republic of",code: "MD"},
    {name: "Monaco",code: "MC"},
    {name: "Mongolia",code: "MN"},
    {name: "Montenegro",code: "ME"},
    {name: "Montserrat",code: "MS"},
    {name: "Morocco",code: "MA"},
    {name: "Mozambique",code: "MZ"},
    {name: "Myanmar",code: "MM"},
    {name: "Namibia",code: "NA"},
    {name: "Nauru",code: "NR"},
    {name: "Nepal",code: "NP"},
    {name: "Netherlands",code: "NL"},
    {name: "Netherlands Antilles",code: "AN"},
    {name: "New Caledonia",code: "NC"},
    {name: "New Zealand",code: "NZ"},
    {name: "Nicaragua",code: "NI"},
    {name: "Niger",code: "NE"},
    {name: "Nigeria",code: "NG"},
    {name: "Niue",code: "NU"},
    {name: "Norfolk Island",code: "NF"},
    {name: "Northern Mariana Islands",code: "MP"},
    {name: "Norway",code: "NO"},
    {name: "Oman",code: "OM"},
    {name: "Pakistan",code: "PK"},
    {name: "Palau",code: "PW"},
    {name: "Palestinian Territory, Occupied",code: "PS"},
    {name: "Panama",code: "PA"},
    {name: "Papua New Guinea",code: "PG"},
    {name: "Paraguay",code: "PY"},
    {name: "Peru",code: "PE"},
    {name: "Philippines",code: "PH"},
    {name: "Pitcairn",code: "PN"},
    {name: "Poland",code: "PL"},
    {name: "Portugal",code: "PT"},
    {name: "Puerto Rico",code: "PR"},
    {name: "Qatar",code: "QA"},
    {name: "Reunion",code: "RE"},
    {name: "Romania",code: "RO"},
    {name: "Russian Federation",code: "RU"},
    {name: "Rwanda",code: "RW"},
    {name: "Saint Barthelemy",code: "BL"},
    {name: "Saint Helena",code: "SH"},
    {name: "Saint Kitts and Nevis",code: "KN"},
    {name: "Saint Lucia",code: "LC"},
    {name: "Saint Martin",code: "MF"},
    {name: "Saint Pierre and Miquelon",code: "PM"},
    {name: "Saint Vincent and the Grenadines",code: "VC"},
    {name: "Samoa",code: "WS"},
    {name: "San Marino",code: "SM"},
    {name: "Sao Tome and Principe",code: "ST"},
    {name: "Saudi Arabia",code: "SA"},
    {name: "Senegal",code: "SN"},
    {name: "Serbia",code: "RS"},
    {name: "Serbia and Montenegro",code: "CS"},
    {name: "Seychelles",code: "SC"},
    {name: "Sierra Leone",code: "SL"},
    {name: "Singapore",code: "SG"},
    {name: "St Martin",code: "SX"},
    {name: "Slovakia",code: "SK"},
    {name: "Slovenia",code: "SI"},
    {name: "Solomon Islands",code: "SB"},
    {name: "Somalia",code: "SO"},
    {name: "South Africa",code: "ZA"},
    {name: "South Georgia and the South Sandwich Islands",code: "GS"},
    {name: "South Sudan",code: "SS"},
    {name: "Spain",code: "ES"},
    {name: "Sri Lanka",code: "LK"},
    {name: "Sudan",code: "SD"},
    {name: "Suriname",code: "SR"},
    {name: "Svalbard and Jan Mayen",code: "SJ"},
    {name: "Swaziland",code: "SZ"},
    {name: "Sweden",code: "SE"},
    {name: "Switzerland",code: "CH"},
    {name: "Syrian Arab Republic",code: "SY"},
    {name: "Taiwan, Province of China",code: "TW"},
    {name: "Tajikistan",code: "TJ"},
    {name: "Tanzania, United Republic of",code: "TZ"},
    {name: "Thailand",code: "TH"},
    {name: "Timor-Leste",code: "TL"},
    {name: "Togo",code: "TG"},
    {name: "Tokelau",code: "TK"},
    {name: "Tonga",code: "TO"},
    {name: "Trinidad and Tobago",code: "TT"},
    {name: "Tunisia",code: "TN"},
    {name: "Turkey",code: "TR"},
    {name: "Turkmenistan",code: "TM"},
    {name: "Turks and Caicos Islands",code: "TC"},
    {name: "Tuvalu",code: "TV"},
    {name: "Uganda",code: "UG"},
    {name: "Ukraine",code: "UA"},
    {name: "United Arab Emirates",code: "AE"},
    {name: "United Kingdom",code: "GB"},
    {name: "United States",code: "US"},
    {name: "United States of America",code: "US"},
    {name: "United States Minor Outlying Islands",code: "UM"},
    {name: "Uruguay",code: "UY"},
    {name: "Uzbekistan",code: "UZ"},
    {name: "Vanuatu",code: "VU"},
    {name: "Venezuela",code: "VE"},
    {name: "Viet Nam",code: "VN"},
    {name: "Virgin Islands, British",code: "VG"},
    {name: "Virgin Islands, U.s.",code: "VI"},
    {name: "Wallis and Futuna",code: "WF"},
    {name: "Western Sahara",code: "EH"},
    {name: "Yemen",code: "YE"},
    {name: "Zambia",code: "ZM"},
    {name: "Zimbabwe",code: "ZW"}
];
