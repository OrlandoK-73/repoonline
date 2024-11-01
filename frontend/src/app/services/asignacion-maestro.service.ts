import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AsignacionMaestroService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  create(data:any) {
    let url = `${environment.urlBackend}/asignacion_maestro`;
    console.log(url)
    return this.http.post(url, data, this.httpOptions);
  }

  getAll() {
    let url = `${environment.urlBackend}/asignacion_maestro/`;
    return this.http.get(url, this.httpOptions);
  }

  getAllMaestro(id:string) {
    let url = `${environment.urlBackend}/asignacion_maestro/maestro/${id}`;
    return this.http.get(url, this.httpOptions);
  }

  getSingle(id:string) {
    let url = `${environment.urlBackend}/asignacion_maestro/${id}`;
    return this.http.get(url, this.httpOptions);
  }

  update(data:any) {
    let url = `${environment.urlBackend}/asignacion_maestro/${data.id}`;
    return this.http.put(url, data, this.httpOptions);
  }

  delete(id:number) {
    let url = `${environment.urlBackend}/asignacion_maestro/${id}`;
    return this.http.delete(url, this.httpOptions);
  }

}
