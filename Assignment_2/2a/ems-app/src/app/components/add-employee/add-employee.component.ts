import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {
  employee: Employee = {
    name: '',
    dept: '',
    exp: 0,
    sal: 0,
  };
  submitted = false;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {}

  saveEmployee(): void {
    const data = {
      name: this.employee.name,
      dept: this.employee.dept,
      exp: this.employee.exp,
      sal: this.employee.sal,
    };

    this.employeeService.create(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e),
    });
  }

  newEmployee(): void {
    this.submitted = false;
    this.employee = {
      name: '',
      dept: '',
      sal: 0,
      exp: 0,
    };
  }
}
