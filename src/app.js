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
    this.messageDisplay = this.main.querySelector('messageDisplay');

    this.searchBar = new SearchBar();
    this.leftSide.appendChild(this.searchBar.getElement());

    this.mainDisplay = new MainDisplay();
    this.leftSide.appendChild(this.mainDisplay.getElement());
    //* Add request for current location and appropriate display if not allowed

    this.secondaryDisplay = new SecondaryDisplay();
    this.leftSide.appendChild(this.secondaryDisplay.getElement());

    this.title = null;
    this.text = null;
    
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
      this.displayMessage({"title": "Loading...", "text": "We're trying to load your location"})
      const location = await this.getCurrentPosition();
      const data = await this.weather.getWeatherForLocation(location.lat, location.lon);
      console.log(data);
      const parsed = this.parseRawWeatherData(data);
      this.mainDisplay.updateDisplay(parsed.mainDisplayData);
      this.secondaryDisplay.updateDisplay(parsed.secondaryDisplayData);
      
      this.removeMessage();
    }
    catch{

    }
    
  }

  parseRawWeatherData(data){
    const hour = new Date().getHours();
    const mainDisplayData = {
      "city": data.city,
      "temperature": Math.round(data.current.temp),
      "chanceOfRain": data.hourly[0].pop * 100,
      "code": data.current.weather[0].id
    }

    const secondaryDisplayData = {
      "feelsLike": data.current.feels_like,
      "humidity": data.current.humidity,
      "wind": data.current.wind_speed,
      "UV": data.current.uvi
    }

    const hourlyData = [];
    let currentAddedHours = 2;
    for(let i = 0; i < 7; i++){
      const dataForHour = data.hourly[currentAddedHours];
      if(hour + currentAddedHours >= 24){
        dataForHour.hour = hour + currentAddedHours - 24;
      }else{
        dataForHour.hour = hour + currentAddedHours;
      }
      hourlyData[i] = dataForHour; 
      currentAddedHours += 3;
    }

    const dailyData = [];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    for(let i = 0; i < 7; i++){
      let day = data.daily[i];
      let date = new Date(day.dt * 1000);
      day.dayName = days[date.getDay()];
      day.date = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0');
      dailyData[i] = day;
    }

    return {
      "mainDisplayData": mainDisplayData,
      "secondaryDisplayData": secondaryDisplayData,
      "hourlyData": hourlyData,
      "dailyData": dailyData
    }
  }

  displayMessage(message){
    this.leftSide.classList.add("message");
    this.mainDisplay.getElement().remove();
    this.secondaryDisplay.getElement().remove();

    this.title = document.createElement('h1');
    this.title.classList.add('messageTitle');
    this.title.textContent = message.title;
    this.leftSide.appendChild(this.title);
    
    this.text = document.createElement('p');
    this.text.classList.add('messageText');
    this.text.textContent = message.text;
    this.leftSide.appendChild(this.text);
  }

  removeMessage(){
    this.title.remove();
    this.text.remove();

    this.leftSide.appendChild(this.mainDisplay.getElement());
    this.leftSide.appendChild(this.secondaryDisplay.getElement());
    this.leftSide.classList.remove("message");
  }
}

const app = new App();
app.tryCurrentLocation();