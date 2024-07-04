import { Component, Inject, OnInit } from '@angular/core';
import { Departamento } from '../../models/departamento';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DepartamentoService } from '../../services/departamento.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackInterface } from 'src/app/shared/models/snack';
import { SnackComponent } from 'src/app/shared/components/snack/snack.component';

@Component({
  selector: 'app-admin-departamento-editar',
  templateUrl: './admin-departamento-editar.component.html',
  styleUrls: ['./admin-departamento-editar.component.css']
})
export class AdminDepartamentoEditarComponent implements OnInit {

  departamento!: Departamento;
  editar: boolean=false;

  constructor(
    private dialogRef: MatDialogRef<AdminDepartamentoEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Departamento,
    private _departamento_service: DepartamentoService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.editarActividad();   
    console.log("departamento", this.departamento);
    
    
  }

  editarActividad(){
    if (this.data == null) {
      this.inicializar();
      this.editar = false;
    } else {
      this.departamento = this.data;
      this.editar = true;
    }
  }

  inicializar(){
    this.departamento = {
      n_id_departamento: 0,
      c_nombre: ''
    };
  }


  guardar(newForm:any){
    console.log(this.departamento);
    if(this.editar){
      this.actualizarActividad(this.departamento);
    }else{
      this.agregarActividad(this.departamento);  
    }
  }

  actualizarActividad(departamento: Departamento){    
    this._departamento_service.actualizar(departamento).subscribe((res=>{
      let dataScnack: SnackInterface = {
        mensaje: '' ,
        tipo: 2500
      }
      if(res.estado){
        dataScnack.mensaje = 'Departamento actualizada'
        
      }else{
        dataScnack.mensaje = 'OCURRIO UN ERROR!'
        console.log("OCURRIO UN ERROR");
      }      
      this.snackBar.openFromComponent(SnackComponent, {
        duration: 2000,
        data: dataScnack
      });
      this.dialogRef.close({ flag: true, data: this.departamento });
    }));
  }

  agregarActividad(departamento: Departamento){
    this._departamento_service.agregar(departamento).subscribe((res=>{
      let dataScnack: SnackInterface = {
        mensaje: '' ,
        tipo: 2500
      }
      if(res.estado){
        dataScnack.mensaje = 'Departamento agregada'
        
      }else{
        dataScnack.mensaje = 'OCURRIO UN ERROR!'
        console.log("OCURRIO UN ERROR");
      }      
      this.snackBar.openFromComponent(SnackComponent, {
        duration: 2000,
        data: dataScnack,
      });
      this.dialogRef.close({ flag: true, data: this.departamento });
    }));
  }
}
