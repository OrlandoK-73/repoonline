import { Component, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Config } from 'datatables.net';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { CursoService } from '../../services/curso.service';

//JQUERY
declare var $:any;

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule
  ],
  templateUrl: './cursos.component.html',
  styleUrl: './cursos.component.css'
})
export class CursosComponent {
  public formData: any;
  public data: any[] = [];
  dtOptions: Config = {};
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective | undefined;
  dtTrigger: Subject<ADTSettings> = new Subject<ADTSettings>();
  
  constructor(
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
  }

  /**
   * INICIALIZAR FORMULARIO
   */
  initializeForm() {
    this.formData = this.formBuilder.group({
      'id': [0],
      'nombre': [null, [Validators.required, Validators.maxLength(100)] ]
    });
  }

  /**
   * OBTENER REGISTROS
   */
  getAll() {
    this.cursoService.getAll()
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
    this.nombre.setValue(data.nombre)
  }

  /**
   * CREACION DE PROGRAMA
   */
  create() {
    this.cursoService.create(this.formData.value)
    .subscribe({
      next: (data:any) => {
        this.getAll();
        this.initializeForm();
        $('#modalFormDataAdd').modal('hide');
        Swal.fire('Curso agregado', 'El curso se ha agregado exitosamente.', 'success' );
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
    this.cursoService.update(this.formData.value)
    .subscribe({
      next: (data:any) => {
        this.getAll();
        this.initializeForm();
        $('#modalFormDataUpdate').modal('hide');
        Swal.fire('Curso Actualizado', 'El curso se ha actualizado exitosamente.', 'success' );
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
      title: "Eliminar Curso",
      text: "¿Está seguro que desea eliminar el curso?",
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
    this.cursoService.delete(id)
    .subscribe({
      next: (data:any) => {
        this.getAll();
        Swal.fire('Curso Eliminado', 'El curso se ha eliminado exitosamente.', 'success' );
      },
      error: (error) => {
        Swal.fire('Error', 'Ha ocurrido un error. Intentélo más tarde.', 'error' );
      }
    });
  }

  get id() { return this.formData.get('id'); }
  get nombre() { return this.formData.get('nombre'); }
}
