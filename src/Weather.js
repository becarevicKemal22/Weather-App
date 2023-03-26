export class Weather{
    constructor(){
        this.apiKey = "57473794f811e1fd56efe019a14f687e";
    }

    async getWeatherForLocation(lat, lon){
        const result = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=alerts,minutely&appid=${this.apiKey}`);

        const data = await result.json();

        const city = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=2&appid=${this.apiKey}`);
        const cityList = await city.json();
        const cityName = cityList[0].name.replace('City of ', '');

        data.city = cityName;

        return data;
    }
}