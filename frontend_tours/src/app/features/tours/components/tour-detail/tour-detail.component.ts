import { Component, OnInit } from '@angular/core';
import { TourService } from '../../services/tour.service';
import { ActivatedRoute } from '@angular/router';
import { TourDetalle } from '../../models/tour-detalle';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  styleUrls: ['./tour-detail.component.css']
})
export class TourDetailComponent implements OnInit {

  display: any;
  center: google.maps.LatLngLiteral = {
    lat: -12.2182284,
    lng: -76.9452332
  };

  zoom = 12;

  markerPosition = {
    lat: 0,
    lng: 0
  }

  markerOptions: google.maps.MarkerOptions = {
    draggable: false
  };


  idTours: any;
  mTour!: TourDetalle;

  rutaBase: string = environment.urlArchivo

  cargando: boolean = true;

  loginAttempts: number = 0;

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = (event.latLng.toJSON());
  }
  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }

  constructor(
    private _tours_service: TourService, 
    private _Activatedroute: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.idTours = this._Activatedroute.snapshot.paramMap.get("n_id_tours");
    this.spinner.show();

    this.loginAttempts++;
    const delay = Math.min(1000 * Math.pow(2, this.loginAttempts), 3000);
    setTimeout(() => {
      this.getDetalleTour();
    }, delay); 
  }

  getDetalleTour(){    
    let req = {
      "n_id_tours": this.idTours
    }
    this._tours_service.getDetalleTour(req).subscribe((res=>{
      if(res.estado){
        this.mTour = res.data;
        if (this.mTour.c_latitud != null && this.mTour.c_longitud != null) {
          this.center.lat = Number(this.mTour.c_latitud);
          this.center.lng = Number(this.mTour.c_longitud);

          this.markerPosition.lat = Number(this.mTour.c_latitud);
          this.markerPosition.lng = Number(this.mTour.c_longitud);
        }

        this.spinner.hide();
        this.cargando = false;
        console.log("getDetalleTour", this.mTour);        
      }else{
        //this.openSnackBar(res.mensaje, 2500);
        console.log("OCURRIO UN ERROR");
      }      
    }));
  }

}
