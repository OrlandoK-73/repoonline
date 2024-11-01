import { Component } from '@angular/core';
import { AsignacionMaestroService } from '../../services/asignacion-maestro.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { BreadcrumbsComponent } from '../../shared/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-materias',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbsComponent
  ],
  templateUrl: './materias.component.html',
  styleUrl: './materias.component.css'
})
export class MateriasComponent {
  data:any[] = [];
  public formData: any;

  constructor(
    private asignacionMaestroService: AsignacionMaestroService
  ) {
  }

  ngOnInit() {
    this.getAll();
  }

  /**
   * OBTENER REGISTROS
   */
  getAll() {
    this.asignacionMaestroService.getAllMaestro('2')
    .subscribe({
      next: (data:any) => {
        console.log(data)
        this.data = data;
      },
      error: (error) => {
        Swal.fire('Error', 'Ha ocurrido un error al obtener los registros.', 'error' );
      }
    });
  }

}
