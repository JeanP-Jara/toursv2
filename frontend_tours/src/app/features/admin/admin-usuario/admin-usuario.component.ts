import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UsuarioService } from '../../users/services/usuario.service';

@Component({
  selector: 'app-admin-usuario',
  templateUrl: './admin-usuario.component.html',
  styleUrls: ['./admin-usuario.component.css']
})
export class AdminUsuarioComponent implements OnInit {

  displayedColumns: string[] = ['editar','c_codigo', 'c_contrasena', 'eliminar'];
  public tabla!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  paginador: number[] = [25, 50, 100, 150];

  constructor(
    private _usuario_service: UsuarioService
  ) { }

  ngOnInit(): void {
    this.listarUsuarios();
  }

  listarUsuarios(){
    this._usuario_service.listarUsuarios({}).subscribe((res=>{
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
      //this.exportarTablasService.exportarDosificacion(this.tablaDosificacion.data);
    }catch(error){
      console.log("error: ", error);
    }
    finally{
    }
  }

  editar(dosificacion:any){
    /* const dialogRef = this.dialog.open(DosificacionEditarComponent, {
      panelClass: 'custom-dialog-container',
      width: '750px',
      data: { dosificacion: dosificacion}
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      try {
        this.listarDosificacion();

      } catch (error) {
        console.log(error);
        this.listarDosificacion();
      }
    }); */
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
