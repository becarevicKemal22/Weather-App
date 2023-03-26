import template from './mainDisplayTemplate'
import './mainDisplay.sass'

export class MainDisplay{
    constructor(){
        this.htmlEl = document.createElement('div');
        this.htmlEl.classList.add('mainDisplay');
        this.htmlEl.innerHTML = template;
    }

    updateDisplay(data){
        this.htmlEl.querySelector('.cityName').textContent = data.city;
        this.htmlEl.querySelector('.temperature').textContent = data.temperature + "°C";
        this.htmlEl.querySelector('.chanceOfRain').textContent = "Chance of rain: " + data.chanceOfRain + "%";
        const codeFirstDigit = parseInt(data.code.toString().charAt(0));
        if(codeFirstDigit == 2){
            this.htmlEl.querySelector('i').classList = "fa-solid fa-cloud-bolt";
        }
        else if(codeFirstDigit == 3){
            this.htmlEl.querySelector('i').classList = "fa-solid fa-cloud-sun-rain";
        }
        else if(codeFirstDigit == 5){
            this.htmlEl.querySelector('i').classList = "fa-solid fa-cloud-showers-heavy";
        }
        else if(codeFirstDigit == 6){
            this.htmlEl.querySelector('i').classList = "fa-solid fa-cloud-meatball";
        }
        else if(codeFirstDigit == 7){
            this.htmlEl.querySelector('i').classList = "fa-solid fa-smog";
        }
        else if(codeFirstDigit == 8){
            if(data.code == 800){
                this.htmlEl.querySelector('i').classList = "fa-solid fa-sun";
            }else{
                this.htmlEl.querySelector('i').classList = "fa-solid fa-cloud";
            }
        }
    }

    getElement(){
        return this.htmlEl;
    }
}