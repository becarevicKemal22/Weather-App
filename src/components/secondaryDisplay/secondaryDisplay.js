import template from './secondaryDisplayTemplate'
import './secondaryDisplay.sass'

export class SecondaryDisplay{
    constructor(){
        this.htmlEl = document.createElement('div');
        this.htmlEl.classList.add('secondaryDisplay');
        this.htmlEl.innerHTML = template;
    }

    updateDisplay(data){
        console.log(this.htmlEl.querySelector('#fl'));
        this.htmlEl.querySelector('#fl').textContent = Math.round(data.feelsLike) + "°C";
        this.htmlEl.querySelector('#h').textContent = data.humidity + "%";
        this.htmlEl.querySelector('#w').textContent = (Math.round(data.wind * 10) / 10) + " km/h";
        this.htmlEl.querySelector('#UV').textContent = data.UV;
    }

    getElement(){
        return this.htmlEl;
    }
}