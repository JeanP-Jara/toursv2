import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActividadService } from '../../services/actividad.service';
import { AdminActividadEditarComponent } from '../admin-actividad-editar/admin-actividad-editar.component';
import { MatDialog } from '@angular/material/dialog';
import { PrototypeActividad, PrototypeActividadFactory } from '../../models/actividad';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import { SnackInterface } from 'src/app/shared/models/snack';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackComponent } from 'src/app/shared/components/snack/snack.component';
import { ExportarTablasService } from '../../services/exportar-tablas.service';

@Component({
  selector: 'app-admin-actividad',
  templateUrl: './admin-actividad.component.html',
  styleUrls: ['./admin-actividad.component.css']
})
export class AdminActividadComponent implements OnInit {

  displayedColumns: string[] = ['editar','tour', 'c_detalle', 'eliminar'];
  public tabla!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  paginador: number[] = [10, 15, 25, 50];

  actividad!: PrototypeActividad;

  constructor(
    private _actividad_service: ActividadService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    public exportarTablasService: ExportarTablasService,

  ) { }

  ngOnInit(): void {
    this.listarActividades();
  }

  listarActividades(){
    this._actividad_service.listarActividades({}).subscribe((res=>{
      if(res.estado){
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
      this.exportarTablasService.exportarExcelActividad(this.tabla.data);
    }catch(error){
      console.log("error: ", error);
    }
    finally{
    }
  }

  editar(e: any, enterAnimationDuration: string, exitAnimationDuration: string){
    
    if(e != null){
      const factory = new PrototypeActividadFactory();
      const prototype = new PrototypeActividad(
        e.n_id_actividad,
        e.n_id_tours,
        e.tour,
        e.c_detalle
      );

      factory.registerPrototype('default', prototype);

      this.actividad = factory.createClone('default');   

      const dialogRef = this.dialog.open(AdminActividadEditarComponent, {
        width: '750px',      
        data: { actividad: this.actividad },
        enterAnimationDuration,
        exitAnimationDuration,
      });
      dialogRef.afterClosed().subscribe((result:any) => {
        try {
          this.listarActividades();
        } catch (error) {
          console.log(error);
          this.listarActividades();
        }
      });

    }else{
      const dialogRef = this.dialog.open(AdminActividadEditarComponent, {
        width: '750px',      
        data: { actividad: null },
        enterAnimationDuration,
        exitAnimationDuration,
      });
      dialogRef.afterClosed().subscribe((result:any) => {
        try {
          this.listarActividades();
        } catch (error) {
          console.log(error);
          this.listarActividades();
        }
      });
    }
  }

  eliminar(dato:any, enterAnimationDuration: string, exitAnimationDuration: string){
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Desea eliminar la Actividad?" },
      enterAnimationDuration, 
      exitAnimationDuration
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminarActividad(dato);
      }
    });
  }

  eliminarActividad(dato:any){    
    this._actividad_service.eliminarActividad(dato).subscribe((res=>{
      let dataScnack: SnackInterface = {
        mensaje: '' ,
        tipo: 2500
      }
      if(res.estado){
        dataScnack.mensaje = 'Se elimino la actividad';        
      }else{
        dataScnack.mensaje = 'OCURRIO UN ERROR'; 
      }
      this.snackBar.openFromComponent(SnackComponent, {
        duration: 2000,
        data: dataScnack,
      });
      this.listarActividades();
    }));
  }


}
