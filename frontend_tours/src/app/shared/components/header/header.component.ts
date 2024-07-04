import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackInterface } from '../../models/snack';
import { SnackComponent } from '../snack/snack.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public snackBar: MatSnackBar,
  ) { }

  objsnack: SnackInterface = {
    mensaje: "",
    tipo: 0
  };

  ngOnInit(): void {
  }

  public getToken(): any {
    let currentUser = JSON.parse(localStorage.getItem("currentUser")!);
    return currentUser;
  }

  public openSnackBar(mensaje: String, tipo: number) {    
    this.objsnack.mensaje = mensaje;
    this.objsnack.tipo = tipo;
    this.snackBar.openFromComponent(SnackComponent, {
      duration: 2500,
      data: this.objsnack
    });    
  }

}
