import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }

  login() {
    const rawData = localStorage.getItem('userData');
    let userData = JSON.parse(rawData!);
    console.log(userData);
    console.log(this.loginForm.value);

    if (
      userData.email === this.loginForm.value.email &&
      userData.password === this.loginForm.value.password
    ) {
      alert('Login Successfully');
      this.loginForm.reset();
      this.router.navigate(['dashboard']);
    } else alert('Some error ! Check Password');
  }
}
