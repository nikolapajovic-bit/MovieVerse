import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UserModel } from '../../models/user.model';
import { MatTableModule } from '@angular/material/table';
import { OrderModel } from '../../models/order.model';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MovieService } from '../../services/movie.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-user',
  imports: [
    NgIf,
    NgFor,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    RouterLink,
    MatExpansionModule,
    MatAccordion,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  public displayedColumns: string[] = [
    'movieId',
    'title',
    'startDate',
    'count',
    'price',
    'total',
    'status',
    'actions',
  ];
  public user: UserModel | null = null;
  public userCopy: UserModel | null = null;
  public genresList: string[] = [];

  public oldPasswordValue = '';
  public newPasswordValue = '';
  public repeatPasswordValue = '';

  constructor(private router: Router, public utils: UtilsService) {
    if (!UserService.getActiveUser()) {
      router.navigate(['/home']);
      return;
    }

    this.user = UserService.getActiveUser();
    this.userCopy = UserService.getActiveUser();
    MovieService.getGenres().then((rsp) => {
      this.genresList = rsp.data.map(
        (genre: { genreId: number; name: string; createdAt: string }) =>
          genre.name
      );
    });
  }

  public doChangePassword() {
    if (this.oldPasswordValue == '' || this.newPasswordValue == null) {
      alert('Unesite sifru');
      return;
    }

    if (this.newPasswordValue !== this.repeatPasswordValue) {
      alert('Sifre nisu iste');
      return;
    }

    if (this.oldPasswordValue !== this.user?.password) {
      alert('Sifre nisu iste');
      return;
    }

    alert(
      UserService.changePassword(this.newPasswordValue)
        ? 'Sifra uspesno promenjena'
        : 'Doslo je do greske prilikom promene sifre'
    );

    this.oldPasswordValue = '';
    this.newPasswordValue = '';
    this.repeatPasswordValue = '';
  }

  public doUpdateUser() {
    if (this.userCopy == null) {
      alert('Korisnik nije definisan');
      return;
    }

    UserService.updateUser(this.userCopy);
    this.user = UserService.getActiveUser();
    alert('Vasi podaci su azurirani');
  }

  public doPay(order: OrderModel) {
    if (UserService.changeOrderStatus('paid', order.id)) {
      this.user = UserService.getActiveUser();
    }
  }

  public doCancel(order: OrderModel) {
    if (UserService.changeOrderStatus('canceled', order.id)) {
      this.user = UserService.getActiveUser();
    }
  }

  public doRating(order: OrderModel, r: boolean) {
    if (UserService.changeRating(r, order.id)) {
      this.user = UserService.getActiveUser();
    }
  }
}
