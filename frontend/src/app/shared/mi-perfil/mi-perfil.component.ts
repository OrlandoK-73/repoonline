import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mi-perfil',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './mi-perfil.component.html',
  styleUrl: './mi-perfil.component.css'
})
export class MiPerfilComponent {
  /**
    * FORMULARIOS
    */
  formData: any;
  formDataPassword: any;
  formDataConfiguration: any;

  /**
   * PROPIEDADES SESION
   */
  public usuario = JSON.parse(localStorage.getItem('usuarioAV')!);

  constructor(
    private usuarioService: UsuarioService,
    private formBuilder: UntypedFormBuilder

  ) { }

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem('usuarioAV')!);
    this.initializeForm();
    this.initializeFormPassword();
  }

  /**
   * INICIALIZAR FORMULARIO
   */
  initializeForm() {
    this.formData = this.formBuilder.group({
      'id': [+this.usuario.id],
      'nombres': [this.usuario.nombres, [Validators.required, Validators.maxLength(255)]],
      'apellidos': [this.usuario.apellidos, [Validators.required, Validators.maxLength(255)]],
      'email': [this.usuario.email, [Validators.required, Validators.maxLength(255)]],
      'rol': [this.usuario.rol],
    });
    console.log(this.formData.value)
  }

  /**
   * INICIALIZAR FORMULARIO
   */
  initializeFormPassword() {
    this.formDataPassword = this.formBuilder.group({
      'id': [+this.usuario.id],
      'passwordOld': ['', [Validators.required]],
      'password': ['', [Validators.required]],
      'passwordRepeat': ['', [Validators.required]],
    });
  }

  /**
   * GUARDAR CAMBIOS PERFIL
   */
  saveChanges() {
    this.usuarioService.update(this.formData.value)
    .subscribe({
      next: (data:any) => {
        this.initializeForm();
        Swal.fire('Usuario Actualizado', 'El usuario se ha actualizado exitosamente.', 'success' );
      },
      error: (error) => {
        Swal.fire('Error', 'Ha ocurrido un error. Intentélo más tarde.', 'error' );
      }
    });
  }

  /**
   * RESET PASSWORD
   */
  resetPassword() {
    console.log(this.formDataPassword.value)
    this.usuarioService.changePassword2(this.formDataPassword.value)
    .subscribe({
      next: (data:any) => {
        this.initializeForm();
        Swal.fire('Contraseña Actualizada', 'Tu contraseña se ha actualizado exitosamente.', 'success');
      },
      error: (error) => {
        Swal.fire('Error', 'Ha ocurrido un error. Intentélo más tarde.', 'error' );
      }
    });
  }

  /**
   * PROPIEDADES CAMBIAR PERFIL
   */
  get nombres() { return this.formData.get('nombres'); }
  get apellidos() { return this.formData.get('apellidos'); }
  get telefono() { return this.formData.get('telefono'); }
  get email() { return this.formData.get('email'); }
  get passwordOld() { return this.formDataPassword.get('passwordOld'); }
  get password() { return this.formDataPassword.get('password'); }
  get passwordRepeat() { return this.formDataPassword.get('passwordRepeat'); }
  get configuration1() { return this.formDataConfiguration.get('configuration1'); }
  get configuration2() { return this.formDataConfiguration.get('configuration2'); }
  get configuration3() { return this.formDataConfiguration.get('configuration3'); }
  get configuration4() { return this.formDataConfiguration.get('configuration4'); }
}
