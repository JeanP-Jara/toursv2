import { Component, OnInit } from '@angular/core';
import { TourService } from '../../services/tour.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TourDetalle } from '../../models/tour-detalle';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { FormGroup } from '@angular/forms';
import { VentasTourService } from '../../services/ventas-tour.service';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tour-detail',
  templateUrl: './tour-detail.component.html',
  styleUrls: ['./tour-detail.component.css']
})
export class TourDetailComponent extends HeaderComponent implements OnInit {

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
    private _ventas_services: VentasTourService,
    private spinner: NgxSpinnerService,
    private router: Router,
    public snackbar: MatSnackBar
  ) {
    super(snackbar);
   }

  override ngOnInit(): void {
    this.idTours = this._Activatedroute.snapshot.paramMap.get("n_id_tours");
    this.spinner.show();

    this.loginAttempts++;
    const delay = Math.min(1000 * Math.pow(2, this.loginAttempts), 1000);
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

  registrarCompra(){
    
  }

  onSubmit(myForm: any) {
    this.spinner.show();
    const formData = myForm.value;

    const formattedDate = new Date(formData.date).toISOString().split('T')[0];
    formData.date = formattedDate;

    let req = {
      n_id_tours: this.mTour.n_id_tours,
      n_cant_personas:  formData.peopleCount,
      n_precio: this.mTour.precio,
      fecha: formData.date
    }

    console.log(req);

    this._ventas_services.registrarVenta(req).subscribe((res=>{
      console.log(res);      
      if(res.estado){
        this.openSnackBar("Paquete registrado!", 3000);
        setTimeout(() => {
          this.spinner.hide();
          this.router.navigate(['/tours']);
        }, 2000);        
      }else{
        this.openSnackBar(res.mensaje, 2500);
        this.spinner.hide();
      }      
    }));      
  }

}
