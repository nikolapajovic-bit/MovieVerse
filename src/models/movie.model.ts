export interface MovieModel {
  movieId: number;
  internalId: string;
  corporateId: string;
  directorId: number;
  title: string;
  originalTitle: string;
  description: string;
  shortDescription: string;
  poster: string;
  startDate: string;
  shortUrl: string;
  runTime: number;
  createdAt: string;
  updatedAt: string;
  director: {
    directorId: number;
    name: string;
    createdAt: string;
  };
  movieActors: {
    movieActorId: number;
    movieId: number;
    actorId: number;
    actor: {
      actorId: number;
      name: string;
      createdAt: string;
    };
  }[];
  movieGenres: {
    movieGenreId: number;
    movieId: number;
    genreId: number;
    genre: {
      genreId: number;
      name: string;
      createdAt: string;
    };
  }[];
}
