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
import { TareaEstudianteService } from '../../services/tarea-estudiante.service';

//JQUERY
declare var $:any;

@Component({
  selector: 'app-e-materias-detalle',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule
  ],
  templateUrl: './e-materias-detalle.component.html',
  styleUrl: './e-materias-detalle.component.css'
})
export class EMateriasDetalleComponent {
  data:any;
  public estudiantes: any[] = [];
  public estudiantesAsistencia: any[] = [];
  dtOptions: Config = {};
  @ViewChild(DataTableDirective, {static: false}) dtElement: DataTableDirective | undefined;
  dtTrigger: Subject<ADTSettings> = new Subject<ADTSettings>();
  public formData: any;
  public formDataTarea: any;
  public fechas: any[] = []
  public filtradas: any[] = []
  public asignacionMaestroId: string = '';
  
  /**
   * VISUALIZAR TAREAS
   */
  public tareas: any[] = []
  public tareasBimestreI: any[] = []
  public tareasBimestreII: any[] = []
  public tareasBimestreIII: any[] = []
  public tareasBimestreIV: any[] = []
  public tareasBimestreV: any[] = []
  public file: File | undefined;
  public archivo: string = '';
  public tipoArchivo: string = '';
  public tareaId: string = '';
  public usuario = JSON.parse(localStorage.getItem('usuarioAV')!);
  public asistencias: any[] = []
  public notas: any[] = []

  constructor(
    private route: ActivatedRoute,
    private asignacionMaestroService: AsignacionMaestroService,
    private asignacionEstudianteService: AsignacionEstudianteService,
    private formBuilder: UntypedFormBuilder,
    private asistenciaService: AsistenciaService,
    private tareaService: TareaService,
    private tareaEstudianteService: TareaEstudianteService,
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
    this.getTareas(this.asignacionMaestroId!, this.usuario.id);
    this.initializeForm();
    

    /**
     * INICIALIZACION LIBRERÍA DROPIFY
     */
    $('.dropify').dropify();

    // Used events
    var drEvent = $('#input-file-events').dropify();
    drEvent.on('dropify.beforeClear', function(event: any, element: any) {
        return confirm("Do you really want to delete \"" + element.file.name + "\" ?");
    });
    drEvent.on('dropify.afterClear', function(event: any, element: any) {
        alert('File deleted');
    });
    drEvent.on('dropify.errors', function(event: any, element: any) {
        console.log('Has Errors');
    });
    var drDestroy = $('#input-file-to-destroy').dropify();
    drDestroy = drDestroy.data('dropify')
    $('#toggleDropify').on('click', function(e: any) {
        e.preventDefault();
        if (drDestroy.isDropified()) {
            drDestroy.destroy();
        } else {
            drDestroy.init();
        }
    })
  }

  
  obtenerNotas() {
    this.getNotas(this.asignacionMaestroId!, this.usuario.id);
  }

  obtenerAsistencia() {
    this.getAsistencias(this.asignacionMaestroId!, this.usuario.id);
  }

  /**
   * 
   * OBTENER REGISTROS
   */
  getSingle(materiaId: string) {
    this.asignacionMaestroService.getSingle(materiaId)
    .subscribe({
      next: (data:any) => {
        this.data = data;
      },
      error: (error) => {
        Swal.fire('Error', 'Ha ocurrido un error al obtener los registros.', 'error' );
      }
    });
  }

  /**
   * OBTENER REGISTROS
   */
  getAsistencias(asignacionMaestroId:string, estudianteId:string) {
    this.asistenciaService.getAsistenciaPorEstudiante(asignacionMaestroId, estudianteId)
    .subscribe({
      next: (data:any) => {
        this.asistencias = data;
        console.log(this.asistencias)
        
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
        this.getTareas(this.asignacionMaestroId!, this.usuario.id);
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
        this.getTareas(this.asignacionMaestroId!, this.usuario.id);
      },
      error: (error) => {
        Swal.fire('Error', 'Ha ocurrido un error. Intentélo más tarde.', 'error' );
      }
    });
  }

  /**
   * OBTENER TAREAS
   */
  getTareas(asignacionMaestroId:string, estudianteId:string) {
    this.tareaEstudianteService.getNotasTareasPorEstudiante(asignacionMaestroId, estudianteId)
    .subscribe({
      next: (data:any) => {
        this.tareas = data;
        this.tareasBimestreI = this.tareas.filter((data: any) => data.bimestre == 'PRIMER');
        this.tareasBimestreII = this.tareas.filter((data: any) => data.bimestre == 'SEGUNDO');
        this.tareasBimestreIII = this.tareas.filter((data: any) => data.bimestre == 'TERCER');
        this.tareasBimestreIV = this.tareas.filter((data: any) => data.bimestre == 'CUARTO');
        this.tareasBimestreV = this.tareas.filter((data: any) => data.bimestre == 'QUINTO');
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
    this.tareaId = data.id;
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
        this.getTareas(this.asignacionMaestroId!, this.usuario.id);
      },
      error: (error) => {
        Swal.fire('Error', 'Ha ocurrido un error. Intentélo más tarde.', 'error' );
      }
    });
  }

  /**
  * CARGAR IMAGEN
  */
  seleccionArchivo(event: any) {
    let archivo = event.target.files[0]!;
    
    if (!archivo) {
      this.file = null!;
      return;
    }
    this.file = archivo;
    let mimeType = archivo.type;
    console.log("Mime Type:", mimeType);
    this.tipoArchivo = mimeType;
    
    let reader = new FileReader();

    reader.onload = () => {
      let base64 = reader.result as string;
      console.log(base64);
      this.archivo = base64;
    };

    reader.readAsDataURL(archivo);
  }

  /**
   * ENVIAR TAREA
   */
  enviarTarea() {
    this.tareaEstudianteService.create({
      archivo: this.archivo,
      tipoArchivo: this.tipoArchivo,
      estudianteId:  this.usuario.id,
      tareaId: this.tareaId,
      entregado: 1
    })
    .subscribe({
      next: (data:any) => {
        $('#modalFormDataAdd').modal('hide');
        Swal.fire('Tarea entregada', 'La tarea se ha entregado exitosamente.', 'success' );
      },
      error: (error) => {
        Swal.fire('Error', 'Ha ocurrido un error. Intentélo más tarde.', 'error' );
      }
    });
  }

  /**
   * OBTENER NOTAS
   */
  getNotas(asignacionMaestroId:string, estudianteId:string) {
    this.tareaEstudianteService.getNotasTareasPorEstudiante(asignacionMaestroId, estudianteId)
    .subscribe({
      next: (data:any) => {
        this.notas = data;
      },
      error: (error) => {
        Swal.fire('Error', 'Ha ocurrido un error al obtener los registros.', 'error' );
      }
    });
  }

  get id() { return this.formData.get('id'); }
  get fecha() { return this.formData.get('fecha'); }
  get bimestre() { return this.formData.get('bimestre'); }
  get nombre() { return this.formDataTarea.get('nombre'); }
  get nota() { return this.formDataTarea.get('nota'); }
  get fechaLimite() { return this.formDataTarea.get('fechaLimite'); }
  get estado() { return this.formDataTarea.get('estado'); }
  get bimestres() { return this.formDataTarea.get('bimestre'); }
  get tipo_tarea() { return this.formDataTarea.get('tipo_tarea'); }

}
