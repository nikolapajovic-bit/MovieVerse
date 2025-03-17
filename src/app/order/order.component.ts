import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieModel } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';
import { UtilsService } from '../../services/utils.service';
import { MatCardModule } from '@angular/material/card';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order',
  imports: [
    MatCardModule,
    NgIf,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent {
  public movie: MovieModel | null = null;
  public selectedTicketCount: number = 1;
  public selectedPrice: number = 150;

  public constructor(
    private route: ActivatedRoute,
    public utils: UtilsService,
    private router: Router
  ) {
    route.params.subscribe((params) => {
      MovieService.getMoviesById(params['id']).then((rsp) => {
        this.movie = rsp.data;
      });
    });
  }

  public doOrder() {
    Swal.fire({
      title: `Place an order for ${this.movie?.title}?`,
      text: 'Orders can be canceled any time from your user profile!',
      icon: 'warning',
      showCancelButton: true,
      customClass: {
        popup: 'bg-dark',
      },
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Order!',
    }).then((result) => {
      if (result.isConfirmed) {
        const result = UserService.createOrder({
          id: new Date().getTime(),
          movieId: this.movie!.movieId,
          movieTitle: this.movie!.title,
          startDate: this.movie!.startDate,
          count: this.selectedTicketCount,
          pricePerItem: this.selectedPrice,
          status: 'ordered',
          rating: null,
        });
        result
          ? this.router.navigate(['/user'])
          : Swal.fire({
              title: 'Failed creating an order',
              text: 'Something is wrong with your order!',
              icon: 'error',
            });
      }
    });
  }
}
