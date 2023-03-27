export class Weather{
    constructor(){
        this.apiKey = "57473794f811e1fd56efe019a14f687e";
        this.googleAPIKey = "AIzaSyBzG3mqfB_03DiTJlCaWvHO5cwAz0YujQM";
    }

    async getWeatherForLocation(lat, lon, name = null){

        // return tempData;
        const result = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=alerts,minutely&appid=${this.apiKey}`);

        const data = await result.json();

        let city;
        if(!name){
            const res = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=2&appid=${this.apiKey}`);
            const cityList = await res.json();
            city = cityList[0];
            city = city.name.replace('City of ', '');
        }else{
            city = name;
        }
        
        data.city = city;
        return data;
    }

    async getLocationFromCityName(name){
        if(name.length == 0){
            return;
        }
        const result = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${name}&key=${this.googleAPIKey}`);
        let location = await result.json();
        let loc = {"lat": location.results[0].geometry.location.lat, "lon": location.results[0].geometry.location.lng, "name": location.results[0].address_components[0].long_name};
        if(!loc){
            throw "Location not found!";
        }
        return loc;
    }
}