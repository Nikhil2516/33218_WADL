import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-details-employee',
  templateUrl: './details-employee.component.html',
  styleUrls: ['./details-employee.component.css'],
})
export class DetailsEmployeeComponent implements OnInit {
  @Input() viewMode = false;

  @Input() currentEmployee: Employee = {
    name: '',
    dept: '',
    exp: 0,
    sal: 0,
  };

  message = '';
  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.viewMode) {
      this.getEmployee(this.route.snapshot.params['id']);
    }
  }

  getEmployee(id: string): void {
    this.employeeService.get(id).subscribe({
      next: (res: any) => {
        console.log('Employee Data : ', res);
        this.currentEmployee = res.data.employee;
        console.log(this.currentEmployee);
      },
      error: (e) => console.error(e),
    });
  }

  updateEmployee(): void {
    this.message = '';

    this.employeeService
      .update(this.currentEmployee._id, this.currentEmployee)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message
            ? res.message
            : 'This tutorial was updated successfully!';

          alert('Employee Details Updated');
          this.router.navigate(['/employees']);
        },
        error: (e) => console.error(e),
      });
  }

  deleteEmployee(): void {
    this.employeeService.delete(this.currentEmployee._id).subscribe({
      next: (res) => {
        console.log(res);
        alert('Employee Removed');
        this.router.navigate(['/employees']);
      },
      error: (e) => console.error(e),
    });
  }
}
