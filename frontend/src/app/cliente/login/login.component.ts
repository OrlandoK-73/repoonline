import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public formData: any;

  constructor(
    private usuarioService: UsuarioService,
    private formBuilder: UntypedFormBuilder,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.initializeForm();
  }

  /**
   * INICIALIZAR FORMULARIO
   */
  initializeForm() {
    this.formData = this.formBuilder.group({
      'email': [null, [Validators.required, Validators.maxLength(100)] ],
      'password': [null, [Validators.required, Validators.maxLength(100)] ],
    });
  }

  /**
   * INICIAR SESIÓN
   */
  login() {
    this.usuarioService.login(this.formData.value)
    .subscribe({
      next: (data:any) => {
        localStorage.setItem('usuarioAV', JSON.stringify(data))
        Swal.fire('Bienvenido al Aula Digital', 'Bienvenido ' + data.nombres, 'success' );
        if(data.rol == 'ADMINISTRADOR') {
          this.router.navigate(['/administrador/usuarios']);
        } else if(data.rol == 'DIRECTOR') {
          this.router.navigate(['/director/asignacion-maestro']);
        } else if(data.rol == 'MAESTRO') {
          this.router.navigate(['/maestro']);
        } else if(data.rol == 'ESTUDIANTE') {
          this.router.navigate(['/estudiante']);
        }
      },
      error: (error) => {
        Swal.fire('Error', 'Ha ocurrido un error. Intentélo más tarde.', 'error' );
      }
    });
  }

  get email() { return this.formData.get('email'); }
  get password() { return this.formData.get('password'); }
}
