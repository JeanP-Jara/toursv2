import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseTour, Tour } from '../models/tour';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TourService {

  public apiUrl: string = '';

  constructor(public http: HttpClient) {
    this.apiUrl =  environment.url;
  }

  getTours(request:any): Observable<ResponseTour> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<ResponseTour>(`${this.apiUrl}tours/tour`, request, { headers: reqHeader });
  }

  getToursAll(request:any): Observable<ResponseTour> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<ResponseTour>(`${this.apiUrl}tours/getToursAll`, request, { headers: reqHeader });
  }

  getTour(id: number): Observable<Tour> {
    return this.http.get<Tour>(`${this.apiUrl}/${id}`);
  }

  createTour(tour: Tour): Observable<Tour> {
    return this.http.post<Tour>(this.apiUrl, tour);
  }

  updateTour(tour: Tour): Observable<Tour> {
    return this.http.put<Tour>(`${this.apiUrl}/${tour.n_id_tours}`, tour);
  }

  deleteTour(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getDetalleTour(request:any): Observable<any> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(`${this.apiUrl}tours/getDetalleTour`, request, { headers: reqHeader });
  }

  guardarFoto(extension: string, fileToUpload: any, token: any): Observable<any> {

    const formData: FormData = new FormData();
    formData.append('DA', fileToUpload, fileToUpload.name);
    return this.http.post(this.apiUrl + 'tours/guardarFoto?extension=' + extension, formData);
  }

  agregarDbFoto(request: any, token: any): Observable<any> {
    var reqHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    });
    return this.http.post<any>(`${this.apiUrl}tours/agregarDbFoto`, request, { headers: reqHeader });
  }

  actualizar(request:any, token: any): Observable<any> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this.http.post<any>(`${this.apiUrl}tours/actualizar`, request, { headers: reqHeader });
  }

  agregar(request:any, token: any): Observable<any> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this.http.post<any>(`${this.apiUrl}tours/agregar`, request, { headers: reqHeader });
  }

  eliminar(request:any, token: any): Observable<any> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this.http.post<any>(`${this.apiUrl}tours/eliminar`, request, { headers: reqHeader });
  }




}
