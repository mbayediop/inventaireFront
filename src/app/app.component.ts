import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true, // Composant standalone
  imports: [
    RouterOutlet, // Nécessaire pour le routage
  ],
  template: '<router-outlet></router-outlet>',
  styles: []
})
export class AppComponent {
  title = 'inventaire';
}
