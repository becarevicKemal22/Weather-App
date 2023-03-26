import template from './searchBarTemplate'
import './searchBar.sass'

export class SearchBar{
    constructor(){
        this.htmlEl = document.createElement('div');
        this.htmlEl.classList.add('searchBar');
        this.htmlEl.innerHTML = template;
    }

    getElement(){
        return this.htmlEl;
    }
}