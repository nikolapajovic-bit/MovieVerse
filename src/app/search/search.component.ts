import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MovieModel } from '../../models/movie.model';
import { NgFor, NgIf } from '@angular/common';
import { MovieService } from '../../services/movie.service';
import { MatButtonModule } from '@angular/material/button';
import { LoadingComponent } from '../loading/loading.component';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-search',
  imports: [
    MatTableModule,
    NgIf,
    NgFor,
    RouterLink,
    MatButtonModule,
    LoadingComponent,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatCardModule,
    MatSelectModule,
  ],
  providers: [MovieService],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  displayedColumns: string[] = [
    'movieId',
    'title',
    'movieActors',
    'director',
    'movieGenres',
    'runTime',
    'actions',
  ];
  allData: MovieModel[] | null = null;
  actorsList: any[] = [];
  selectedActors: string | null = null;
  dataSource: MovieModel[] | null = null;
  genreList: any[] = [];
  selectedGenre: string[] = [];
  directorList: any[] = [];
  selectedDirector: string | null = null;
  runTimeList: number[] = [];
  selectedRunTime: number | null = null;
  userInput: string = '';
  dateOptions: string[] = [];
  selectedDate: string | null = null;

  public constructor(public movieService: MovieService) {
    MovieService.getMovies().then((rsp) => {
      this.allData = rsp.data;
      this.dataSource = rsp.data;
      this.generateSearchCriteria(rsp.data);
    });
  }

  getActorNames(source: MovieModel): string {
    return source.movieActors.map((actor) => actor.actor.name).join(', ');
  }

  getMovieGenres(source: MovieModel): string {
    return source.movieGenres.map((genre) => genre.genre.name).join(', ');
  }

  public generateSearchCriteria(source: MovieModel[]) {
    this.actorsList = Array.from(
      new Set(
        source.flatMap((obj) =>
          obj.movieActors.map((actor) => actor.actor.name)
        )
      )
    );
    this.genreList = Array.from(
      new Set(
        source.flatMap((obj) =>
          obj.movieGenres.map((genre) => genre.genre.name)
        )
      )
    );
    this.directorList = Array.from(
      new Set(source.map((obj) => obj.director.name))
    );
    this.runTimeList = source.map((obj) => obj.runTime);
  }

  public doReset() {
    this.userInput = '';
    this.selectedActors = null;
    this.selectedGenre = [];
    this.selectedDirector = null;
    this.selectedRunTime = null;
    this.selectedDate = null;
    this.dataSource = this.allData;
    this.generateSearchCriteria(this.allData!);
  }

  public doFilterChain() {
    if (this.allData == null) return;

    this.dataSource = this.allData!.filter((obj) => {
      //Input pretraga
      if (this.userInput == '') return true;
      return (
        obj.movieActors
          .map((actor) => actor.actor.name)
          .includes(this.userInput) ||
        obj.movieId.toString().includes(this.userInput) ||
        obj.movieGenres
          .map((genre) => genre.genre.name)
          .includes(this.userInput) ||
        obj.title.includes(this.userInput)
      );
    })
      .filter((obj) => {
        // Actors pretraga
        if (!this.selectedActors) return true;
        return obj.movieActors.some(
          (actor) => actor.actor.name === this.selectedActors
        );
      })
      .filter((obj) => {
        // Genre pretraga
        if (!this.selectedGenre.length) return true;
        return obj.movieGenres.some((genre) =>
          this.selectedGenre.includes(genre.genre.name)
        );
      })
      .filter((obj) => {
        if (!this.selectedDirector) return true;
        return obj.director.name == this.selectedDirector;
      })
      .filter((obj) => {
        if (!this.selectedRunTime) return true;
        return obj.runTime == this.selectedRunTime;
      });

    this.generateSearchCriteria(this.dataSource);
  }
}
