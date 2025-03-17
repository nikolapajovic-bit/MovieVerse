import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieModel } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';
import { NgIf, NgFor } from '@angular/common';
import { LoadingComponent } from '../loading/loading.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-details',
  imports: [
    NgFor,
    NgIf,
    LoadingComponent,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  public movie: MovieModel | null = null;
  public actors: { actorId: number; name: string }[] = [];

  public constructor(
    private route: ActivatedRoute,
    public utils: UtilsService
  ) {
    route.params.subscribe((params) => {
      MovieService.getMoviesById(params['id']).then((rsp) => {
        this.movie = rsp.data;
      });
      MovieService.getMovieActors(params['id']).then((actors) => {
        this.actors = actors;
      });
    });
  }
}
