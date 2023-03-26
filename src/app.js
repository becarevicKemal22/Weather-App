import './style.sass';
import {TabButton} from './components/tabButton/tabButton';
import { SearchBar } from './components/searchBar/searchBar';
import { MainDisplay} from './components/mainDisplay/mainDisplay';
import { SecondaryDisplay } from './components/secondaryDisplay/secondaryDisplay';
import { Weather } from './Weather';

class App{
  constructor(){
    this.weather = new Weather();

    this.main = document.querySelector('.main');
    this.leftSide = this.main.querySelector('.displays');
    this.rightSide = this.main.querySelector('.tabbedDisplay');

    this.searchBar = new SearchBar();
    this.leftSide.appendChild(this.searchBar.getElement());

    this.mainDisplay = new MainDisplay();
    this.leftSide.appendChild(this.mainDisplay.getElement());
    //* Add request for current location and appropriate display if not allowed

    this.secondaryDisplay = new SecondaryDisplay();
    this.leftSide.appendChild(this.secondaryDisplay.getElement());
    
  }

  getCurrentPosition(){
    return new Promise((resolve, reject) => {
      if(!navigator.geolocation){
        reject("Navigator API not available");
      }
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        resolve({
          lat: lat,
          lon: lon
        });
      });
    });
  }

  async tryCurrentLocation(){
    try{
      const location = await this.getCurrentPosition();
      const data = await this.weather.getWeatherForLocation(location.lat, location.lon);
      console.log(data);
      const parsed = this.parseRawWeatherData(data);
      this.mainDisplay.updateDisplay(parsed.mainDisplayData);
      this.secondaryDisplay.updateDisplay(parsed.secondaryDisplayData);
    }
    catch{

    }
    
  }

  parseRawWeatherData(data){
    const hour = new Date().getHours();
    const mainDisplayData = {
      "city": data.city,
      "temperature": Math.round(data.current.temp),
      "chanceOfRain": data.hourly[hour].pop * 100,
      "code": data.current.weather[0].id
    }

    const secondaryDisplayData = {
      "feelsLike": data.current.feels_like,
      "humidity": data.current.humidity,
      "wind": data.current.wind_speed,
      "UV": data.current.uvi
    }

    return {
      "mainDisplayData": mainDisplayData,
      "secondaryDisplayData": secondaryDisplayData
    }
  }
}

const app = new App();
app.tryCurrentLocation();

  