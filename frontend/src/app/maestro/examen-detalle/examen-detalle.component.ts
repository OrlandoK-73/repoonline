import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { TareaService } from '../../services/tarea.service';
import Swal from 'sweetalert2';
import { Config } from 'datatables.net';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { PreguntaService } from '../../services/pregunta.service';

//JQUERY
declare var $:any;

@Component({
  selector: 'app-examen-detalle',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule
  ],
  templateUrl: './examen-detalle.component.html',
  styleUrl: './examen-detalle.component.css'
})
export class ExamenDetalleComponent {
  public formData: any;
  public data: any;
  public preguntas: any[] = [];
  tareaID:any;
  dtOptions: Config = {};
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective | undefined;
  dtTrigger: Subject<ADTSettings> = new Subject<ADTSettings>();
  
  constructor(
    private route: ActivatedRoute,
    private tareaService: TareaService,
    private preguntaService: PreguntaService
  ) {
    this.initializeForm();
  }

  ngOnInit() {
    this.tareaID = this.route.snapshot.paramMap.get('id');
    this.getSingle(this.tareaID);
    this.getAll();
    this.initializeForm();
  }

  initializeForm() {
    this.formData = new FormGroup({
      'tipo_pregunta': new FormControl('', [Validators.required]),
      'pregunta': new FormControl('', [Validators.required, Validators.maxLength(100)]),
      'respuesta1': new FormControl('', [Validators.maxLength(100)]),
      'respuesta2': new FormControl('', [Validators.maxLength(100)]),
      'respuesta3': new FormControl('', [Validators.maxLength(100)]),
      'respuesta4': new FormControl('', [Validators.maxLength(100)]),
      'correcta': new FormControl('', [Validators.required, Validators.maxLength(100)]),
      'punteo': new FormControl('', [Validators.maxLength(3)]),
      'tareaId': new FormControl(this.tareaID),
      'id': new FormControl(0),
    });
    console.log(this.formData.value)
  }

  saveChanges() {
    // if(this.formData.value.tipoPregunta=='Respuesta Multiple') {
    //   console.log(this.formData.value)
    //   this.create(this.formData.value)
    // } else {
    //   this.formData.get('respuesta1').setValue("Falso");
    //   this.formData.get('respuesta2').setValue("Verdadero");
    //   this.create(this.formData.value)
    //   console.log(this.formData.value)
    // }
    //this.create(this.formData.value)
  }

  saveChanges2() {
    // if(this.formData.value.tipoPregunta=='Respuesta Multiple') {
    //   console.log(this.formData.value)
    //   this.create(this.formData.value)
    // } else {
    //   this.formData.get('respuesta1').setValue("Falso");
    //   this.formData.get('respuesta2').setValue("Verdadero");
    //   this.update(this.formData.value)
    //   console.log(this.formData.value)
    // }
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

  getSingle(id:any) {
    this.tareaService.getSingle(id)
    .subscribe({
      next: (data:any) => {
        this.data = data;
        console.log(this.data)
      },
      error: (error) => {
        Swal.fire('Error', 'Ha ocurrido un error al obtener los registros.', 'error' );
      }
    });
  }

    /**
   * CREACION DE PROGRAMA
   */
  create() {
    this.preguntaService.create(this.formData.value)
    .subscribe({
      next: (data:any) => {
        this.getAll();
        this.initializeForm();
        $('#modalFormDataAdd').modal('hide');
        Swal.fire('Pregunta agregada', 'La pregunta se ha agregado exitosamente.', 'success' );
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
    this.preguntaService.update(this.formData.value)
    .subscribe({
      next: (data:any) => {
        this.getAll();
        this.initializeForm();
        $('#modalFormDataUpdate').modal('hide');
        Swal.fire('Pregunta Actualizada', 'La pregunta se ha actualizado exitosamente.', 'success' );
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
      title: "Eliminar Pregunta",
      text: "¿Está seguro que desea eliminar la pregunta?",
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
    this.preguntaService.delete(id)
    .subscribe({
      next: (data:any) => {
        this.getAll();
        Swal.fire('Pregunta Eliminada', 'La pregunta se ha eliminado exitosamente.', 'success' );
      },
      error: (error) => {
        Swal.fire('Error', 'Ha ocurrido un error. Intentélo más tarde.', 'error' );
      }
    });
  }

  getSinglePregunta(data: any) {
    this.id.setValue(data.id)
    this.tipo_pregunta.setValue(data.tipo_pregunta)
    this.pregunta.setValue(data.pregunta)
    this.respuesta1.setValue(data.respuesta1)
    this.respuesta2.setValue(data.respuesta2)
    this.respuesta3.setValue(data.respuesta3)
    this.respuesta4.setValue(data.respuesta4)
    this.correcta.setValue(data.correcta)
    this.punteo.setValue(data.punteo)
    this.tareaId.setValue(data.tareaId)
  }

  get id() { return this.formData.get('id'); }
  get tipo_pregunta() { return this.formData.get('tipo_pregunta'); }
  get pregunta() { return this.formData.get('pregunta'); }
  get respuesta1() { return this.formData.get('respuesta1'); }
  get respuesta2() { return this.formData.get('respuesta2'); }
  get respuesta3() { return this.formData.get('respuesta3'); }
  get respuesta4() { return this.formData.get('respuesta4'); }
  get correcta() { return this.formData.get('correcta'); }
  get punteo() { return this.formData.get('punteo'); }
  get tareaId() { return this.formData.get('tareaId'); }
}
