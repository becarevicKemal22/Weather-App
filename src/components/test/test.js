import './test.css';

export class Test{

    constructor(){
        this.htmlEl = document.createElement('h2');
        this.htmlEl.innerHTML = "EVO KOMPONENTA";
    }

    getElement(){
        return this.htmlEl;
    }
}