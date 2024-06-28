import { Component, OnInit } from '@angular/core';
import { TourService } from '../../services/tour.service';
import { ActivatedRoute } from '@angular/router';

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
  idTours: any;

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = (event.latLng.toJSON());
  }
  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }

  constructor(
    private _tours_service: TourService, 
    private _Activatedroute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.idTours = this._Activatedroute.snapshot.paramMap.get("n_id_tours");
    this.getDetalleTour();
  }

  getDetalleTour(){
    let req = {
      "n_id_tours": this.idTours
    }
    this._tours_service.getDetalleTour(req).subscribe((res=>{
      if(res.estado){
        console.log(res.data);        
      }else{
        //this.openSnackBar(res.mensaje, 2500);
        console.log("OCURRIO UN ERROR");
      }      
    }));
  }

}
