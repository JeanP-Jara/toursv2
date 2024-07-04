import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pop-up-mapa',
  templateUrl: './pop-up-mapa.component.html',
  styleUrls: ['./pop-up-mapa.component.css']
})
export class PopUpMapaComponent implements OnInit {

  center: google.maps.LatLngLiteral = {
    lat: -12.2182284,
    lng: -76.9452332
  };
  
  zoom = 5;

  markerOptions: google.maps.MarkerOptions = {
    draggable: false
  };

  markerPosition = {
    lat: 0,
    lng: 0
  }

  dataMapa = {
    c_latitud: '',
    c_longitud: ''
  }


  constructor(
    private dialogRef: MatDialogRef<PopUpMapaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    if (this.data != null) {
      this.dataMapa = this.data;
      this.markerPosition.lat = Number(this.dataMapa.c_latitud);
      this.markerPosition.lng = Number(this.dataMapa.c_longitud);
    }
  }

  addMarker(event: google.maps.MapMouseEvent){
    if (event.latLng != null) {
      console.log("CLICK MAPA", event.latLng.toJSON());
      this.markerPosition = event.latLng.toJSON();
    }
  }

  guardar(){
    this.dataMapa.c_latitud = this.markerPosition.lat + '';
    this.dataMapa.c_longitud = this.markerPosition.lng + '';
    this.dialogRef.close({ flag: true, data: this.dataMapa });
  }

  cerrar(){
    this.dialogRef.close({flag: false, data: null})
  }

}
