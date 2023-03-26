import template from './tabButtonTemplate'
import './tabButton.sass'

export class TabButton{
    constructor(value){
        this.htmlEl = document.createElement('div');
        this.htmlEl.classList.add('tabButton');
        this.htmlEl.innerHTML = template;
        this.htmlEl.querySelector('input').value = value;
    }

    setActive(){
        this.htmlEl.classList.add("active");
    }

    setInactive(){
        this.htmlEl.classList.remove("active");
    }

    getElement(){
        return this.htmlEl;
    }
}