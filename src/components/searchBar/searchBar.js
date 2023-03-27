import template from './searchBarTemplate'
import './searchBar.sass'

import { Weather } from '../../Weather';

export class SearchBar{
    constructor(){
        this.htmlEl = document.createElement('div');
        this.htmlEl.classList.add('searchBar');
        this.htmlEl.innerHTML = template;
        this.weather = new Weather();
        this.input = this.htmlEl.querySelector('input');
        let options = {
            types: ["(cities)"]
        }

        const autocomplete = new google.maps.places.Autocomplete(this.input, options);        
    }

    getElement(){
        return this.htmlEl;
    }
}