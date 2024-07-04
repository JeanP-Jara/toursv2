import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Tour } from '../../../tours/models/tour';
import { TourService } from '../../../tours/services/tour.service';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppSettings } from 'src/app/core/common/AppSettings';
import { DepartamentoService } from '../../services/departamento.service';
import { Departamento } from '../../models/departamento';
import { LugarService } from '../../services/lugar.service';
import { Lugar } from '../../models/lugar';
import { TipoToursService } from '../../services/tipo-tours.service';
import { TipoTour } from '../../models/tipo-tour';
import { PopUpMapaComponent } from 'src/app/shared/components/pop-up-mapa/pop-up-mapa.component';

@Component({
  selector: 'app-admin-tours-editar',
  templateUrl: './admin-tours-editar.component.html',
  styleUrls: ['./admin-tours-editar.component.css']
})
export class AdminToursEditarComponent extends HeaderComponent implements OnInit {

  tour!: Tour
  listTours: Tour[] = [];
  tipoTours: TipoTour[] = [];
  file: any;
  showImg: any;

  departamentos: Departamento[] = [];
  lugares: Lugar[] = [];

  editar: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AdminToursEditarComponent,
    private dialogRef: MatDialogRef<AdminToursEditarComponent>,
    private _tours_service: TourService, 
    private _departamento_service: DepartamentoService,
    private _lugar_service: LugarService,
    private _tipoTour_service: TipoToursService,
    public dialog: MatDialog,
    public override snackBar: MatSnackBar,
  ) { 
    super(snackBar);
  }

  override ngOnInit(): void {    
    //this.tour = this.data.tour;
    this.editarTour();
    this.listarDepartamentos();
    console.log(this.tour);    
  }

  editarTour(){
    if (this.data.tour == null) {
      this.inicializar();
      this.editar = false;
    } else {
      this.tour = this.data.tour;
      this.editar = true;
    }
  }

  inicializar(){
    this.tour = {
      n_id_tours: 0,
      nombre: '',
      precio: 0,
      n_id_departamento: 0,
      c_disponibilidad: '',
      n_edad_min: 0,
      n_person_max: 0,
      c_detalle: '',
      c_latitud: '',
      c_longitud: '',
      n_id_tipo_tour: 0,
      c_nombre: '',
      departamento: '',
      n_id_lugar: 0,
      lugar: '',
      c_desripcion: '',
      c_nombre1:'',
      c_ruta1: '',
      c_nombre2:'',
      c_ruta2: ''
    }
  }

  listarDepartamentos(){
    this._departamento_service.listar({}).subscribe((res=>{
      if(res.estado){
        console.log(res.data);
        this.departamentos = res.data;
        this.listarLugar();
      }else{
        //this.openSnackBar(res.mensaje, 2500);
        console.log("OCURRIO UN ERROR");
      }      
    }));
  }

  listarLugar(){
    this._lugar_service.listar({}).subscribe((res=>{
      if(res.estado){
        console.log(res.data);        
        this.lugares = res.data;
        this.listarDatos();
      }else{
        //this.openSnackBar(res.mensaje, 2500);
        console.log("OCURRIO UN ERROR");
      }      
    }));
  }

  listarDatos(){
    this._tipoTour_service.listar({}).subscribe((res=>{
      if(res.estado){
        console.log(res.data);        
        this.tipoTours = res.data;
      }else{
        //this.openSnackBar(res.mensaje, 2500);
        console.log("OCURRIO UN ERROR");
      }      
    }));
  }

  uploadfileBanner(event: any) {
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => this.showImg = reader.result;
    reader.readAsDataURL(this.file);    
    this.uploadFileToActivity(2)
  }

  uploadfileLogo(event: any) {
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => this.showImg = reader.result;
    reader.readAsDataURL(this.file);    
    this.uploadFileToActivity(1)
  }

  uploadFileToActivity(tipo: number) {
    console.log("uploadFile")
    console.log("this.file:: ", this.file);
    let extension = this.file.name;

    console.log("extension: ", extension);
    this._tours_service.guardarFoto( extension, this.file, this.getToken().token).subscribe(
      result => {
          if (result.estado) {
              console.log("respuesta del backend", result);
              if (tipo == 1) {
                this.tour.c_nombre1 = result.c_nombre;
                this.tour.c_ruta1 = result.c_ruta;
              }else{
                this.tour.c_nombre2 = result.c_nombre;
                this.tour.c_ruta2 = result.c_ruta;
              }
          } else {
            this.openSnackBar(result.mensaje, 99);
          }
      }
    );
  }

  guardar(newForm: any){
    console.log(this.tour);
    if(this.editar){      
      this.actualizar(this.tour);
    }else{
      this.agregar(this.tour);  
    }
  }

  actualizar(tour: Tour){    
    this._tours_service.actualizar(tour, this.getToken().token).subscribe((res=>{
      if(res.estado){
        this.openSnackBar('Tour actualizada', 99);        
      }else{
        this.openSnackBar(res.mensaje, 99);
      }
      this.dialogRef.close({ flag: true, data: this.tour });
    }));
  }

  agregar(tour: Tour){
    this._tours_service.agregar(tour, this.getToken().token).subscribe((res=>{      
      if(res.estado){
        this.openSnackBar('Tour agregada', 99);        
      }else{
        this.openSnackBar(res.mensaje, 99);
      }
      this.dialogRef.close({ flag: true, data: this.tour });
    }));
  }

  Openmapa(){
    let dataMapa = null;
    if (this.tour.c_latitud != null && this.tour.c_longitud != null) {
      dataMapa = {
        c_latitud: this.tour.c_latitud,
        c_longitud: this.tour.c_longitud
      }
    }
    const dialogRef = this.dialog.open(PopUpMapaComponent, {
      width: '80vw',
      data: dataMapa
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      try {
        //this.listarSucursal();
        console.log("EDITAR", result);
        if(result.flag){
          this.tour.c_latitud =  result.data.c_latitud
          this.tour.c_longitud = result.data.c_longitud
        }
        
      } catch (error) {
        console.log(error);
        //this.listarSucursal();
      }
    });
  }

}
