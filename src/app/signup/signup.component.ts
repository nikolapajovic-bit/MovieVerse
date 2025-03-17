import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { MatSelectModule } from '@angular/material/select';
import { NgFor } from '@angular/common';
import { UserService } from '../../services/user.service';
import { MovieModel } from '../../models/movie.model';

@Component({
  selector: 'app-signup',
  imports: [
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink,
    MatSelectModule,
    NgFor,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  public genresList: string[] = [];
  public email = '';
  public firstName = '';
  public lastName = '';
  public phone = '';
  public address = '';
  public password = '';
  public repeatPassword = '';
  public genre = '';

  public constructor(private router: Router) {
    MovieService.getGenres().then((rsp) => {
      this.genresList = rsp.data.map(
        (genre: { genreId: number; name: string; createdAt: string }) =>
          genre.name
      );
    });
  }

  public doSignup() {
    if (this.email == '' || this.password == '') {
      alert('Email and password are required fields');
      return;
    }

    if (this.password !== this.repeatPassword) {
      alert('Passwords dont match');
      return;
    }

    const result = UserService.createUser({
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      address: this.address,
      favouriteGenre: this.genre,
      orders: [],
    });

    result ? this.router.navigate(['/login']) : alert('Email is already taken');
  }
}
