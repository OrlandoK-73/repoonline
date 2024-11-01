import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public menu: any[] = [];

  constructor() { }

  cargarMenu() {
    return this.menu = [
      {
        titulo: 'Dashboard',
        icono: 'fa fa-dashboard',
        submenu: [
          { titulo: 'Inicio', url: '/home' },
        ]
      },
      
      {
        titulo: 'Administración',
        icono: 'fa fa-folder',
        submenu: [
          { titulo: 'Usuarios', url: 'usuarios' },
          { titulo: 'Grados', url: 'grados' },
          { titulo: 'Secciones', url: 'secciones' },
          { titulo: 'Cursos', url: 'cursos' },
        ]
      },
      {
        titulo: 'Asignaciones',
        icono: 'fa fa-address-card',
        submenu: [
          { titulo: 'Asignación de maestros', url: 'asignacion-maestro' },
          { titulo: 'Asignación de estudiantes', url: 'asignacion-estudiante' },
        ]
      },
      {
        titulo: 'Materias',
        icono: 'fa fa-address-card',
        submenu: [
          { titulo: 'Materias', url: 'materias' },
          { titulo: 'Asistencia', url: 'asistencia' },
        ]
      },
      {
        titulo: 'Materias',
        icono: 'fa fa-address-card',
        submenu: [
          { titulo: 'Materias', url: 'materias' },
          { titulo: 'Asistencia', url: 'asistencia' },
        ]
      },
      {
        titulo: 'Materias',
        icono: 'fa fa-address-card',
        submenu: [
          { titulo: 'Materias', url: 'materias' },
          { titulo: 'Asistencia', url: 'asistencia' },
        ]
      }
    ];
  }

  cargarMenuAdministrador() {
    return this.menu = [
      {
        titulo: 'Dashboard',
        icono: 'fa fa-dashboard',
        submenu: [
          { titulo: 'Inicio', url: '/home' },
        ]
      },
      
      {
        titulo: 'Administración',
        icono: 'fa fa-folder',
        submenu: [
          { titulo: 'Usuarios', url: 'usuarios' },
          { titulo: 'Grados', url: 'grados' },
          { titulo: 'Secciones', url: 'secciones' },
          { titulo: 'Cursos', url: 'cursos' },
        ]
      },
      {
        titulo: 'Asignaciones',
        icono: 'fa fa-address-card',
        submenu: [
          { titulo: 'Asignación de maestros', url: 'asignacion-maestro' },
          { titulo: 'Asignación de estudiantes', url: 'asignacion-estudiante' },
        ]
      },
    ];
  }

  cargarMenuMaestro() {
    return this.menu = [
      {
        titulo: 'Dashboard',
        icono: 'fa fa-dashboard',
        submenu: [
          { titulo: 'Inicio', url: 'inicio' },
        ]
      },
      {
        titulo: 'Materias',
        icono: 'fa fa-address-card',
        submenu: [
          { titulo: 'Materias', url: 'materias' },
        ]
      }
    ];
  }

  cargarMenuDirector() {
    return this.menu = [
      {
        titulo: 'Dashboard',
        icono: 'fa fa-dashboard',
        submenu: [
          { titulo: 'Inicio', url: '/home' },
        ]
      },
      {
        titulo: 'Asignaciones',
        icono: 'fa fa-address-card',
        submenu: [
          { titulo: 'Asignación de maestros', url: 'asignacion-maestro' },
          { titulo: 'Asignación de estudiantes', url: 'asignacion-estudiante' },
        ]
      },
    ];
  }

  cargarMenuEstudiante() {
    return this.menu = [
      {
        titulo: 'Dashboard',
        icono: 'fa fa-dashboard',
        submenu: [
          { titulo: 'Inicio', url: 'inicio' },
        ]
      },
      {
        titulo: 'Materias',
        icono: 'fa fa-address-card',
        submenu: [
          { titulo: 'Materias', url: 'materias' },
          { titulo: 'Notas', url: 'mis-notas' },
        ]
      }
    ];
  }
}
