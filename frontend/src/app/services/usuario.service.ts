import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  login(data: any) {
    // Cambié la URL de login para que apunte a 'usuarios/login'
    let url = `${environment.urlBackend}/usuarios/login`;
    return this.http.post(url, data, this.httpOptions);
  }

  create(data: any) {
    let url = `${environment.urlBackend}/usuario`;
    return this.http.post(url, data, this.httpOptions);
  }

  getAll() {
    let url = `${environment.urlBackend}/usuario/`;
    return this.http.get(url, this.httpOptions);
  }

  getAllMaestros() {
    let url = `${environment.urlBackend}/usuario/rol/MAESTRO`;
    return this.http.get(url, this.httpOptions);
  }

  getAllEstudiantes() {
    let url = `${environment.urlBackend}/usuario/rol/ESTUDIANTE`;
    return this.http.get(url, this.httpOptions);
  }

  getSingle(id: string) {
    let url = `${environment.urlBackend}/usuario/${id}`;
    return this.http.get(url, this.httpOptions);
  }

  update(data: any) {
    let url = `${environment.urlBackend}/usuario/${data.id}`;
    return this.http.put(url, data, this.httpOptions);
  }

  delete(id: number) {
    let url = `${environment.urlBackend}/usuario/${id}`;
    return this.http.delete(url, this.httpOptions);
  }

  changePassword(data: any) {
    let url = `${environment.urlBackend}/usuario/changePassword/${data.id}`;
    return this.http.post(url, data, this.httpOptions);
  }

  changePassword2(data: any) {
    let url = `${environment.urlBackend}/usuario/changePassword2/${data.id}`;
    return this.http.post(url, data, this.httpOptions);
  }
}
