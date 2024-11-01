import { Routes } from '@angular/router';
import { LoginComponent } from './cliente/login/login.component';
import { InicioComponent } from './cliente/inicio/inicio.component';
import { MaestroComponent } from './maestro/maestro.component';
import { DashboardComponent } from './maestro/dashboard/dashboard.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { UsuariosComponent } from './administrador/usuarios/usuarios.component';
import { GradosComponent } from './administrador/grados/grados.component';
import { SeccionesComponent } from './administrador/secciones/secciones.component';
import { CursosComponent } from './administrador/cursos/cursos.component';
import { AsignacionMaestroComponent } from './administrador/asignacion-maestro/asignacion-maestro.component';
import { AsignacionEstudianteComponent } from './administrador/asignacion-estudiante/asignacion-estudiante.component';
import { MateriasComponent } from './maestro/materias/materias.component';
import { DirectorComponent } from './director/director.component';
import { MateriasDetalleComponent } from './maestro/materias-detalle/materias-detalle.component';
import { ExamenDetalleComponent } from './maestro/examen-detalle/examen-detalle.component';
import { MiPerfilComponent } from './shared/mi-perfil/mi-perfil.component';
import { EstudianteComponent } from './estudiante/estudiante.component';
import { EMateriasComponent } from './estudiante/e-materias/e-materias.component';
import { EDashboardComponent } from './estudiante/e-dashboard/e-dashboard.component';
import { EMateriasDetalleComponent } from './estudiante/e-materias-detalle/e-materias-detalle.component';
import { EExamenComponent } from './estudiante/e-examen/e-examen.component';
import { EMisNotasComponent } from './estudiante/e-mis-notas/e-mis-notas.component';
import { NotasComponent } from './maestro/notas/notas.component';

export const routes: Routes = [
    { 
      path: 'login', 
      component: LoginComponent
    },
    { 
      path: '', 
      component: InicioComponent
    },
    {
      path: 'administrador',
      component: AdministradorComponent,
      children: [
        { path: '', component: UsuariosComponent, data: { titulo: 'Inicio' } },
        { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Usuarios' } },
        { path: 'grados', component: GradosComponent, data: { titulo: 'Grados' } },
        { path: 'secciones', component: SeccionesComponent, data: { titulo: 'Secciones' } },
        { path: 'cursos', component: CursosComponent, data: { titulo: 'Cursos' } },
        { path: 'asignacion-maestro', component: AsignacionMaestroComponent, data: { titulo: 'Asignación de maestros' } },
        { path: 'asignacion-estudiante', component: AsignacionEstudianteComponent, data: { titulo: 'Asignación de estudiantes' } },
        { path: 'mi-perfil', component: MiPerfilComponent, data: { titulo: 'Mi Perfil' } },
      ]
    },
    {
      path: 'director',
      component: DirectorComponent,
      children: [
        { path: '', component: AsignacionMaestroComponent, data: { titulo: 'Inicio' } },
        { path: 'asignacion-maestro', component: AsignacionMaestroComponent, data: { titulo: 'Asignación de maestros' } },
        { path: 'asignacion-estudiante', component: AsignacionEstudianteComponent, data: { titulo: 'Asignación de estudiantes' } },
        { path: 'mi-perfil', component: MiPerfilComponent, data: { titulo: 'Mi Perfil' } },
      ]
    },
    {
      path: 'maestro',
      component: MaestroComponent,
      children: [
        { path: '', component: DashboardComponent, data: { titulo: 'Inicio' } },
        { path: 'inicio', component: DashboardComponent, data: { titulo: 'Inicio' } },
        { path: 'materias', component: MateriasComponent, data: { titulo: 'Materias' } },
        { path: 'materias/:id', component: MateriasDetalleComponent, data: { titulo: 'Detalle de materia' } },
        { path: 'evaluaciones/:id', component: ExamenDetalleComponent, data: { titulo: 'Evaluación' } },
        { path: 'notas/:id/:estudianteId', component: NotasComponent, data: { titulo: 'Notas' } },
        { path: 'asignacion-estudiante', component: AsignacionEstudianteComponent, data: { titulo: 'Asignación de estudiantes' } },
        { path: 'mi-perfil', component: MiPerfilComponent, data: { titulo: 'Mi Perfil' } },
      ]
    },
    {
      path: 'estudiante',
      component: EstudianteComponent,
      children: [
        { path: '', component: EDashboardComponent, data: { titulo: 'Inicio' } },
        { path: 'inicio', component: EDashboardComponent, data: { titulo: 'Inicio' } },
        { path: 'materias', component: EMateriasComponent, data: { titulo: 'Materias' } },
        { path: 'materias/:id', component: EMateriasDetalleComponent, data: { titulo: 'Detalle de materia' } },
        { path: 'examen/:id', component: EExamenComponent, data: { titulo: 'Examen' } },
        { path: 'mis-notas', component: EMisNotasComponent, data: { titulo: 'Notas' } },
        { path: 'mi-perfil', component: MiPerfilComponent, data: { titulo: 'Mi Perfil' } },
      ]
    },
];
