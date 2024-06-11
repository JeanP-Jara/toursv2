import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseActividad } from '../models/actividad';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {  

  public apiUrl: string = '';

  constructor(public http: HttpClient) {
    this.apiUrl =  environment.url;
  }

  listarActividades(request:any): Observable<ResponseActividad> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<ResponseActividad>(`${this.apiUrl}actividad/getActividadAll`, request, { headers: reqHeader });
  }

  actualizarActividad(request:any): Observable<ResponseActividad> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<ResponseActividad>(`${this.apiUrl}actividad/actualizarActividad`, request, { headers: reqHeader });
  }

  agregarActividad(request:any): Observable<ResponseActividad> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<ResponseActividad>(`${this.apiUrl}actividad/agregarActividad`, request, { headers: reqHeader });
  }

  eliminarActividad(request:any): Observable<ResponseActividad> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<ResponseActividad>(`${this.apiUrl}actividad/eliminarActividad`, request, { headers: reqHeader });
  }
}
