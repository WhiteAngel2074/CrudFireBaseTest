import { Employee } from './employee.model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employeeList: AngularFireList<any>;
  selectedEmployee: Employee = new Employee();

  constructor(private firebase: AngularFireDatabase) { }

  // retreive Data from FireBase DB ;)
  getData() {
    this.employeeList = this.firebase.list('employees');
    return this.employeeList;
  }

  // insert Data 

  insertEmployee(employee: Employee) {
    this.employeeList.push({
      name: employee.name,
      position: employee.position,
      office: employee.office,
      salary: employee.salary
    });
  }

  // Update Data !! 
  updateData(employee: Employee) {
    this.employeeList.update(employee.$key, {
      name: employee.name,
      position: employee.position,
      office: employee.office,
      salary: employee.salary
    })
  }

  // delete Data !! 

  deleteEmployee($key: string) {
    this.employeeList.remove($key);
  }
}
