import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

declare function customInitFunctions(): any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';

  ngOnInit(): void {
    console.clear()
    customInitFunctions();
  } 
}
