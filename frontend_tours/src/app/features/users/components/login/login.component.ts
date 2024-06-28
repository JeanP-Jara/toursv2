import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { SnackInterface } from 'src/app/shared/models/snack';
import { SnackComponent } from 'src/app/shared/components/snack/snack.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private _usuario_service: UsuarioService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  login(e: any){
    console.log(this.dataLogin);    
    //[routerLink]="['/usuario']"
    
    this._usuario_service.login(this.dataLogin).subscribe((res=>{
      let dataScnack: SnackInterface = {
        mensaje: '' ,
        tipo: 2500
      }
      if(res.estado){
        dataScnack.mensaje = 'Usuario autenticado!';
        localStorage.setItem('currentUser', JSON.stringify(res)); 
        this.router.navigate(['/administracion']);
      }else{
        dataScnack.mensaje = res.mensaje
      }      
      this.snackBar.openFromComponent(SnackComponent, {
        duration: 2000,
        data: dataScnack
      });
    }));
  }

}
