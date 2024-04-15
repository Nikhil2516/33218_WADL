import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css'],
})
export class ListEmployeeComponent implements OnInit {
  employees?: Employee[];
  currentEmployee: Employee = {};
  currentIndex = -1;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.retrieveEmployees();
  }

  retrieveEmployees(): void {
    this.employeeService.getAll().subscribe({
      next: (res: any) => {
        console.log('Data Employees', res);
        this.employees = res.data.employees;
      },
      error: (e) => console.error(e),
    });
  }

  refreshList(): void {
    this.retrieveEmployees();
    this.currentEmployee = {};
    this.currentIndex = -1;
  }

  removeAllEmployees(): void {
    this.employeeService.deleteAll().subscribe({
      next: (res) => {
        console.log(res);
        this.refreshList();
        alert('Database Cleared');
      },
      error: (e) => console.error(e),
    });
  }

  deleteEmployee(empId: String): void {
    this.employeeService.delete(empId).subscribe({
      next: (res) => {
        console.log(res);
        this.refreshList();
        alert('Employee Removed');
      },
      error: (e) => console.error(e),
    });
  }
}
