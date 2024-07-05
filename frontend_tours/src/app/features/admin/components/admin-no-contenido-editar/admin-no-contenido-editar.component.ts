import { Component, Inject, OnInit } from '@angular/core';
import { NoContenido } from '../../models/no-contenido';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Tour } from 'src/app/features/tours/models/tour';
import { TourService } from 'src/app/features/tours/services/tour.service';
import { NoContenidoService } from '../../services/no-contenido.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';

@Component({
  selector: 'app-admin-no-contenido-editar',
  templateUrl: './admin-no-contenido-editar.component.html',
  styleUrls: ['./admin-no-contenido-editar.component.css']
})
export class AdminNoContenidoEditarComponent extends HeaderComponent implements OnInit {

  noContenido!: NoContenido;
  listTours: Tour[] = [];
  editar:boolean=false;

  constructor(
    private dialogRef: MatDialogRef<AdminNoContenidoEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AdminNoContenidoEditarComponent,
    private _tours_service: TourService, 
    private _service: NoContenidoService,
    public override snackBar: MatSnackBar,
  ) { 
    super(snackBar);
  }

  override ngOnInit(): void {
    this.editarCotenido();
    console.log(this.data.noContenido);
    this.getTours();
  }

  editarCotenido(){
    if (this.data.noContenido == null) {
      this.inicializar();
      this.editar = false;
    } else {
      this.noContenido = this.data.noContenido;
      this.editar = true;
    }
  }

  inicializar(){
    this.noContenido = {
      n_idno_contenido: 0,
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
    console.log(this.noContenido);
    if(this.editar){
      this.actualizar(this.noContenido);
    }else{
      this.agregar(this.noContenido);  
    }
  }

  actualizar(noContenido: NoContenido){    
    this._service.actualizar(noContenido).subscribe((res=>{
      if(res.estado){
        this.openSnackBar('No-Contenido actualizado', 100);
        
      }else{
        this.openSnackBar(res.mensaje, 2000);  
      }
      this.dialogRef.close({ flag: true, data: this.noContenido });
    }));
  }

  agregar(noContenido: NoContenido){
    this._service.agregar(noContenido).subscribe((res=>{
      if(res.estado){
        this.openSnackBar('Contenido agregado', 100);        
      }else{
        this.openSnackBar(res.mensaje, 2000);
      }
      this.dialogRef.close({ flag: true, data: this.noContenido });
    }));
  }

}
