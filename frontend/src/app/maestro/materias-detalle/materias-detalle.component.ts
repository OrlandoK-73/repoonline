import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CursoService } from '../../services/curso.service';
import Swal from 'sweetalert2';
import { Config } from 'datatables.net';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AsignacionMaestroService } from '../../services/asignacion-maestro.service';
import { AsignacionEstudianteService } from '../../services/asignacion-estudiante.service';
import { AsistenciaService } from '../../services/asistencia.service';
import { TareaService } from '../../services/tarea.service';

//JQUERY
declare var $:any;

@Component({
  selector: 'app-materias-detalle',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule
  ],
  templateUrl: './materias-detalle.component.html',
  styleUrl: './materias-detalle.component.css'
})
export class MateriasDetalleComponent {
  data:any;
  public estudiantes: any[] = [];
  public estudiantesAsistencia: any[] = [];
  dtOptions: Config = {};
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective | undefined;
  dtTrigger: Subject<ADTSettings> = new Subject<ADTSettings>();
  public formData: any;
  public formDataTarea: any;
  public fechas: any[] = []
  public asistencias: any[] = []
  public tareas: any[] = []
  public filtradas: any[] = []
  public asignacionMaestroId: string = '';
  
  constructor(
    private route: ActivatedRoute,
    private asignacionMaestroService: AsignacionMaestroService,
    private asignacionEstudianteService: AsignacionEstudianteService,
    private formBuilder: UntypedFormBuilder,
    private asistenciaService: AsistenciaService,
    private tareaService: TareaService,
  ) {

  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    let materiaId = this.route.snapshot.paramMap.get('id');
    this.asignacionMaestroId = materiaId!;
    this.getSingle(this.asignacionMaestroId!);
    this.getAsistencias(this.asignacionMaestroId!);
    this.getTareas(this.asignacionMaestroId!);
    this.initializeForm();
    this.initializeFormTarea();
  }

  /**
   * OBTENER REGISTROS
   */
  getSingle(materiaId: string) {
    this.asignacionMaestroService.getSingle(materiaId)
    .subscribe({
      next: (data:any) => {
        this.data = data;
        this.getAll(this.data.gradoId, this.data.seccionId, this.data.anio)
      },
      error: (error) => {
        Swal.fire('Error', 'Ha ocurrido un error al obtener los registros.', 'error' );
      }
    });
  }

  /**
   * OBTENER ASISTENCIAS
   */
  getAsistencias(materiaId: string) {
    this.asistenciaService.getSingle(materiaId)
    .subscribe({
      next: (data:any) => {
        console.log(data)
        this.asistencias = data;
        console.log(this.asistencias)
        this.tabularAsistencia(this.asistencias)
        this.fechas = this.asistencias.map((a:any) => a.fecha);

      },
      error: (error) => {
        Swal.fire('Error', 'Ha ocurrido un error al obtener los registros.', 'error' );
      }
    });
  }

  tabularAsistencia(asistencias: any) {
    asistencias.forEach((b:any)=> {
      b.asistencia.forEach((a:any)=> {
        let buscar = this.filtradas.find(item => item.id === a.estudianteId);
        
        if(buscar) {
          buscar["asistio" + b.id] = a.asistio;
          buscar["justificacion" + b.id] = a.justificacion;
        } else {
          this.filtradas.push({
            ...a.estudiante,
            encabezadoId: b.id,
            ["asistio" + b.id]: a.asistio,
            ["justificacion" + b.id]: a.justificacion,
          })
        }
      });
    });
    console.log(this.filtradas)
  }

  getAsistioKeys(persona: any): { key: string, value: any }[] {
    return Object.keys(persona)
      .filter(key => key.startsWith('asistio'))
      .map(key => ({ key, value: persona[key] }));
  }

  getAll(gradoId:string, seccionId:string, anio:string) {
    this.asignacionEstudianteService.getAllEstudiantes(gradoId, seccionId, anio)
    .subscribe({
      next: (data:any) => {
        this.estudiantes = data;
        this.estudiantesAsistencia = this.estudiantes.map((data: any) => {
          return {
            ...data,
            asistio: false,
            justificacion: false
          }
        })
        /**
         * FILTRO TABLA
         */
        if (!this.dtElement!.dtInstance) {
          this.dtTrigger.next(null!);
          return;
        }

        this.dtElement!.dtInstance.then((dtInstance: any) => {
          // DESTRUIR TABLA
          dtInstance.destroy();
          // RENDERIZAR NUEVAMENTE TABLA
          this.dtTrigger.next(null!);
          return;
        });
      },
      error: (error) => {
        Swal.fire('Error', 'Ha ocurrido un error al obtener los registros.', 'error' );
      }
    });
  }

  // Método para capturar el cambio en el checkbox de asistencia
  onAsistioChange(index: number, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.estudiantesAsistencia[index].asistio = inputElement.checked;
  }

  // Método para capturar el cambio en el checkbox de justificación
  onJustificacionChange(index: number, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.estudiantesAsistencia[index].justificacion = inputElement.checked;
  }

