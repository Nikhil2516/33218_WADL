import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor() {}

  public name = '';
  public email = '';
  public password = '';
  public phone = '';

  ngOnInit(): void {
    const rawData = localStorage.getItem('userData');
    let userData = JSON.parse(rawData!);
    console.log(userData);
    this.name = userData.name || '';
    this.email = userData.email || '';
    this.password = userData.password || '';
    this.phone = userData.phone || '';
  }
}
