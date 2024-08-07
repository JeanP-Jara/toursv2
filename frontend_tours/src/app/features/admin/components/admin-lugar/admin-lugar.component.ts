import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LugarService } from '../../services/lugar.service';
import { SnackComponent } from 'src/app/shared/components/snack/snack.component';
import { SnackInterface } from 'src/app/shared/models/snack';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import { ExportarTablasService } from '../../services/exportar-tablas.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AdminLugarEditarComponent } from '../admin-lugar-editar/admin-lugar-editar.component';

@Component({
  selector: 'app-admin-lugar',
  templateUrl: './admin-lugar.component.html',
  styleUrls: ['./admin-lugar.component.css']
})
export class AdminLugarComponent implements OnInit {

  displayedColumns: string[] = ['editar', 'c_nombre', 'departamento', 'eliminar'];
  public tabla!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  paginador: number[] = [10, 15, 25, 50];  

  constructor(
    private _lugar_service: LugarService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    public exportarTablasService: ExportarTablasService,

  ) { }

  ngOnInit(): void {
    this.listarDatos();
  }

  listarDatos(){
    this._lugar_service.listar({}).subscribe((res=>{
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
      this.exportarTablasService.exportarExcelLugar(this.tabla.data);
    }catch(error){
      console.log("error: ", error);
    }
    finally{
    }
  }

  editar(element: any, enterAnimationDuration: string, exitAnimationDuration: string){    
    console.log("open", element);
    
    const dialogRef = this.dialog.open(AdminLugarEditarComponent, {
      width: '750px',      
      data:  element,
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      try {
        this.listarDatos();
      } catch (error) {
        console.log(error);
        this.listarDatos();
      }
    });

    
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
    this._lugar_service.eliminar(dato).subscribe((res=>{
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
      this.listarDatos();
    }));
  }

}
