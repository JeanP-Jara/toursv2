import { Component, OnInit } from '@angular/core';
import { TourService } from '../../services/tour.service';
import { ResponseTour, Tour } from '../../models/tour';
import { ExcursionTour } from '../../models/excursion-tour';
import { ExcursionTourFactory } from '../../models/abstract-tour-factory';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tour-list',
  templateUrl: './tour-list.component.html',
  styleUrls: ['./tour-list.component.css'],
})
export class TourListComponent implements OnInit {

  listTours: Tour[] = [];
  listTours2: Tour[] = [];
  private factory: ExcursionTourFactory;
  private factory2: ExcursionTourFactory;

  constructor(
    private _tours_service: TourService, 
    public router: Router,
  ) {
    this.factory = new ExcursionTourFactory(this._tours_service, {n_id_tipo_tour: 1});
    this.factory2 = new ExcursionTourFactory(this._tours_service, {n_id_tipo_tour: 2});
  }

  ngOnInit(): void {
    this.getExcursionTour();
    this.getPaqueteTour();
  }

  getExcursionTour(){
    this.factory.getExcursionTour().subscribe(res => {
      if(res.estado){
        console.log("datos: ", res.data);   
        this.listTours = res.data;     
        this.listTours.forEach(e => {
          e.c_nombre = `${environment.urlArchivo}${e.c_ruta1}`;
        });
      }else{
        //this.openSnackBar(res.mensaje, 2500); 
      }
    });
  }

  getPaqueteTour(){
    this.factory2.getPaqueteTour().subscribe(res => {
      if(res.estado){
        console.log("datos: ", res.data);   
        this.listTours2 = res.data;     
        this.listTours2.forEach(e => {
          e.c_nombre = `${environment.urlArchivo}${e.c_ruta1}`;
        });
      }else{
        //this.openSnackBar(res.mensaje, 2500); 
      }
    });
  }

  showTour(element: any){
    console.log("showTour", element);   
    this.router.navigate(["/toursdetalle/" + element.n_id_tours ]);
  }
}