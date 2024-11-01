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
  selector: 'app-notas',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule
  ],
  templateUrl: './notas.component.html',
  styleUrl: './notas.component.css'
})
export class NotasComponent {
  data:any;
  dtOptions: Config = {};
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective | undefined;
  dtTrigger: Subject<ADTSettings> = new Subject<ADTSettings>();
  public notas: any[] = []
  public asignacionMaestroId: string = '';
  public estudianteId: string = '';
  
  constructor(
    private route: ActivatedRoute,
    private asignacionMaestroService: AsignacionMaestroService,
    private asignacionEstudianteService: AsignacionEstudianteService,
    private formBuilder: UntypedFormBuilder,
    private asistenciaService: AsistenciaService,
    private tareaEstudianteService: TareaEstudianteService,
  ) {

  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.asignacionMaestroId = this.route.snapshot.paramMap.get('id')!;
    this.estudianteId = this.route.snapshot.paramMap.get('estudianteId')!;
    this.getSingle(this.asignacionMaestroId!);
    this.getNotas(this.asignacionMaestroId, this.estudianteId)
  }

  /**
   * OBTENER REGISTROS
   */
  getSingle(asignacionMaestroId: string) {
    this.asignacionMaestroService.getSingle(asignacionMaestroId)
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
   * OBTENER NOTAS
   */
  getNotas(asignacionMaestroId:string, estudianteId:string) {
    this.tareaEstudianteService.getNotasTareasPorEstudiante(asignacionMaestroId, estudianteId)
    .subscribe({
      next: (data:any) => {
        this.notas = data;
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
}
