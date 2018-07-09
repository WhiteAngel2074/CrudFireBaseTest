import { EmployeeService } from './shared/employee.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  count: number = 300;
  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
  }

}
