import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseUsuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public apiUrl: string = '';

  constructor(public http: HttpClient) {
    this.apiUrl =  environment.url;
  }

  listarUsuarios(request:any): Observable<ResponseUsuario> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<ResponseUsuario>(`${this.apiUrl}usuario/listarUsuarios`, request, { headers: reqHeader });
  }

  insertUsuario(request:any): Observable<any> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(`${this.apiUrl}usuario/insertUsuario`, request, { headers: reqHeader });
  }

  deleteUsuario(request:any, token: any): Observable<any> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this.http.post<any>(`${this.apiUrl}usuario/deleteUsuario`, request, { headers: reqHeader });
  }

  updateUsuario(request:any): Observable<any> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(`${this.apiUrl}usuario/updateUsuario`, request, { headers: reqHeader });
  }

  login(request:any): Observable<any> {
    var reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(`${this.apiUrl}seguridad/login`, request, { headers: reqHeader });
  }
}
