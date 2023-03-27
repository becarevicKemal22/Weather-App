import template from './tabbedDisplayTemplate'
import './tabbedDisplay.sass'

export class TabbedDisplay{
    constructor(){
        this.htmlEl = document.createElement('div');
        this.htmlEl.classList.add('tabbedDisplay');
        this.htmlEl.innerHTML = template;
        this.hourlyTab = null;
        this.dailyTab = null;
    }

    updateDisplay(hourlyData, dailyData){
        if(!this.hourlyTab && !this.dailyTab){
            this.constructHourlyTab(hourlyData);
            this.constructDailyTab(dailyData);
        }else{
            this.updateHourlyTab(hourlyData);
            this.updateDailyTab(dailyData);
        }
    }

    changeTab(tabNumber){
        if(tabNumber == 1){
            this.hourlyTab.classList.remove("hidden");
            this.dailyTab.classList.add("hidden");
        }
        else if(tabNumber == 2){
            this.hourlyTab.classList.add("hidden");
            this.dailyTab.classList.remove("hidden");
        }
    }

    constructHourlyTab(hourlyData){
        this.hourlyTab = document.createElement('div');
        this.hourlyTab.classList.add('hourlyTab');
        for(let i = 0; i < hourlyData.length; i++){
            let dataItem = hourlyData[i];
            let item = this.htmlEl.querySelector('#item').content.firstElementChild.cloneNode(true);
            item.querySelector(".date").textContent = dataItem.date;

            item.querySelector('i').classList = this.getIconClass(dataItem.weather[0].id);

            item.querySelector(".hourOrDay").textContent = dataItem.hour + ":00";
            
            item.querySelector(".temps").querySelector("h4").textContent = dataItem.temp + "°C";

            this.hourlyTab.appendChild(item);
        }
        this.htmlEl.appendChild(this.hourlyTab);
    }

    updateHourlyTab(hourlyData){
        let items = this.hourlyTab.querySelectorAll(".item");
        for(let i = 0; i < hourlyData.length; i++){
            let dataItem = hourlyData[i];
            let item = items[i];

            item.querySelector(".date").textContent = dataItem.date;

            item.querySelector('i').classList = this.getIconClass(dataItem.weather[0].id);

            item.querySelector(".hourOrDay").textContent = dataItem.hour + ":00";
            
            item.querySelector(".temps").querySelector("h4").textContent = dataItem.temp + "°C";

            this.hourlyTab.appendChild(item);
        }
    }


    constructDailyTab(dailyData){
        this.dailyTab = document.createElement('div');
        this.dailyTab.classList.add('dailyTab');
        for(let i = 0; i < dailyData.length; i++){
            let dataItem = dailyData[i];
            let item = this.htmlEl.querySelector('#item').content.firstElementChild.cloneNode(true);
            item.querySelector(".date").textContent = dataItem.date;

            item.querySelector('i').classList = this.getIconClass(dataItem.weather[0].id);
            item.querySelector(".hourOrDay").textContent = dataItem.dayName;
            
            item.querySelector(".temps").querySelector("h4").textContent = Math.round(dataItem.temp.max) + "°C / " + Math.round(dataItem.temp.min) + "°C";

            this.dailyTab.appendChild(item);
        }
        this.dailyTab.classList.add("hidden");
        this.htmlEl.appendChild(this.dailyTab);
    }

    updateDailyTab(dailyData){
        let items = this.dailyTab.querySelectorAll(".item");
        for(let i = 0; i < dailyData.length; i++){
            let dataItem = dailyData[i];
            let item = items[i];
            
            item.querySelector(".date").textContent = dataItem.date;

            item.querySelector('i').classList = this.getIconClass(dataItem.weather[0].id);
            item.querySelector(".hourOrDay").textContent = dataItem.dayName;
            
            item.querySelector(".temps").querySelector("h4").textContent = Math.round(dataItem.temp.max) + "°C / " + Math.round(dataItem.temp.min) + "°C";

            this.dailyTab.appendChild(item);
        }
        this.dailyTab.classList.add("hidden");
    }

    getIconClass(code){
        const codeFirstDigit = parseInt(code.toString().charAt(0));
        if(codeFirstDigit == 2){
            return "fa-solid fa-cloud-bolt fa-fw";
        }
        else if(codeFirstDigit == 3){
            return "fa-solid fa-cloud-sun-rain fa-fw";
        }
        else if(codeFirstDigit == 5){
            return "fa-solid fa-cloud-showers-heavy fa-fw";
        }
        else if(codeFirstDigit == 6){
            return "fa-solid fa-cloud-meatball fa-fw";
        }
        else if(codeFirstDigit == 7){
            return "fa-solid fa-smog fa-fw";
        }
        else if(codeFirstDigit == 8){
            if(code == 800){
                return "fa-solid fa-sun fa-fw";
            }else{
                return "fa-solid fa-cloud fa-fw";
            }
        }
    }

    getElement(){
        return this.htmlEl;
    }
}