import axios from 'axios';
import { MovieModel } from '../models/movie.model';

const client = axios.create({
  baseURL: 'https://movie.pequla.com/api',
  headers: {
    Accept: 'application/json',
    'X-Client-Name': 'CINEMA',
  },
  validateStatus: (status: number) => {
    return status === 200;
  },
});

export class MovieService {
  static async getMovies() {
    return client.request({
      url: '/movie',
      method: 'GET',
      params: {
        sort: 'runTime,asc',
      },
    });
  }

  static async getGenres() {
    return client.request({
      url: '/genre',
      method: 'GET',
    });
  }

  static async getActors() {
    return client.request({
      url: '/actor',
      method: 'GET',
    });
  }

  static async getMoviesById(id: number) {
    return client.get(`/movie/${id}`);
  }

  static async getMovieActors(
    movieId: number
  ): Promise<{ actorId: number; name: string }[]> {
    const response = await client.get<MovieModel>(`/movie/${movieId}`);

    if (
      !response.data.movieActors ||
      !Array.isArray(response.data.movieActors)
    ) {
      console.error('MovieActors is missing or not an array', response.data);
      return [];
    }

    return response.data.movieActors.map((actor) => {
      if (!actor.actor) {
        console.error('Missing actor details in movieActors', actor);
        return { actorId: 0, name: 'Unknown' };
      }
      return {
        actorId: actor.actor.actorId,
        name: actor.actor.name,
      };
    });
  }

  static async getMovieGenres(
    movieId: number
  ): Promise<{ genreId: number; name: string }[]> {
    const response = await client.get<MovieModel>(`movie/${movieId}`);

    if (
      !response.data.movieGenres ||
      !Array.isArray(response.data.movieGenres)
    ) {
      console.error('MovieGenres is missing or not an array', response.data);
      return [];
    }

    return response.data.movieGenres.map((genre) => {
      if (!genre.genre) {
        console.error('Missing genre details in movieGenres', genre);
        return { genreId: 0, name: 'Unknown' };
      }
      return {
        genreId: genre.genre.genreId,
        name: genre.genre.name,
      };
    });
  }
}
