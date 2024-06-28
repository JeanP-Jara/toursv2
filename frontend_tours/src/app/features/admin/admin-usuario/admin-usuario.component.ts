import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UsuarioService } from '../../users/services/usuario.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminUsuarioEditarComponent } from '../admin-usuario-editar/admin-usuario-editar.component';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import { SnackInterface } from 'src/app/shared/models/snack';
import { SnackComponent } from 'src/app/shared/components/snack/snack.component';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';

@Component({
  selector: 'app-admin-usuario',
  templateUrl: './admin-usuario.component.html',
  styleUrls: ['./admin-usuario.component.css']
})
export class AdminUsuarioComponent extends HeaderComponent implements OnInit {

  displayedColumns: string[] = ['editar','c_codigo', 'c_contrasena', 'eliminar'];
  public tabla!: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  paginador: number[] = [25, 50, 100, 150];

  constructor(
    private _usuario_service: UsuarioService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    super();
  }

  override ngOnInit(): void {
    this.listarUsuarios();
  }

  listarUsuarios(){
    this._usuario_service.listarUsuarios({}).subscribe((res=>{
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

  editar(element:any, enterAnimationDuration: string, exitAnimationDuration: string){
    console.log("open", element);
    
    const dialogRef = this.dialog.open(AdminUsuarioEditarComponent, {
      width: '750px',      
      data:  element,
      enterAnimationDuration,
      exitAnimationDuration,
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      try {
        this.listarUsuarios();
      } catch (error) {
        console.log(error);
        this.listarUsuarios();
      }
    });
  }

  eliminar(dato:any, enterAnimationDuration: string, exitAnimationDuration: string){
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '500px',
      data: { titulo: "¿Desea eliminar el Usuario?" },
      enterAnimationDuration, 
      exitAnimationDuration
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminarUsuario(dato);
      }
    });
  }

  eliminarUsuario(dato:any){    
    this._usuario_service.deleteUsuario(dato, this.getToken().token).subscribe((res=>{
      let dataScnack: SnackInterface = {
        mensaje: '' ,
        tipo: 2500
      }
      if(res.estado){
        dataScnack.mensaje = 'Se elimino el Usuario';        
      }else{
        dataScnack.mensaje = res.mensaje; 
      }
      this.snackBar.openFromComponent(SnackComponent, {
        duration: 2000,
        data: dataScnack,
      });
      this.listarUsuarios();
    }));
  }

  

}
