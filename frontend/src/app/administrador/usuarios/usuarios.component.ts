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

//JQUERY
declare var $:any;

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule
  ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
  public formData: any;
  public formDataUpdate: any;
  public data: any[] = [];
  dtOptions: Config = {};
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective | undefined;
  dtTrigger: Subject<ADTSettings> = new Subject<ADTSettings>();
  
  constructor(
    private usuarioService: UsuarioService,
    private formBuilder: UntypedFormBuilder
  ) {
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };
    this.initializeForm();
    this.initializeFormUpdate();
    this.getAll();
  }

  /**
   * INICIALIZAR FORMULARIO
   */
  initializeForm() {
    this.formData = this.formBuilder.group({
      'id': [0],
      'nombres': [null, [Validators.required, Validators.maxLength(100)] ],
      'apellidos': [null, [Validators.required, Validators.maxLength(100)] ],
      'email': [null, [Validators.required, Validators.maxLength(100)] ],
      'password': [null, [Validators.required, Validators.maxLength(100)] ],
      'rol': [null, [Validators.required, Validators.maxLength(20)] ],
    });
  }

  /**
   * INICIALIZAR FORMULARIO EDITAR
   */
  initializeFormUpdate() {
    this.formDataUpdate = this.formBuilder.group({
      'u_id': [0],
      'u_nombres': [null, [Validators.required, Validators.maxLength(100)] ],
      'u_apellidos': [null, [Validators.required, Validators.maxLength(100)] ],
      'u_email': [null, [Validators.required, Validators.maxLength(100)] ],
      'u_rol': [null, [Validators.required, Validators.maxLength(20)] ],
    });
  }

  /**
   * OBTENER REGISTROS
   */
  getAll() {
    this.usuarioService.getAll()
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
    this.u_id.setValue(data.id)
    this.u_nombres.setValue(data.nombres)
    this.u_apellidos.setValue(data.apellidos)
    this.u_email.setValue(data.email)
    this.u_rol.setValue(data.rol)
  }

  /**
   * CREACION DE PROGRAMA
   */
  create() {
    this.usuarioService.create(this.formData.value)
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
    let data = {
      id: this.u_id.value,
      nombres: this.u_nombres.value,
      apellidos: this.u_apellidos.value,
      email: this.u_email.value,
      rol: this.u_rol.value,
    }
    console.log(data)
    this.usuarioService.update(data)
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
    this.usuarioService.delete(id)
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
   * CAMBIAR CONTRASEÑA
   */
  changePassword(id: number) {
    let nuevaContrasena = this.generarContrasena(8);
    this.usuarioService.changePassword({
      id: id,
      passwordNew: nuevaContrasena
    })
    .subscribe({
      next: (data:any) => {
        console.log(data)
        Swal.fire('Contraseña restablecida', 'La nueva contraseña es: ' + nuevaContrasena, 'success' );
      },
      error: (error) => {
        console.log(error)
        Swal.fire('Error', 'Ha ocurrido un error. Intentélo más tarde.', 'error' );
      }
    });
  }

  generarContrasena(longitud: number): string {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}[]|:;<>,.?';
    let contrasena = '';
    
    for (let i = 0; i < longitud; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      contrasena += caracteres.charAt(indiceAleatorio);
    }
    
    return contrasena;
  }

  get id() { return this.formData.get('id'); }
  get nombres() { return this.formData.get('nombres'); }
  get apellidos() { return this.formData.get('apellidos'); }
  get email() { return this.formData.get('email'); }
  get password() { return this.formData.get('password'); }
  get rol() { return this.formData.get('rol'); }

  get u_id() { return this.formDataUpdate.get('u_id'); }
  get u_nombres() { return this.formDataUpdate.get('u_nombres'); }
  get u_apellidos() { return this.formDataUpdate.get('u_apellidos'); }
  get u_email() { return this.formDataUpdate.get('u_email'); }
  get u_rol() { return this.formDataUpdate.get('u_rol'); }
}
