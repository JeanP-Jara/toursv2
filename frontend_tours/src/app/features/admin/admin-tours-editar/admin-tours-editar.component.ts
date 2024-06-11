import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tour } from '../../tours/models/tour';
import { TourService } from '../../tours/services/tour.service';

@Component({
  selector: 'app-admin-tours-editar',
  templateUrl: './admin-tours-editar.component.html',
  styleUrls: ['./admin-tours-editar.component.css']
})
export class AdminToursEditarComponent implements OnInit {

  tour!: Tour
  listTours: Tour[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AdminToursEditarComponent,
    private _tours_service: TourService, 
  ) { }

  ngOnInit(): void {
    console.log(this.data.tour);    
    this.tour = this.data.tour;
    this.getTours();
  }

  getTours(){
    this._tours_service.getToursAll({}).subscribe(res => {
      if(res.estado){
        console.log("datos: ", res.data);
      }else{
        //this.openSnackBar(res.mensaje, 2500); 
      }
    });
  }




}
