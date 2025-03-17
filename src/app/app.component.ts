import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, MatToolbarModule, MatButtonModule, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  public service = UserService;

  public constructor(private router: Router) {}

  public doLogout() {
    localStorage.removeItem('active');
    this.router.navigate(['/login']);
  }
}
