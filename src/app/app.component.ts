import { Component } from '@angular/core';
import { RouterOutlet , Router} from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CommonModule,HttpClientModule],
  templateUrl: './app.component.html',  // On utilise maintenant un fichier externe
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  shouldShowHeader(): boolean {
    return !this.router.url.includes('/login') && 
    !this.router.url.includes('/connexion');
  }
  constructor(private router: Router) {}

  title = 'inventaire';
}
