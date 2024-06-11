import { Component, Inject, OnInit } from '@angular/core';
import { Lugar } from '../models/lugar';
import { LugarService } from '../services/lugar.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackComponent } from 'src/app/shared/components/snack/snack.component';
import { SnackInterface } from 'src/app/shared/models/snack';
import { DepartamentoService } from '../services/departamento.service';
import { Departamento } from '../models/departamento';

@Component({
  selector: 'app-admin-lugar-editar',
  templateUrl: './admin-lugar-editar.component.html',
  styleUrls: ['./admin-lugar-editar.component.css']
})
export class AdminLugarEditarComponent implements OnInit {

  lugar!: Lugar;
  editar: boolean=false;
  departamentos: Departamento[] = [];

  constructor(
    private dialogRef: MatDialogRef<AdminLugarEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Lugar,
    private _lugar_service: LugarService,
    private _departamento_service: DepartamentoService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.listarDepartamentos();
    this.editarActividad();   
    console.log("departamento", this.lugar);    
  }

  editarActividad(){
    if (this.data == null) {
      this.inicializar();
      this.editar = false;
    } else {
      this.lugar = this.data;
      this.editar = true;
    }
  }

  inicializar(){
    this.lugar = {
      n_id_lugar: 0,
      n_id_departamento: 0,
      c_nombre: '', 
      departamento: ''
    };
  }


  guardar(newForm:any){
    console.log(this.lugar);
    if(this.editar){
      this.actualizar(this.lugar);
    }else{
      this.agregar(this.lugar);  
    }
  }

  actualizar(lugar: Lugar){    
    this._lugar_service.actualizar(lugar).subscribe((res=>{
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
      this.dialogRef.close({ flag: true, data: this.lugar });
    }));
  }

  agregar(lugar: Lugar){
    this._lugar_service.agregar(lugar).subscribe((res=>{
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
      this.dialogRef.close({ flag: true, data: this.lugar });
    }));
  }

  listarDepartamentos(){
    this._departamento_service.listar({}).subscribe((res=>{
      if(res.estado){
        console.log(res.data);        
        this.departamentos = res.data;
      }else{
        //this.openSnackBar(res.mensaje, 2500);
        console.log("OCURRIO UN ERROR");
      }      
    }));
  }

}
