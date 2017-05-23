var apiKey = '&APPID=f4e83aa77ae6dd52961e234800550216';
var url = 'http://api.openweathermap.org/data/2.5/weather?q=';
var celsius = '&units=metric';
var fahrenheit  = '&units=imperial';
var defaultURL = 'http://api.openweathermap.org/data/2.5/weather?q=Brampton&units=metric&APPID=f4e83aa77ae6dd52961e234800550216';
var defaultCity = 'Brampton';
var city;
var mode = '&mode=JSON&APPID=f4e83aa77ae6dd52961e234800550216';

//geting info
var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', defaultURL);
//what should happen once the data is loaded
ourRequest.onload = function(){
    city = defaultCity;
    console.log(JSON.parse(ourRequest.responseText));
    var ourData2 = JSON.parse(ourRequest.responseText);
    //renderHTML(ourData2);
    currentWeather(ourData2);
    //fiveDayForcast();
    //fiveDayForcast(url,city,celsius,appID,apiKey);
};
ourRequest.send();

//current weather
function currentWeather(data){
    //var htmlString = "this is a test";
    document.getElementById("temp").innerHTML = data.main.temp + '&degC';
    document.getElementById("humidity").innerHTML = 'Humudity: ' + data.main.humidity + '%';
    document.getElementById("icon").src = 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
    document.getElementById("wind").innerHTML = 'Wind Speed: ' + data.wind.speed + ' km/h [' + windDirection(data.wind.deg) + ']';
    document.getElementById("des").innerHTML = data.weather[0].description;
    country = data.sys.country;
    document.getElementById("city").innerHTML = data.name + ', ' +country;
    var rise = new Date(data.sys.sunrise*1000).toTimeString();
    var set = new Date(data.sys.sunset*1000).toTimeString();
    //console.log(rise);
    //console.log(set);
    document.getElementById("rise").innerHTML ='Sunrise: ' + rise.substring(0,8) + ' AM';
    document.getElementById("set").innerHTML ='Sunset: ' + set.substring(0,8) + ' PM';
}
//direction
function windDirection(object){
    if ((object >= 0 && object <=11.25) || (object >= 348.75 && object <=360.00))
    {
        windDirection = 'N';
    }
    else if (object >= 11.25 && object <=33.75)
    {
        windDirection = 'NNE';
    }
    else if (object >= 33.75 && object <=56.25)
    {
        windDirection = 'NE';
    }
    else if (object >= 56.25 && object <=78.75)
    {
        windDirection = 'ENE';
    }
    else if (object >= 78.75 && object <=101.25)
    {
        windDirection = 'E';
    }
    else if (object >= 101.25 && object <=123.75)
    {
        windDirection = 'ESE';
    }
    else if (object >= 123.75 && object <=146.25)
    {
        windDirection = 'SE';
    }
    else if (object >= 146.25 && object <=168.75)
    {
        windDirection = 'SSE';
    }
    else if (object >= 168.75 && object <=191.25)
    {
        windDirection = 'S';
    }
    else if (object >= 191.25 && object <=213.75)
    {
        windDirection = 'SSW';
    }
    else if (object >= 213.75 && object <=236.25)
    {
        windDirection = 'SW';
    }
    else if (object >= 236.25 && object <=258.75)
    {
        windDirection = 'WSW';
    }
    else if (object >= 258.75 && object <=281.25)
    {
        windDirection = 'W';
    }
    else if (object >= 281.25 && object <=303.75)
    {
        windDirection = 'WNW';
    }
    else if (object >= 303.75 && object <=326.25)
    {
        windDirection = 'NW';
    }
    else
    {
        windDirection = 'NNW';
    }
    return windDirection;

}
//weekday
function weekday(day){
    //var day = new Date(data.list[i].dt*1000).getDay();
    var weekday;
    if(day == 0)
    {
        weekday = 'Sunday';
    }
    else if (day == 1)
    {
        weekday = 'Monday';
    }
    else if (day == 2)
    {
        weekday = 'Tuesday';
    }
    else if (day == 3)
    {
        weekday = 'Wednesday';
    }
    else if (day == 4)
    {
        weekday = 'Thursday';
    }
    else if (day == 5)
    {
        weekday = 'Friday';
    }
    else
    {
        weekday = 'Saturday';
    }

    return weekday;

}
//five day
function fiveDayForcast()
{
    ourRequest.open('GET', fiveDay + city + ','+ country + celsius +mode);
    //what should happen once the data is loaded
    ourRequest.onload = function(){
        console.log(JSON.parse(ourRequest.responseText));
        var ourData2 = (JSON.parse(ourRequest.responseText));
        sendHTML(ourData2);
        hourly(ourData2,celsius);
        //weekDays(ourData2);
    };
    ourRequest.send();

    function sendHTML(data){
        var counter = 40;
        var count = 1;
        var string = count.toString();
        for (i =0; i<counter; i=i+8 )
        {
            string = count.toString();
            if (count > 0 && count <6)
            {
                var day = new Date(data.list[i].dt*1000).getDay();
                var hour  = new Date(data.list[i].dt*1000).getHours();
                var time = data.list[i].dt_txt;
                var date =  time.substring(0,10);
                console.log(weekday(day))
                document.getElementById("day" + string).innerHTML = weekday(day); //data.list[i].dt;
                document.getElementById("date" + string).innerHTML = date; //data.list[i].dt;
                document.getElementById("time" + string).innerHTML = time.substring(10,19);
                document.getElementById("des" + string).innerHTML = data.list[i].weather[0].description;
                document.getElementById("pic" + string).src = 'http://openweathermap.org/img/w/' + data.list[i].weather[0].icon + '.png';
                document.getElementById("temp" + string).innerHTML = data.list[i].main.temp + '&degC';
                document.getElementById("humi" + string).innerHTML = data.list[i].main.humidity + '%';
                document.getElementById("windS" + string).innerHTML = data.list[i].wind.speed + 'km/hr';
            }
            count++;
        }
    }
}
function cityFunction(){
    ourRequest.open('GET',url + city + celsius + appID + apiKey);
    ourRequest.onload = function(){
        console.log(JSON.parse(ourRequest.responseText));
        var ourData2 = JSON.parse(ourRequest.responseText);
        var ourData2 = JSON.parse(ourRequest.responseText);
        renderHTML(ourData2);
        //fiveDayForcast();
        //hourly(data, celsius);

    };
    ourRequest.send();
}
//to add html into the div
function renderHTML(data){
    //var htmlString = "this is a test";
    document.getElementById("temp").innerHTML = data.main.temp + '&degC';
    document.getElementById("humidity").innerHTML = 'Humudity: ' + data.main.humidity + '%';
    document.getElementById("icon").src = 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
    document.getElementById("wind").innerHTML = 'Wind Speed: ' + data.wind.speed + ' km/h [' + windDirection(data.wind.deg) + ']';
    document.getElementById("des").innerHTML = data.weather[0].description;
    //document.getElementById("detail").innerHTML = data.weather[0].main;
    country = data.sys.country;
    document.getElementById("city").innerHTML = data.name + ', ' +country;
    var rise = new Date(data.sys.sunrise*1000).toTimeString();
    var set = new Date(data.sys.sunset*1000).toTimeString();
    console.log(rise);
    console.log(set);
    document.getElementById("rise").innerHTML ='Sunrise: ' + rise.substring(0,8) + ' AM';
    document.getElementById("set").innerHTML ='Sunset: ' + set.substring(0,8) + ' PM';
}
