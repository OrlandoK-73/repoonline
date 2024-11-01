import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { TareaService } from '../../services/tarea.service';
import Swal from 'sweetalert2';
import { Config } from 'datatables.net';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { PreguntaService } from '../../services/pregunta.service';
import { TareaEstudianteService } from '../../services/tarea-estudiante.service';

//JQUERY
declare var $:any;

@Component({
  selector: 'app-e-examen',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule
  ],
  templateUrl: './e-examen.component.html',
  styleUrl: './e-examen.component.css'
})
export class EExamenComponent {
  public formData: any;
  public data: any;
  public preguntas: any[] = [];
  tareaID:any;
  dtOptions: Config = {};
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective | undefined;
  dtTrigger: Subject<ADTSettings> = new Subject<ADTSettings>();
  public usuario = JSON.parse(localStorage.getItem('usuarioAV')!);
  
  constructor(
    private route: ActivatedRoute,
    private tareaService: TareaService,
    private tareaEstudianteService: TareaEstudianteService,
    private preguntaService: PreguntaService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.tareaID = this.route.snapshot.paramMap.get('id');
    this.getAll();
  }

  getAll() {
    this.preguntaService.getPreguntasPorTarea(this.tareaID)
    .subscribe({
      next: (data:any) => {
        console.log(data)
        this.preguntas = data;
      },
      error: (error) => {
        Swal.fire('Error', 'Ha ocurrido un error al obtener los registros.', 'error' );
      }
    });
  }

  /**
   * CREACION DE PROGRAMA
   */
  create(punteo: number) {
    this.tareaEstudianteService.create({
      archivo: null,
      tipoArchivo: null,
      estudianteId:  this.usuario.id,
      tareaId: this.tareaID,
      entregado: 1,
      nota: punteo
    })
    .subscribe({
      next: (data:any) => {
        Swal.fire('Evaluación terminada', 'La evaluación se ha entregado exitosamente.', 'success' );
        this.router.navigate(['/estudiante']);
      },
      error: (error) => {
        Swal.fire('Error', 'Ha ocurrido un error. Intentélo más tarde.', 'error' );
      }
    });
  }

  onSeleccion(index: number, event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.preguntas[index].respuesta = selectElement.value;
  }

  onInputRespuesta(index: number, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.preguntas[index].respuesta = inputElement.value;
  }

  /**
   * GUARDAR PUNTEO
   */
  guardarPunteo() {
    let totalPunteo = 0;

    this.preguntas.forEach(pregunta => {
      if (pregunta.respuesta.toLowerCase() === pregunta.correcta.toLowerCase()) {
        totalPunteo += parseInt(pregunta.punteo, 10); // Sumar el puntaje
      }
    });

    this.create(totalPunteo);
  }
}
