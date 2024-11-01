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
import { AsignacionMaestroService } from '../../services/asignacion-maestro.service';
import { GradoService } from '../../services/grado.service';
import { SeccionService } from '../../services/seccion.service';
import { CursoService } from '../../services/curso.service';

//JQUERY
declare var $:any;

@Component({
  selector: 'app-asignacion-maestro',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule
  ],
  templateUrl: './asignacion-maestro.component.html',
  styleUrl: './asignacion-maestro.component.css'
})
export class AsignacionMaestroComponent {
  public formData: any;
  public data: any[] = [];
  public maestros: any[] = [];
  public grados: any[] = [];
  public secciones: any[] = [];
  public cursos: any[] = [];
  dtOptions: Config = {};
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective | undefined;
  dtTrigger: Subject<ADTSettings> = new Subject<ADTSettings>();
  
  constructor(
    private asignacionMaestroService: AsignacionMaestroService,
    private usuarioService: UsuarioService,
    private gradoService: GradoService,
    private seccionService: SeccionService,
    private cursoService: CursoService,
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
    this.getAllCursos();
    this.getAllGrados();
    this.getAllSecciones();
    this.getAllMaestros();
  }

  /**
   * INICIALIZAR FORMULARIO
   */
  initializeForm() {
    this.formData = this.formBuilder.group({
      'id': [0],
      'maestroId': [null, [Validators.required] ],
      'gradoId': [null, [Validators.required] ],
      'seccionId': [null, [Validators.required] ],
      'cursoId': [null, [Validators.required] ],
      'anio': [null, [Validators.required, Validators.maxLength(4)] ],
    });
  }

  /**
   * OBTENER REGISTROS
   */
  getAll() {
    this.asignacionMaestroService.getAll()
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
    this.maestroId.setValue(data.maestro.id)
    this.gradoId.setValue(data.grado.id)
    this.seccionId.setValue(data.seccion.id)
    this.cursoId.setValue(data.curso.id)
    this.anio.setValue(data.anio)
  }

  /**
   * CREACION DE PROGRAMA
   */
  create() {
    this.asignacionMaestroService.create(this.formData.value)
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
    this.asignacionMaestroService.update(this.formData.value)
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
    this.asignacionMaestroService.delete(id)
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
  getAllMaestros() {
    this.usuarioService.getAllMaestros()
    .subscribe({
      next: (data:any) => {
        this.maestros = data;
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

  /**
   * OBTENER REGISTROS
   */
  getAllCursos() {
    this.cursoService.getAll()
    .subscribe({
      next: (data:any) => {
        this.cursos = data;
      },
      error: (error) => {
        Swal.fire('Error', 'Ha ocurrido un error al obtener los registros.', 'error' );
      }
    });
  }

  get id() { return this.formData.get('id'); }
  get maestroId() { return this.formData.get('maestroId'); }
  get gradoId() { return this.formData.get('gradoId'); }
  get seccionId() { return this.formData.get('seccionId'); }
  get cursoId() { return this.formData.get('cursoId'); }
  get anio() { return this.formData.get('anio'); }
}
