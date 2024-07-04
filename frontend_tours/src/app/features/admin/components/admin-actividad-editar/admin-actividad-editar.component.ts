import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IPrototypeActividad, PrototypeActividad, PrototypeActividadFactory } from '../../models/actividad';
import { TourService } from '../../../tours/services/tour.service';
import { Tour } from '../../../tours/models/tour';
import { ActividadService } from '../../services/actividad.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackComponent } from 'src/app/shared/components/snack/snack.component';
import { SnackInterface } from 'src/app/shared/models/snack';

@Component({
  selector: 'app-admin-actividad-editar',
  templateUrl: './admin-actividad-editar.component.html',
  styleUrls: ['./admin-actividad-editar.component.css']
})
export class AdminActividadEditarComponent implements OnInit {

  actividad!: PrototypeActividad;
  listTours: Tour[] = [];
  type!: IPrototypeActividad;
  editar:boolean=false;

  constructor(
    private dialogRef: MatDialogRef<AdminActividadEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AdminActividadEditarComponent,
    private _tours_service: TourService, 
    private _actividad_service: ActividadService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.editarActividad();
    console.log(this.data.actividad);
    this.getTours();
  }

  editarActividad(){
    if (this.data.actividad == null) {
      this.inicializar();
      this.editar = false;
    } else {
      this.actividad = this.data.actividad;
      this.editar = true;
    }
  }

  inicializar(){
    const prototype = new PrototypeActividad(0, 0, '', '');
    this.actividad = prototype;
  }

  getTours(){
    this._tours_service.getToursAll({}).subscribe(res => {
      if(res.estado){
        console.log("datos: ", res.data);
        this.listTours = res.data;
      }else{
        //this.openSnackBar(res.mensaje, 2500); 
      }
    });
  }

  guardar(newForm:any){
    console.log(this.actividad);
    if(this.editar){
      this.actualizarActividad(this.actividad);
    }else{
      this.agregarActividad(this.actividad);  
    }
  }

  actualizarActividad(actividad: PrototypeActividad){    
    this._actividad_service.actualizarActividad(actividad).subscribe((res=>{
      let dataScnack: SnackInterface = {
        mensaje: '' ,
        tipo: 2500
      }
      if(res.estado){
        dataScnack.mensaje = 'Actividad actualizada'
        
      }else{
        dataScnack.mensaje = 'OCURRIO UN ERROR!'
        console.log("OCURRIO UN ERROR");
      }      
      this.snackBar.openFromComponent(SnackComponent, {
        duration: 2000,
        data: dataScnack
      });
      this.dialogRef.close({ flag: true, data: this.actividad });
    }));
  }

  agregarActividad(actividad: PrototypeActividad){
    this._actividad_service.agregarActividad(actividad).subscribe((res=>{
      let dataScnack: SnackInterface = {
        mensaje: '' ,
        tipo: 2500
      }
      if(res.estado){
        dataScnack.mensaje = 'Actividad agregada'
        
      }else{
        dataScnack.mensaje = 'OCURRIO UN ERROR!'
        console.log("OCURRIO UN ERROR");
      }      
      this.snackBar.openFromComponent(SnackComponent, {
        duration: 2000,
        data: dataScnack,
      });
      this.dialogRef.close({ flag: true, data: this.actividad });
    }));
  }

}
