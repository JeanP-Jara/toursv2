import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public getToken(): any {
    let currentUser = JSON.parse(localStorage.getItem("currentUser")!);
    return currentUser;
  }

}
