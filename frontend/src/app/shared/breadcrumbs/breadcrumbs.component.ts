import { CommonModule, Location } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, ActivationEnd, Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.css'
})
export class BreadcrumbsComponent  implements OnDestroy{
  public titulo?: string;
  public regresar?: boolean;
  public titleSubscribe$?: Subscription;
  
  constructor(
    private router: Router,
    private location: Location
  ) {
    this.titleSubscribe$ = this.getArgumentData()
    .subscribe( ({titulo, regresar}) => {
        this.titulo = titulo;
        this.regresar = regresar;
    });
  }

  ngOnDestroy(): void {
    this.titleSubscribe$?.unsubscribe();
  }

  getArgumentData() {
    return this.router.events
    .pipe(
      filter( event => event instanceof ActivationEnd && event.snapshot.firstChild === null ),
      map( (event:any) => event?.snapshot?.data ),
    );
  }

  backTo() {
    this.location.back()
  }

}
