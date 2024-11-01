import { Component } from '@angular/core';
import { TareaEstudianteService } from '../../services/tarea-estudiante.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-e-mis-notas',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './e-mis-notas.component.html',
  styleUrl: './e-mis-notas.component.css'
})
export class EMisNotasComponent {
  public usuario = JSON.parse(localStorage.getItem('usuarioAV')!);
  notas:any[] = [];

  constructor(
    private tareaEstudianteService: TareaEstudianteService
  ) {

  }

  ngOnInit() {
    this.getAll(this.usuario.id!);
  }

  /**
   * OBTENER REGISTROS
   */
  getAll(estudianteId: string) {
    //TODO: REVISAR
    this.tareaEstudianteService.getNotasPorEstudiante(estudianteId)
    .subscribe({
      next: (data:any) => {
        console.log(data)
        this.notas = data;
      },
      error: (error) => {
        Swal.fire('Error', 'Ha ocurrido un error al obtener los registros.', 'error' );
      }
    });
  }
}
