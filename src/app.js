import './style.sass';
import {TabButton} from './components/tabButton/tabButton';
import { SearchBar } from './components/searchBar/searchBar';
import { MainDisplay} from './components/mainDisplay/mainDisplay';
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

    return {
      "mainDisplayData": mainDisplayData,
    }
  }
}

const app = new App();
app.tryCurrentLocation();

  