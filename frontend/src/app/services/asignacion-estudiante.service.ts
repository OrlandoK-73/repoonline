import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AsignacionEstudianteService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  create(data:any) {
    let url = `${environment.urlBackend}/asignacion_estudiante`;
    console.log(url)
    return this.http.post(url, data, this.httpOptions);
  }

  getAll() {
    let url = `${environment.urlBackend}/asignacion_estudiante/`;
    return this.http.get(url, this.httpOptions);
  }

  getAllEstudiantes(gradoId:string, seccionId:string, anio:string) {
    let url = `${environment.urlBackend}/asignacion_estudiante/estudiante/${gradoId}/${seccionId}/${anio}`;
    return this.http.get(url, this.httpOptions);
  }

  getSingle(id:string) {
    let url = `${environment.urlBackend}/asignacion_estudiante/${id}`;
    return this.http.get(url, this.httpOptions);
  }

  update(data:any) {
    let url = `${environment.urlBackend}/asignacion_estudiante/${data.id}`;
    return this.http.put(url, data, this.httpOptions);
  }

  delete(id:number) {
    let url = `${environment.urlBackend}/asignacion_estudiante/${id}`;
    return this.http.delete(url, this.httpOptions);
  }

}
