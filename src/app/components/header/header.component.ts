import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule,RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  username: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    console.log(this.username=this.authService.getUsername())
  }

  logout(){
    this.authService.logout();
  }
}
