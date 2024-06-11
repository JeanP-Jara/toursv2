import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  public apiUrl: string = '';

  constructor(public http: HttpClient) {
    this.apiUrl =  environment.url;
  }

  listar(request:any): Observable<any> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(`${this.apiUrl}departamento/listar`, request, { headers: reqHeader });
  }

  actualizar(request:any): Observable<any> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(`${this.apiUrl}departamento/actualizar`, request, { headers: reqHeader });
  }

  agregar(request:any): Observable<any> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(`${this.apiUrl}departamento/agregar`, request, { headers: reqHeader });
  }

  eliminar(request:any): Observable<any> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(`${this.apiUrl}departamento/eliminar`, request, { headers: reqHeader });
  }
}
