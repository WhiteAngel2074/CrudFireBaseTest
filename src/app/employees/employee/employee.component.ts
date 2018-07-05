import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  @ViewChild(ToastContainerDirective) toastContainer: ToastContainerDirective;

  constructor(private employeeService: EmployeeService, private toastr: ToastrService) { }

  ngOnInit() {
    this.employeeService.getData();
    this.resetForm();
  }

  onSubmit(employeeForm: NgForm) {

    if (employeeForm.value.$key == null) {
      this.employeeService.insertEmployee(employeeForm.value);
      this.toastr.success('Submitted Succefully', 'Employee Register');
    } else {
      this.employeeService.updateData(employeeForm.value);
      this.toastr.warning('Updated Succefully', 'Employee Update');
    }
    this.resetForm(employeeForm);
  }

  resetForm(employeeForm?: NgForm) {
    if (employeeForm != null) {
      employeeForm.reset();
      this.employeeService.selectedEmployee = {
        $key: null,
        name: '',
        position: '',
        office: '',
        salary: 0,
      };
    }
  }

}
