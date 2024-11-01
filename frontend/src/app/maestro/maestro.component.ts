import { Component } from '@angular/core';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../shared/header/header.component';
import { BreadcrumbsComponent } from '../shared/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-maestro',
  standalone: true,
  imports: [
    SidebarComponent,
    HeaderComponent,
    BreadcrumbsComponent,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './maestro.component.html',
  styleUrl: './maestro.component.css'
})
export class MaestroComponent {
  year = new Date().getFullYear();

}
