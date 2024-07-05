import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExportarTablasService } from '../../services/exportar-tablas.service';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { AdminRecomendacionEditarComponent } from '../admin-recomendacion-editar/admin-recomendacion-editar.component';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import { RecomendacionService } from '../../services/recomendacion.service';

@Component({
  selector: 'app-admin-recomendacion',
  templateUrl: './admin-recomendacion.component.html',
  styleUrls: ['./admin-recomendacion.component.css']
})
export class AdminRecomendacionComponent extends HeaderComponent implements OnInit {

  displayedColumns: string[] = ['editar','tour', 'c_detalle', 'eliminar'];
  public tabla!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  paginador: number[] = [10, 15, 25, 50];


  constructor(
    private _service: RecomendacionService,
    public dialog: MatDialog,
    public override snackBar: MatSnackBar,
    public exportarTablasService: ExportarTablasService,
  ) { 
    super(snackBar);
  }

  override ngOnInit(): void {
    this.listar();
  }

  listar(){
    this._service.listar({}).subscribe((res=>{
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
      this.exportarTablasService.exportarExcelRecomendacion(this.tabla.data);
    }catch(error){
      console.log("error: ", error);
    }
    finally{
    }
  }

  editar(element: any, enterAnimationDuration: string, exitAnimationDuration: string){    
    const dialogRef = this.dialog.open(AdminRecomendacionEditarComponent, {
      width: '750px',      
      data: { recomendacion: element },
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      try {
        this.listar();
      } catch (error) {
        console.log(error);
        this.listar();
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
        this.eliminarDato(dato);
      }
    });
  }

  eliminarDato(dato:any){    
    this._service.eliminar(dato).subscribe((res=>{
      if(res.estado){
        this.openSnackBar('Se elimino el registro', 99);      
      }else{
        this.openSnackBar(res.mensaje, 2000);  
      }
      this.listar();
    }));
  }

}
