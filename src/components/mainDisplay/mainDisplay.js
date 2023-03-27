import template from './mainDisplayTemplate'
import './mainDisplay.sass'

import { getIconClassNameForWeatherCode } from '../../Weather';

export class MainDisplay{
    constructor(){
        this.htmlEl = document.createElement('div');
        this.htmlEl.classList.add('mainDisplay');
        this.htmlEl.innerHTML = template;
    }

    updateDisplay(data){
        this.htmlEl.querySelector('.cityName').textContent = data.city;
        this.htmlEl.querySelector('.temperature').textContent = data.temperature + "°C";
        this.htmlEl.querySelector('.chanceOfRain').textContent = "Chance of rain: " + Math.round(data.chanceOfRain) + "%";
        this.htmlEl.querySelector('i').classList = getIconClassNameForWeatherCode(data.code);
    }

    getElement(){
        return this.htmlEl;
    }
}