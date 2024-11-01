import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TareaEstudianteService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  create(data:any) {
    console.log(data)
    let url = `${environment.urlBackend}/tarea_estudiante`;
    return this.http.post(url, data, this.httpOptions);
  }

  getAll() {
    let url = `${environment.urlBackend}/tarea_estudiante/`;
    return this.http.get(url, this.httpOptions);
  }

  getSingle(id:string) {
    let url = `${environment.urlBackend}/tarea_estudiante/${id}`;
    return this.http.get(url, this.httpOptions);
  }

  getNotasTareasPorEstudiante(asignacionMaestroId:string, estudianteId: string) {
    let url = `${environment.urlBackend}/tarea_estudiante/notas/${estudianteId}/${asignacionMaestroId}`;
    return this.http.get(url, this.httpOptions);
  }

  getNotasPorEstudiante(estudianteId: string) {
    let url = `${environment.urlBackend}/tarea_estudiante/notas_generales/${estudianteId}/`;
    return this.http.get(url, this.httpOptions);
  }

  update(data:any) {
    let url = `${environment.urlBackend}/tarea_estudiante/${data.id}`;
    return this.http.put(url, data, this.httpOptions);
  }

  delete(id:number) {
    let url = `${environment.urlBackend}/tarea_estudiante/${id}`;
    return this.http.delete(url, this.httpOptions);
  }

}
