import { Component, ViewChild } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Config } from 'datatables.net';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { GradoService } from '../../services/grado.service';
import { SeccionService } from '../../services/seccion.service';
import { AsignacionEstudianteService } from '../../services/asignacion-estudiante.service';

//JQUERY
declare var $:any;

@Component({
  selector: 'app-asignacion-estudiante',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule
  ],
  templateUrl: './asignacion-estudiante.component.html',
  styleUrl: './asignacion-estudiante.component.css'
})
export class AsignacionEstudianteComponent {
  public formData: any;
  public data: any[] = [];
  public estudiantes: any[] = [];
  public grados: any[] = [];
  public secciones: any[] = [];
  dtOptions: Config = {};
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective | undefined;
  dtTrigger: Subject<ADTSettings> = new Subject<ADTSettings>();
  
  constructor(
    private asignacionEstudianteService: AsignacionEstudianteService,
    private usuarioService: UsuarioService,
    private gradoService: GradoService,
    private seccionService: SeccionService,
    private formBuilder: UntypedFormBuilder
  ) {
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.initializeForm();
    this.getAll();
    this.getAllGrados();
    this.getAllSecciones();
    this.getAllEstudiantes();
  }

  /**
   * INICIALIZAR FORMULARIO
   */
  initializeForm() {
    this.formData = this.formBuilder.group({
      'id': [0],
      'estudianteId': [null, [Validators.required] ],
      'gradoId': [null, [Validators.required] ],
      'seccionId': [null, [Validators.required] ],
      'anio': [null, [Validators.required, Validators.maxLength(4)] ],
    });
  }

  /**
   * OBTENER REGISTROS
   */
  getAll() {
    this.asignacionEstudianteService.getAll()
    .subscribe({
      next: (data:any) => {
        this.data = data;

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

  /**
   * GET SINGLE
   */
  getSingle(data: any) {
    this.id.setValue(data.id)
    this.estudianteId.setValue(data.estudiante.id)
    this.gradoId.setValue(data.grado.id)
    this.seccionId.setValue(data.seccion.id)
    this.anio.setValue(data.anio)
  }

  /**
   * CREACION DE PROGRAMA
   */
  create() {
    this.asignacionEstudianteService.create(this.formData.value)
    .subscribe({
      next: (data:any) => {
        this.getAll();
        this.initializeForm();
        $('#modalFormDataAdd').modal('hide');
        Swal.fire('Usuario agregado', 'El usuario se ha agregado exitosamente.', 'success' );
      },
      error: (error) => {
        Swal.fire('Error', 'Ha ocurrido un error. Intentélo más tarde.', 'error' );
      }
    });
  }

  /**
   * CREACION DE PROGRAMA
   */
  update() {
    this.asignacionEstudianteService.update(this.formData.value)
    .subscribe({
      next: (data:any) => {
        this.getAll();
        this.initializeForm();
        $('#modalFormDataUpdate').modal('hide');
        Swal.fire('Usuario Actualizado', 'El usuario se ha actualizado exitosamente.', 'success' );
      },
      error: (error) => {
        console.log(error)
        Swal.fire('Error', 'Ha ocurrido un error. Intentélo más tarde.', 'error' );
      }
    });
  }

  /**
   * ALERT ELIMINAR
   */
  delete(id:number) {
    Swal.fire({
      title: "Eliminar Usuario",
      text: "¿Está seguro que desea eliminar el usuario?",
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
    this.asignacionEstudianteService.delete(id)
    .subscribe({
      next: (data:any) => {
        this.getAll();
        Swal.fire('Usuario Eliminado', 'El usuairo se ha eliminado exitosamente.', 'success' );
      },
      error: (error) => {
        Swal.fire('Error', 'Ha ocurrido un error. Intentélo más tarde.', 'error' );
      }
    });
  }

  /**
   * OBTENER REGISTROS
   */
  getAllEstudiantes() {
    this.usuarioService.getAllEstudiantes()
    .subscribe({
      next: (data:any) => {
        this.estudiantes = data;
      },
      error: (error) => {
        Swal.fire('Error', 'Ha ocurrido un error al obtener los registros.', 'error' );
      }
    });
  }

  /**
   * OBTENER REGISTROS
   */
  getAllSecciones() {
    this.seccionService.getAll()
    .subscribe({
      next: (data:any) => {
        this.secciones = data;
      },
      error: (error) => {
        Swal.fire('Error', 'Ha ocurrido un error al obtener los registros.', 'error' );
      }
    });
  }

  /**
   * OBTENER REGISTROS
   */
  getAllGrados() {
    this.gradoService.getAll()
    .subscribe({
      next: (data:any) => {
        this.grados = data;
      },
      error: (error) => {
        Swal.fire('Error', 'Ha ocurrido un error al obtener los registros.', 'error' );
      }
    });
  }

  get id() { return this.formData.get('id'); }
  get estudianteId() { return this.formData.get('estudianteId'); }
  get gradoId() { return this.formData.get('gradoId'); }
  get seccionId() { return this.formData.get('seccionId'); }
  get anio() { return this.formData.get('anio'); }
}
