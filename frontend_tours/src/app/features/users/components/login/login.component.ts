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

  valCapcha: boolean = false;
  spinner: boolean = false;

  

  constructor(
    public router: Router, 
    private _usuario_service: UsuarioService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  resolved(captchaResponse: string) {
    //console.log(`Resolved captcha with response: ${captchaResponse}`);
    if (captchaResponse != null) {
      this.valCapcha = true;
    }
  }

  loginAttempts: number = 0;

  login(e: any){
    this.spinner = true;
    console.log(this.dataLogin);
    
    this.loginAttempts++;

    const delay = Math.min(1000 * Math.pow(2, this.loginAttempts), 3000);

    setTimeout(() => {
      this._usuario_service.login(this.dataLogin).subscribe((res=>{
        let dataScnack: SnackInterface = {
          mensaje: '' ,
          tipo: 2500
        }
        if(res.estado){
          this.spinner = false;
          dataScnack.mensaje = 'Usuario autenticado!';
          localStorage.setItem('currentUser', JSON.stringify(res)); 
          this.router.navigate(['/administracion']);
        }else{
          this.spinner = false;
          dataScnack.mensaje = res.mensaje
        }      
        this.snackBar.openFromComponent(SnackComponent, {
          duration: 2000,
          data: dataScnack
        });
      }));
    }, delay);    
  }
}
