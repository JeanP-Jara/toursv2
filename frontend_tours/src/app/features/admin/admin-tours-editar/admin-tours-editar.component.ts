import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tour } from '../../tours/models/tour';

@Component({
  selector: 'app-admin-tours-editar',
  templateUrl: './admin-tours-editar.component.html',
  styleUrls: ['./admin-tours-editar.component.css']
})
export class AdminToursEditarComponent implements OnInit {

  tour!: Tour

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AdminToursEditarComponent,
  ) { }

  ngOnInit(): void {
    console.log(this.data.tour);    
    this.tour = this.data.tour;
  }

}
