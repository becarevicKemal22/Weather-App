import template from './tabbedDisplayTemplate'
import './tabbedDisplay.sass'

import { getIconClassNameForWeatherCode } from '../../Weather';

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
            this.removeTemplateElement();
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

            this.setHourlyItemData(item, dataItem);

            this.hourlyTab.appendChild(item);
        }
        this.htmlEl.appendChild(this.hourlyTab);
    }

    updateHourlyTab(hourlyData){
        let items = this.hourlyTab.querySelectorAll(".item");
        for(let i = 0; i < hourlyData.length; i++){
            let dataItem = hourlyData[i];
            let item = items[i];

            this.setHourlyItemData(item, dataItem);

            this.hourlyTab.appendChild(item);
        }
    }

    setHourlyItemData(item, dataItem){
        item.querySelector(".date").textContent = dataItem.date;

        item.querySelector('i').classList = getIconClassNameForWeatherCode(dataItem.weather[0].id);

        item.querySelector(".hourOrDay").textContent = dataItem.hour + ":00";
            
        item.querySelector(".temps").querySelector("h4").textContent = dataItem.temp + "°C";
    }


    constructDailyTab(dailyData){
        this.dailyTab = document.createElement('div');
        this.dailyTab.classList.add('dailyTab');
        for(let i = 0; i < dailyData.length; i++){
            let dataItem = dailyData[i];
            let item = this.htmlEl.querySelector('#item').content.firstElementChild.cloneNode(true);
            
            this.setDailyItemData(item, dataItem);

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
            
            this.setDailyItemData(item, dataItem);

            this.dailyTab.appendChild(item);
        }
        this.dailyTab.classList.add("hidden");
    }

    setDailyItemData(item, dataItem){
        item.querySelector(".date").textContent = dataItem.date;

        item.querySelector('i').classList = getIconClassNameForWeatherCode(dataItem.weather[0].id);

        item.querySelector(".hourOrDay").textContent = dataItem.dayName;

        item.querySelector(".temps").querySelector("h4").textContent = Math.round(dataItem.temp.max) + "°C / " + Math.round(dataItem.temp.min) + "°C";
    }

    removeTemplateElement(){
        this.htmlEl.querySelector("#item").remove();
    }

    getElement(){
        return this.htmlEl;
    }
}