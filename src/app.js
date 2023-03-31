import './style.sass';
import { TabButton } from './components/tabButton/tabButton';
import { SearchBar } from './components/searchBar/searchBar';
import { MainDisplay} from './components/mainDisplay/mainDisplay';
import { SecondaryDisplay } from './components/secondaryDisplay/secondaryDisplay';
import { TabbedDisplay } from './components/tabbedDisplay/tabbedDisplay';
import { Weather } from './Weather';

class App{
    constructor(){
        this.weather = new Weather();

        this.main = document.querySelector('.main');
        this.leftSide = this.main.querySelector('.displays');
        this.rightSide = this.main.querySelector('.secondDisplay');
        this.buttonContainer = this.rightSide.querySelector(".tabs");
        this.messageDisplay = this.main.querySelector('.messageDisplay');

        this.searchBar = new SearchBar();
        this.leftSide.appendChild(this.searchBar.getElement());

        this.searchBar.getElement().querySelector('input').addEventListener("keypress", (event) => {
            if(event.key === "Enter"){
                event.preventDefault();
                this.getWeatherForSearch(this.searchBar.getElement().querySelector('input').value);
                this.searchBar.getElement().querySelector('input').value = "";
            }
        });

        this.searchBar.getElement().querySelector('button').addEventListener("click", () => {
            this.getWeatherForSearch(this.searchBar.getElement().querySelector('input').value);
            this.searchBar.getElement().querySelector('input').value = "";
        });

        console.log(document.querySelector('.pac-container'));

        this.mainDisplay = new MainDisplay();
        this.leftSide.appendChild(this.mainDisplay.getElement());

        this.secondaryDisplay = new SecondaryDisplay();
        this.leftSide.appendChild(this.secondaryDisplay.getElement());

        this.hourlyButton = new TabButton("Today");
        this.hourlyButton.setActive();


        this.buttonContainer.appendChild(this.hourlyButton.getElement());

        this.dailyButton = new TabButton("Next 7 days");
        this.buttonContainer.appendChild(this.dailyButton.getElement());

        this.tabbedDisplay = new TabbedDisplay();
        this.rightSide.appendChild(this.tabbedDisplay.getElement());

        this.hourlyButton.getElement().addEventListener("click", () => {
            this.hourlyButton.setActive();
            this.dailyButton.setInactive();
            this.tabbedDisplay.changeTab(1);
        })

        this.dailyButton.getElement().addEventListener("click", () => {
            this.dailyButton.setActive();
            this.hourlyButton.setInactive();
            this.tabbedDisplay.changeTab(2);
        })

        this.title = null;
        this.text = null;
    }

    getCurrentPosition(){
        return new Promise((resolve, reject) => {
            const response = fetch("https://ipinfo.io/json?token=9f54b5ca88b3df");
            response.then((data) => {
                return data.json();
            }).then((data) => {
                resolve({
                    lat: data.loc.split(",")[0],
                    lon: data.loc.split(",")[1]
                });
            }).catch((err) => {
                console.log("Error: " + err);
                if(!navigator.geolocation){
                    reject("Couldn't get location");
                }
                navigator.geolocation.getCurrentPosition((position) => {
                    let lat = position.coords.latitude;
                    let lon = position.coords.longitude;
                    resolve({
                        lat: lat,
                        lon: lon
                    });
                })
            });
        });
    }


    async tryCurrentLocation(){
        try{
            this.displayMessage({"title": "Loading...", "text": "We're trying to load your location"})
            const location = await this.getCurrentPosition();
            const data = await this.weather.getWeatherForLocation(location.lat, location.lon);
            const parsed = this.parseRawWeatherData(data);
            this.mainDisplay.updateDisplay(parsed.mainDisplayData);
            this.secondaryDisplay.updateDisplay(parsed.secondaryDisplayData);
            this.tabbedDisplay.updateDisplay(parsed.hourlyData, parsed.dailyData);
            this.removeMessage();
        }
        catch{
            this.removeMessage();
            this.displayMessage({"title": "Oops! Something went wrong", "text": "Loading your location isn't available in your browser, or you've blocked it."})
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

        const hourlyData = []
        let currentAddedHours = 2;
        for(let i = 0; i < 7; i++){

            const dataForHour = data.hourly[currentAddedHours];
            if(hour + currentAddedHours >= 24){
                dataForHour.hour = String(hour + currentAddedHours - 24).padStart(2, '0');
            }else{
                dataForHour.hour = String(hour + currentAddedHours).padStart(2, '0');
            }
            let date = new Date(dataForHour.dt * 1000);
            dataForHour.date = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0');
            dataForHour.temp = String(Math.round(dataForHour.temp)).padStart(2, ' ');
            hourlyData[i] = dataForHour;
            currentAddedHours += 3;
        }

        const dailyData = [];
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        for(let i = 0; i < 7; i++){
            let day = data.daily[i];
            let date = new Date(day.dt * 1000);
            if(i === 0){
                day.dayName = "Today";
            }else{
                day.dayName = days[date.getDay()];
            }
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
        this.rightSide.classList.add("hidden");

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

        this.rightSide.classList.remove("hidden");
    }

    async getWeatherForSearch(value){
        try{
            this.removeMessage();
            this.displayMessage({"title": "Loading...", "text": "We're loading weather information"})

            let location = await this.weather.getLocationFromCityName(value);
            const data = await this.weather.getWeatherForLocation(location.lat, location.lon, location.name);

            const parsed = this.parseRawWeatherData(data);

            this.mainDisplay.updateDisplay(parsed.mainDisplayData);
            this.secondaryDisplay.updateDisplay(parsed.secondaryDisplayData);
            this.tabbedDisplay.updateDisplay(parsed.hourlyData, parsed.dailyData);

            this.hourlyButton.setActive();
            this.dailyButton.setInactive();
            this.tabbedDisplay.changeTab(1);

            this.removeMessage();
        }catch(err){
            this.removeMessage();
            this.displayMessage({"title": "Oops! Something went wrong", "text": "We couldn't find that location. Check if you've spelt it correctly."})
        }
    }
}

const app = new App();
app.tryCurrentLocation();


