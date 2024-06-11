import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Departamento } from '../models/departamento';
import { DepartamentoService } from '../services/departamento.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExportarTablasService } from '../services/exportar-tablas.service';
import { AdminDepartamentoEditarComponent } from '../admin-departamento-editar/admin-departamento-editar.component';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import { SnackInterface } from 'src/app/shared/models/snack';
import { SnackComponent } from 'src/app/shared/components/snack/snack.component';

@Component({
  selector: 'app-admin-departamento',
  templateUrl: './admin-departamento.component.html',
  styleUrls: ['./admin-departamento.component.css']
})
export class AdminDepartamentoComponent implements OnInit {

  displayedColumns: string[] = ['editar', 'c_nombre', 'eliminar'];
  public tabla!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  paginador: number[] = [10, 15, 25, 50];

  departamento!: Departamento;

  constructor(
    private _departamento_service: DepartamentoService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    public exportarTablasService: ExportarTablasService,

  ) { }

  ngOnInit(): void {
    this.listarDatos();
  }

  listarDatos(){
    this._departamento_service.listar({}).subscribe((res=>{
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
      this.exportarTablasService.exportarExcelDepartamento(this.tabla.data);
    }catch(error){
      console.log("error: ", error);
    }
    finally{
    }
  }

  editar(element: any, enterAnimationDuration: string, exitAnimationDuration: string){    
    console.log("opern", element);
    
    const dialogRef = this.dialog.open(AdminDepartamentoEditarComponent, {
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
    this._departamento_service.eliminar(dato).subscribe((res=>{
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
