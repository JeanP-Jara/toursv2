import { Component, Inject, OnInit } from '@angular/core';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { Recomendacion } from '../../models/recomendacion';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Tour } from 'src/app/features/tours/models/tour';
import { TourService } from 'src/app/features/tours/services/tour.service';
import { RecomendacionService } from '../../services/recomendacion.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-recomendacion-editar',
  templateUrl: './admin-recomendacion-editar.component.html',
  styleUrls: ['./admin-recomendacion-editar.component.css']
})
export class AdminRecomendacionEditarComponent extends HeaderComponent implements OnInit {

  recomendacion!: Recomendacion;
  listTours: Tour[] = [];
  editar:boolean=false;

  constructor(
    private dialogRef: MatDialogRef<AdminRecomendacionEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AdminRecomendacionEditarComponent,
    private _tours_service: TourService, 
    private _service: RecomendacionService,
    public override snackBar: MatSnackBar,
  ) { 
    super(snackBar);
  }

  override ngOnInit(): void {
    this.editarCotenido();
    console.log(this.data.recomendacion);
    this.getTours();
  }

  editarCotenido(){
    if (this.data.recomendacion == null) {
      this.inicializar();
      this.editar = false;
    } else {
      this.recomendacion = this.data.recomendacion;
      this.editar = true;
    }
  }

  inicializar(){
    this.recomendacion = {
      n_id_recomendacion: 0,
      c_detalle: '',
      n_id_tours: 0
    };
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
    console.log(this.recomendacion);
    if(this.editar){
      this.actualizar(this.recomendacion);
    }else{
      this.agregar(this.recomendacion);  
    }
  }

  actualizar(recomendacion: Recomendacion){    
    this._service.actualizar(recomendacion).subscribe((res=>{
      if(res.estado){
        this.openSnackBar('No-Contenido actualizado', 100);
        
      }else{
        this.openSnackBar(res.mensaje, 2000);  
      }
      this.dialogRef.close({ flag: true, data: this.recomendacion });
    }));
  }

  agregar(recomendacion: Recomendacion){
    this._service.agregar(recomendacion).subscribe((res=>{
      if(res.estado){
        this.openSnackBar('Contenido agregado', 100);        
      }else{
        this.openSnackBar(res.mensaje, 2000);
      }
      this.dialogRef.close({ flag: true, data: this.recomendacion });
    }));
  }

}
