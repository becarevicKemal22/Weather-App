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

        const data = [];

        this.precipitationTab = this.htmlEl.querySelector('.precipitation');
        this.precipitationChart = new Chart(this.htmlEl.querySelector('#precipitationChart'), {
            type: 'bar',
            data: {
                labels: data.map(row => row.x),
                datasets: [{
                    label: 'Precipitation',
                    data: data.map(row => row.y),
                }]
            },
            options: {
                animation: false,
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 3,
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
                            font:
                                function(context) {
                                    let width = context.chart.width;
                                    let size = Math.round(width / 45);

                                    return {
                                        size: size
                                    };
                                }
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
                            maxRotation: 0,
                            minRotation: 0,
                            autoSkip: false,
                            font:
                                function(context) {
                                    let width = context.chart.width;
                                    let size = Math.round(width / 45);

                                    return {
                                        size: size
                                    };
                                }

                        }
                    }
                },
                plugins: {
                    legend: {
                        position: "bottom",
                        display: false,
                    },
                    tooltip: {
                        enabled: false,
                    }
                },
            },
        })

        this.temperatureTab = this.htmlEl.querySelector('.temperature');
        this.temperatureChart = new Chart(this.htmlEl.querySelector('#temperatureChart'), {
            type: 'bar',
            data: {
                labels: data.map(row => row.x),
                datasets: [{
                    label: 'Temperature',
                    data: data.map(row => row.y),
                }]
            },
            options: {
                animation: false,
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 3,
                scales: {
                    y: {
                        grid: {
                            display: false,
                        },
                        ticks: {
                            callback: function(value) {
                                return Math.round(value) + "°C";
                            },
                            color: 'white',
                            font:
                                function(context) {
                                    let width = context.chart.width;
                                    let size = Math.round(width / 45);

                                    return {
                                        size: size
                                    };
                                }
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
                            maxRotation: 0,
                            minRotation: 0,
                            autoSkip: false,
                            font:
                                function(context) {
                                    let width = context.chart.width;
                                    let size = Math.round(width / 45);

                                    return {
                                        size: size
                                    };
                                }

                        }
                    }
                },
                plugins: {
                    legend: {
                        position: "bottom",
                        display: false,
                    },
                    tooltip: {
                        enabled: false,
                    }
                },
            },

        })

        this.tabs = [this.mInfoTab, this.precipitationTab, this.temperatureTab];
        this.tabs.forEach(tab => {
            tab.classList.add('hidden');
        });
        this.tabs[0].classList.remove('hidden');
    }

    update(data, precipitationData, temperatureData){
        this.updateDisplay(data);
        this.updateChartData(this.precipitationChart, precipitationData);
        this.updateChartData(this.temperatureChart, temperatureData);
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

    clearChart(chart){
        while(chart.data.labels.length > 0){
            chart.data.labels.pop();
            chart.data.datasets.forEach((dataset) => {
                dataset.data.pop();
            });
        }
        chart.update();
    }

    addChartColumn(chart, label, data){
        chart.data.labels.push(label);
        chart.data.datasets.forEach((dataset) => {
            dataset.data.push(data);
        });
    }

    updateChartData(chart, data){
        this.clearChart(chart);
        data.forEach(row => {
            this.addChartColumn(chart, row.x, row.y);
        })
        chart.update();
    }

    getElement(){
        return this.htmlEl;
    }
}