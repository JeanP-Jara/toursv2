import { Component, Inject, OnInit } from '@angular/core';
import { Contenido } from '../../models/contenido';
import { Tour } from 'src/app/features/tours/models/tour';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TourService } from 'src/app/features/tours/services/tour.service';
import { ContenidoService } from '../../services/contenido.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';

@Component({
  selector: 'app-admin-contenido-editar',
  templateUrl: './admin-contenido-editar.component.html',
  styleUrls: ['./admin-contenido-editar.component.css']
})
export class AdminContenidoEditarComponent extends HeaderComponent implements OnInit {

  contenido!: Contenido;
  listTours: Tour[] = [];
  editar:boolean=false;

  constructor(
    private dialogRef: MatDialogRef<AdminContenidoEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AdminContenidoEditarComponent,
    private _tours_service: TourService, 
    private _service: ContenidoService,
    public override snackBar: MatSnackBar,
  ) { 
    super(snackBar);
  }

  override ngOnInit(): void {
    this.editarCotenido();
    console.log(this.data.contenido);
    this.getTours();
  }

  editarCotenido(){
    if (this.data.contenido == null) {
      this.inicializar();
      this.editar = false;
    } else {
      this.contenido = this.data.contenido;
      this.editar = true;
    }
  }

  inicializar(){
    this.contenido = {
      n_id_contenido: 0,
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
    console.log(this.contenido);
    if(this.editar){
      this.actualizar(this.contenido);
    }else{
      this.agregar(this.contenido);  
    }
  }

  actualizar(contenido: Contenido){    
    this._service.actualizar(contenido).subscribe((res=>{
      if(res.estado){
        this.openSnackBar('Contenido actualizado', 100);
        
      }else{
        this.openSnackBar(res.mensaje, 2000);  
      }
      this.dialogRef.close({ flag: true, data: this.contenido });
    }));
  }

  agregar(contenido: Contenido){
    this._service.agregar(contenido).subscribe((res=>{
      if(res.estado){
        this.openSnackBar('Contenido agregado', 100);        
      }else{
        this.openSnackBar(res.mensaje, 2000);
      }
      this.dialogRef.close({ flag: true, data: this.contenido });
    }));
  }
}
