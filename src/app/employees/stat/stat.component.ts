import { Employee } from './../shared/employee.model';
import { map } from 'rxjs/operators';
import { Component, OnInit, Input } from '@angular/core';
import { WeatherService } from '../shared/weather.service';
import { EmployeeService } from '../shared/employee.service';
import { Chart } from 'chart.js';
import { element } from 'protractor';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
export class StatComponent implements OnInit {
  @Input()
  parentCount: number;
  chart = [];
  charty = [];
  employeeList: Employee[];
  salaries = [];
  positions = [];
  constructor(private _weather: WeatherService, private employeeService: EmployeeService) { }

  ngOnInit() {
    this._weather.dailyForecast().subscribe(res => {
      // console.log(res);
      // const temp_max = res['list'].map(res => res.main.temp_max);
      // const temp_min = res['list'].map(res => res.main.temp_min);
      // const alldates = res['list'].map(res => res.dt);


      // // const json = JSON.parse(res);
      // // console.log('Le cal ', json.res.calctime);

      // // initialize the date !!

      // const weatherDates = [];
      // alldates.forEach((resi) => {
      //   const jsdate = new Date(resi * 1000);
      //   weatherDates.push(jsdate.toLocaleDateString('fr', { year: 'numeric', month: 'short', day: 'numeric' }));
      // });

      // console.log(weatherDates);

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
                callback: function (value, index, values) {
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
            }],
            scaleLabel: { fontSize: 200 }
          }
        }
      });

      // end Chart
    });

    // From Firebase
    const x = this.employeeService.getData();
    x.snapshotChanges().subscribe(lol => {
      this.employeeList = [];
      // tslint:disable-next-line:no-shadowed-variable
      lol.forEach(element => {
        const s = element.payload.toJSON();
        // console.log('Positions', s['position']);
        this.positions.push(s['position']);
        console.log('Les positions', this.positions);

        this.salaries.push(s['salary']);
        console.log('Les salaires', this.salaries);

        s['$key'] = element.key;
        const cc = this.employeeList;
        cc.push(s as Employee);
        // console.log('--------------->', cc);
      });

      // integrate Charty !
      this.charty = new Chart('canvass', {
        type: 'bar',
        data: {
        //  labels: this.positions,
        labels: ['Reponse A', 'Reponse B', 'Reponse C'],
          datasets: [{
            label: ' Votes ',
            data: ['50', '100', '80' ],
            // data: this.salaries,
            backgroundColor: '#3cba9f',
            fill: false
          }]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              barPercentage: 0.8,
              display: true
            }],
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              display: true
            }],
            scaleLabel: { fontSize: 200 }
          }
        }
      });
      // end Charty
    });
  }

}
