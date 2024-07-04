import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsuarioService } from '../../../users/services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackComponent } from 'src/app/shared/components/snack/snack.component';
import { SnackInterface } from 'src/app/shared/models/snack';
import { Usuario } from '../../../users/models/usuario';

@Component({
  selector: 'app-admin-usuario-editar',
  templateUrl: './admin-usuario-editar.component.html',
  styleUrls: ['./admin-usuario-editar.component.css']
})
export class AdminUsuarioEditarComponent implements OnInit {

  usuario!: Usuario;
  editar: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<AdminUsuarioEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario,
    private _usuario_service: UsuarioService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    console.log(this.data);
    this.editarUsuario();
  }

  editarUsuario(){
    if (this.data == null) {
      this.inicializar();
      this.editar = false;
    } else {
      this.usuario = this.data;
      this.editar = true;
    }
  }

  inicializar(){
    this.usuario = {
      id_usuario: 0,
      c_codigo: '', 
      c_contrasena: ''
    };
  }

  guardar(newForm:any){
    console.log(this.usuario);
    if(this.editar){
      this.actualizar(this.usuario);
    }else{
      this.agregar(this.usuario);  
    }
  }

  actualizar(usuario: any){    
    this._usuario_service.updateUsuario(usuario).subscribe((res=>{
      let dataScnack: SnackInterface = {
        mensaje: '' ,
        tipo: 2500
      }
      if(res.estado){
        dataScnack.mensaje = 'Usuario actualizado!'
        
      }else{
        dataScnack.mensaje = 'OCURRIO UN ERROR!'
        console.log("OCURRIO UN ERROR");
      }      
      this.snackBar.openFromComponent(SnackComponent, {
        duration: 2000,
        data: dataScnack
      });
      this.dialogRef.close({ flag: true, data: this.usuario });
    }));
  }

  agregar(usuario: any){
    this._usuario_service.insertUsuario(usuario).subscribe((res=>{
      let dataScnack: SnackInterface = {
        mensaje: '' ,
        tipo: 2500
      }
      if(res.estado){
        dataScnack.mensaje = 'Usuario agregado'
        
      }else{
        dataScnack.mensaje = 'OCURRIO UN ERROR!'
        console.log("OCURRIO UN ERROR");
      }      
      this.snackBar.openFromComponent(SnackComponent, {
        duration: 2000,
        data: dataScnack,
      });
      this.dialogRef.close({ flag: true, data: this.usuario });
    }));
  }

}
