import { Component } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  menu:any[] = [];
  public usuario = JSON.parse(localStorage.getItem('usuarioAV')!);

  constructor(
    public sidebarService: SidebarService
  ) { }

  ngOnInit(): void {
    if(this.usuario.rol == 'ADMINISTRADOR') {
      this.menu = this.sidebarService.cargarMenuAdministrador()
    } else if(this.usuario.rol == 'MAESTRO') {
      this.menu = this.sidebarService.cargarMenuMaestro()
    } else if(this.usuario.rol == 'DIRECTOR') {
      this.menu = this.sidebarService.cargarMenuDirector()
    } else if(this.usuario.rol == 'ESTUDIANTE') {
      this.menu = this.sidebarService.cargarMenuEstudiante()
    }
  }

  cerrarSesion() {
    localStorage.clear();
  }
}
