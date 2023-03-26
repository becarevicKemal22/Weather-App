import './test.sass';
import template from './testTemplate';

export class Test{

    constructor(){
        this.htmlEl = new DOMParser().parseFromString(template, 'text/html').querySelector("template").content;
        console.log(this.htmlEl);
    }

    getElement(){
        return this.htmlEl;
    }
}