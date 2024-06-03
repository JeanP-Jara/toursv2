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
}
