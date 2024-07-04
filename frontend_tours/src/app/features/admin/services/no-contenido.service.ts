import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoContenidoService {

  public apiUrl: string = '';

  constructor(public http: HttpClient) {
    this.apiUrl =  environment.url;
  }

  listar(request:any): Observable<any> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(`${this.apiUrl}no_contenido/getAll`, request, { headers: reqHeader });
  }

  actualizar(request:any): Observable<any> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(`${this.apiUrl}no_contenido/actualizar`, request, { headers: reqHeader });
  }

  agregar(request:any): Observable<any> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(`${this.apiUrl}no_contenido/agregar`, request, { headers: reqHeader });
  }

  eliminar(request:any): Observable<any> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(`${this.apiUrl}no_contenido/eliminar`, request, { headers: reqHeader });
  }
}
