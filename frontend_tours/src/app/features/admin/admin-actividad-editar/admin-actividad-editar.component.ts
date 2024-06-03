import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PrototypeActividad } from '../models/actividad';

@Component({
  selector: 'app-admin-actividad-editar',
  templateUrl: './admin-actividad-editar.component.html',
  styleUrls: ['./admin-actividad-editar.component.css']
})
export class AdminActividadEditarComponent implements OnInit {

  actividad!: PrototypeActividad;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AdminActividadEditarComponent,
  ) { }

  ngOnInit(): void {
    console.log(this.data.actividad);    
    this.actividad = this.data.actividad;
  }

}
