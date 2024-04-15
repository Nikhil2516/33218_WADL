import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public registerForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: [''],
      email: [''],
      password: [''],
      phone: [''],
    });
  }

  register() {
    console.log(this.registerForm.value);
    var userPass = this.registerForm.value;
    localStorage.setItem('userData', JSON.stringify(userPass));
    alert('Registered Successfully');
    this.registerForm.reset();
    this.router.navigate(['login']);
  }
}
