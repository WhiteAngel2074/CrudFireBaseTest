import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../shared/weather.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
export class StatComponent implements OnInit {
  chart = [];
  constructor(private _weather: WeatherService) { }

  ngOnInit() {
    this._weather.dailyForecast().subscribe(res => {
      console.log(res);
      const temp_max = res['list'].map(res => res.main.temp_max);
      const temp_min = res['list'].map(res => res.main.temp_min);
      const alldates = res['list'].map(res => res.dt);

      // initialize the date !!

      const weatherDates = [];
      alldates.forEach((resi) => {
        const jsdate = new Date(resi * 1000);
        weatherDates.push(jsdate.toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' }));
      });

      console.log(weatherDates);

      // integrate ChartJS Code
      this.chart = new Chart('canvas', {
        type: 'bar',
        data: {
          labels: weatherDates,
          datasets: [{
            data: temp_max,
            borderColor: '#3cba9f',
            backgroundColor: '#3cba9f',
            fill: false
          },
          {
            data: temp_min,
            borderColor: '#ffcc00',
            backgroundColor: '#ffcc00',
            fill: false
          },
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              barPercentage: 0.8,
              display: true,
              ticks: {
                // Include a dollar sign in the ticks
                callback: function(value, index, values) {
                    return '$' + value;
                },
                scaleLabel: {
                  display: true,
                  labelString: '1k = 1000'
              }
            }
            }],
            yAxes: [{
              display: true
            }]
          }
        }
      });

    });
  }

}
