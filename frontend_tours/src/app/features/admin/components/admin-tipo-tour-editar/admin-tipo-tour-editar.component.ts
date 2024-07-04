import { Component, Inject, OnInit } from '@angular/core';
import { TipoTour } from '../../models/tipo-tour';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TipoToursService } from '../../services/tipo-tours.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackComponent } from 'src/app/shared/components/snack/snack.component';
import { SnackInterface } from 'src/app/shared/models/snack';

@Component({
  selector: 'app-admin-tipo-tour-editar',
  templateUrl: './admin-tipo-tour-editar.component.html',
  styleUrls: ['./admin-tipo-tour-editar.component.css']
})
export class AdminTipoTourEditarComponent implements OnInit {

  tipoTour!: TipoTour;
  editar: boolean=false;

  constructor(
    private dialogRef: MatDialogRef<AdminTipoTourEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TipoTour,
    private _tipoTour_service: TipoToursService,    
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.editarActividad();   
    console.log("departamento", this.tipoTour);    
  }

  editarActividad(){
    if (this.data == null) {
      this.inicializar();
      this.editar = false;
    } else {
      this.tipoTour = this.data;
      this.editar = true;
    }
  }

  inicializar(){
    this.tipoTour = {
      c_codigo: '',
      c_desripcion: '',
      n_id_tipo_tour: 0
    };
  }


  guardar(newForm:any){
    console.log(this.tipoTour);
    if(this.editar){
      this.actualizar(this.tipoTour);
    }else{
      this.agregar(this.tipoTour);  
    }
  }

  actualizar(tipoTour: TipoTour){    
    this._tipoTour_service.actualizar(tipoTour).subscribe((res=>{
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
      this.dialogRef.close({ flag: true, data: this.tipoTour });
    }));
  }

  agregar(tipoTour: TipoTour){
    this._tipoTour_service.agregar(tipoTour).subscribe((res=>{
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
      this.dialogRef.close({ flag: true, data: this.tipoTour });
    }));
  }


}
