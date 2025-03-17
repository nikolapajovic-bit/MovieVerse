import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { NgFor, NgIf } from '@angular/common';
import { AxiosError } from 'axios';
import { MovieModel } from '../../models/movie.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UtilsService } from '../../services/utils.service';
import { LoadingComponent } from '../loading/loading.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    NgFor,
    NgIf,
    MatButtonModule,
    MatCardModule,
    LoadingComponent,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  public movies: MovieModel[] | null = null;
  public error: string | null = null;

  constructor(public utils: UtilsService) {
    MovieService.getMovies()
      .then((rsp) => {
        this.movies = rsp.data;
      })
      .catch((e: AxiosError) => (this.error = `${e.code}: ${e.message}`));
  }
}
