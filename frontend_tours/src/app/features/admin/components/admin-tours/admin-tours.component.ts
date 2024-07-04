import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TourService } from '../../../tours/services/tour.service';
import { MatDialog } from '@angular/material/dialog';
import { TourBuilder } from '../../../tours/models/tours-builder';
import { Tour } from '../../../tours/models/tour';
import { AdminToursEditarComponent } from '../admin-tours-editar/admin-tours-editar.component';

@Component({
  selector: 'app-admin-tours',
  templateUrl: './admin-tours.component.html',
  styleUrls: ['./admin-tours.component.css']
})
export class AdminToursComponent implements OnInit {

  displayedColumns: string[] = ['editar','nombre', 'precio', 'departamento','lugar','c_disponibilidad','n_edad_min','n_person_max','c_desripcion','eliminar'];
  public tabla!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  paginador: number[] = [25, 50, 100, 150];

  constructor(
    private _tours_service: TourService, 
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.listarTours();
  }

  listarTours(){
    this._tours_service.getToursAll({}).subscribe((res=>{
      if(res.estado){
        console.log(res.data);
        
        this.tabla = new MatTableDataSource<any>(res.data);
        this.tabla.sort = this.sort;
        this.tabla.paginator = this.paginator;
      }else{
        //this.openSnackBar(res.mensaje, 2500);
        console.log("OCURRIO UN ERROR");
      }      
    }));
  }

  applyFilter(filterValue: any) {
    let dato = filterValue.target.value
    this.tabla.filter = dato.trim().toLowerCase();
  }

  exportarExcelTabla(){
    try{
      //this.exportarTablasService.exportarDosificacion(this.tablaDosificacion.data);
    }catch(error){
      console.log("error: ", error);
    }
    finally{
    }
  }

  editar(t: any, enterAnimationDuration: string, exitAnimationDuration: string){
    const builder = new TourBuilder();
    let data; 

    if(t != null){
      data = builder
      .setCNombre(t.nombre)
      .setDepartamento(t.departamento)
      .setDetalle(t.c_detalle)
      .setDisponibilidad(t.c_disponibilidad)
      .setEdadMin(t.n_edad_min)
      .setIdDepartamento(t.n_id_departamento)
      .setIdFoto(t.n_id_foto)
      .setIdTipoTour(t.n_id_tipo_tour)
      .setIdTours(t.n_id_tours)
      .setIdLugar(t.n_id_lugar)
      .setLugar(t.lugar)
      .setNombre(t.nombre)
      .setPersonMax(t.n_person_max)
      .setPrecio(t.precio)
      .setCLatitud(t.c_latitud)
      .setCLongitud(t.c_longitud)
      .setCNombre1(t.c_nombre1)
      .setCRuta1(t.c_ruta1)
      .setCNombre2(t.c_nombre2)
      .setCRuta2(t.c_ruta2)
      .build();
    }else{
      data = null;
    }
    
    const dialogRef = this.dialog.open(AdminToursEditarComponent, {
      //panelClass: 'custom-dialog-container',
      width: '750px',      
      data: { tour: data },
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      try {
        this.listarTours();
      } catch (error) {
        console.log(error);
        this.listarTours();
      }
    });
  }

  eliminar(dato:any){
    /* const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Desea eliminar la dosificacion con código " + dato.c_codigo + "?" }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminarDosificacion(dato);
      }
    }); */
  }

}