  /**
   * CREACION DE PROGRAMA
   */
  create() {
    var estudiantes = this.estudiantesAsistencia.map((data: any) => {
      return {
        estudianteId: data.estudianteId,
        asistio: data.asistio,
        justificacion: data.justificacion
      }
    })

    let data  = {
      asignacionMaestroId: this.data.id,
      ...this.formData.value,
      asistencia: estudiantes
    }
    
    this.asistenciaService.create(data)
    .subscribe({
      next: (data:any) => {
        $('#modalFormDataAdd').modal('hide');
        Swal.fire('Asitencia agregada', 'La asistencia se ha agregado exitosamente.', 'success' );
      },
      error: (error) => {
        Swal.fire('Error', 'Ha ocurrido un error. Intentélo más tarde.', 'error' );
      }
    });
  }

  /**
   * INICIALIZAR FORMULARIO
   */
  initializeForm() {
    this.formData = this.formBuilder.group({
      'fecha': [null, [Validators.required] ],
      'bimestre': [null, [Validators.required] ],
    });
  }

  /**
   * INICIALIZAR FORMULARIO
   */
  initializeFormTarea() {
    this.formDataTarea = this.formBuilder.group({
      'id': [0],
      'nombre': [null, [Validators.required] ],
      'nota': [null, [Validators.required] ],
      'fechaLimite': [null, [Validators.required] ],
      'estado': [null, [Validators.required] ],
      'bimestre': [null, [Validators.required] ],
      'tipo_tarea': [null, [Validators.required] ],
      'asignacionMaestroId': [this.asignacionMaestroId]
    });
  }

  /**
   * CREAR TAREA
   */
  createTarea() {
    this.tareaService.create(this.formDataTarea.value)
    .subscribe({
      next: (data:any) => {
        $('#modalFormDataAddTarea').modal('hide');
        Swal.fire('Tarea agregada', 'La tarea se ha agregado exitosamente.', 'success' );
        this.getTareas(this.asignacionMaestroId!);
      },
      error: (error) => {
        Swal.fire('Error', 'Ha ocurrido un error. Intentélo más tarde.', 'error' );
      }
    });
  }

  /**
   * ACTUALIZAR TAREA
   */
  updateTarea() {
    this.tareaService.update(this.formDataTarea.value)
    .subscribe({
      next: (data:any) => {
        $('#modalFormDataAddTarea').modal('hide');
        Swal.fire('Tarea agregada', 'La tarea se ha agregado exitosamente.', 'success' );
        this.getTareas(this.asignacionMaestroId!);
      },
      error: (error) => {
        Swal.fire('Error', 'Ha ocurrido un error. Intentélo más tarde.', 'error' );
      }
    });
  }

  /**
   * OBTENER TAREAS
   */
  getTareas(materiaId: string) {
    this.tareaService.getTareasPorAsignacion(materiaId)
    .subscribe({
      next: (data:any) => {
        this.tareas = data;
        console.log(this.tareas)
      },
      error: (error) => {
        Swal.fire('Error', 'Ha ocurrido un error al obtener los registros.', 'error' );
      }
    });
  }

  /**
   * OBTENER TAREA
   */
  getSingleTarea(data: any) {
    console.log(data)
    this.id.setValue(data.id);
    this.nombre.setValue(data.nombre);
    this.nota.setValue(data.nota);
    this.fechaLimite.setValue(data.fechaLimite.split(' ')[0]);
    this.estado.setValue(data.estado);
    this.bimestres.setValue(data.bimestre);
    this.tipo_tarea.setValue(data.tipo_tarea);
  }

  
  /**
   * ALERT ELIMINAR
   */
  delete(id:number) {
    Swal.fire({
      title: "Eliminar Tarea",
      text: "¿Está seguro que desea eliminar la tarea?",
      showCancelButton: true,
      cancelButtonText: `Cancelar`,
      confirmButtonText: `Aceptar`,
      icon: 'warning'
    }).then((result) => {
      if (result.isConfirmed) {
        this.trash(id);
      }
    })
  }

  trash(id:number) {
    this.tareaService.delete(id)
    .subscribe({
      next: (data:any) => {
        Swal.fire('Tarea Eliminada', 'La tarea se ha eliminado exitosamente.', 'success' );
        this.getTareas(this.asignacionMaestroId!);
      },
      error: (error) => {
        Swal.fire('Error', 'Ha ocurrido un error. Intentélo más tarde.', 'error' );
      }
    });
  }

  get fecha() { return this.formData.get('fecha'); }
  get bimestre() { return this.formData.get('bimestre'); }
  get id() { return this.formDataTarea.get('id'); }
  get nombre() { return this.formDataTarea.get('nombre'); }
  get nota() { return this.formDataTarea.get('nota'); }
  get fechaLimite() { return this.formDataTarea.get('fechaLimite'); }
  get estado() { return this.formDataTarea.get('estado'); }
  get bimestres() { return this.formDataTarea.get('bimestre'); }
  get tipo_tarea() { return this.formDataTarea.get('tipo_tarea'); }

}
