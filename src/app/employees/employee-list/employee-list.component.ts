import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employeeList: Employee[];

  constructor(private employeeService: EmployeeService, private toastr: ToastrService) { }

  ngOnInit() {
    const x = this.employeeService.getData();

    x.snapshotChanges().subscribe(item => {
      this.employeeList = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        // console.log(y);
        y['$key'] = element.key;
        this.employeeList.push(y as Employee);
      });
    });
  }

  onEdit(emp: Employee) {
    this.employeeService.selectedEmployee = Object.assign({}, emp);
  }

  onDelete(key: string) {
    if (confirm('Are you sure to delete this item ? ') === true) {
      this.employeeService.deleteEmployee(key);
      this.toastr.error('Deleted Succefully', 'Employee Register');
    }
  }
}
