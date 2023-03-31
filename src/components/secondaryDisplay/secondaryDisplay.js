import template from './secondaryDisplayTemplate'
import './secondaryDisplay.sass'

import Chart from 'chart.js/auto';

export class SecondaryDisplay{
    constructor(){
        this.htmlEl = document.createElement('div');
        this.htmlEl.classList.add('secondaryDisplay');
        this.htmlEl.innerHTML = template;

        this.tabButtons = this.htmlEl.querySelectorAll('.tab');
        this.tabButtons[0].classList.add('selected');

        this.tabButtons.forEach((button, i) => {
            button.addEventListener('click', () => {
                this.changeTab(i);
            })
        });

        this.mInfoTab = this.htmlEl.querySelector('.sides');

        const data = [
            {hour: 12, precipitation: 0.25},
            {hour: 13, precipitation: 0.35},
            {hour: 14, precipitation: 0.7},
            {hour: 15, precipitation: 0.1},
            {hour: 16, precipitation: 0},

        ]

        this.precipitationTab = this.htmlEl.querySelector('.precipitation');
        this.precipitationChart = new Chart(this.htmlEl.querySelector('#precipitationChart'), {
            type: 'bar',
            data: {
                labels: data.map(row => row.hour),
                datasets: [{
                    label: 'Precipitation',
                    data: data.map(row => row.precipitation),
                }]
            },
            options: {
                animation: false,
                scales: {
                    y: {
                        grid: {
                            display: false,
                        },
                        beginAtZero: true,
                        max: 1,
                        ticks: {
                            callback: function(value) {
                                return value * 100 + "%";
                            },
                            color: 'white',
                        },

                    },
                    x: {
                        grid: {
                            display: false,
                        },
                        ticks: {
                            callback: function(val, index) {
                                return index % 3 === 0 ? this.getLabelForValue(val) + ":00" : '';
                            },
                            color: 'white',
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: "bottom",
                        display: false
                    },
                    tooltip: {
                        enabled: false,
                    }
                },
            },

        })

        this.tabs = [this.mInfoTab, this.precipitationTab];
        this.tabs.forEach(tab => {
            tab.classList.add('hidden');
        });
        this.tabs[0].classList.remove('hidden');
    }

    updateDisplay(data){
        this.htmlEl.querySelector('#fl').textContent = Math.round(data.feelsLike) + "°C";
        this.htmlEl.querySelector('#h').textContent = data.humidity + "%";
        this.htmlEl.querySelector('#w').textContent = (Math.round(data.wind * 10) / 10) + " km/h";
        this.htmlEl.querySelector('#UV').textContent = data.UV;
    }

    changeTab(num){
        this.tabButtons.forEach(button => {
            button.classList.remove('selected');
        })
        this.tabButtons[num].classList.add('selected');

        this.tabs.forEach(tab => {
            tab.classList.add('hidden');
        })
        this.tabs[num].classList.remove('hidden');
    }

    getElement(){
        return this.htmlEl;
    }
}