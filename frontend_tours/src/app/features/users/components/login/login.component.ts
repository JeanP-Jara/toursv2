import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  dataLogin: Usuario = {
    c_codigo: '',
    c_contrasena: '',
    id_usuario: 0
  };

  constructor(
    public router: Router, 
  ) { }

  ngOnInit(): void {
  }

  login(e: any){
    console.log(this.dataLogin);    
    //[routerLink]="['/usuario']"
    this.router.navigate(['/administracion']);
  }

}
