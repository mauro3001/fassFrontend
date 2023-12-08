import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-principal-page',
  templateUrl: './principal-page.component.html',
  styleUrls: ['./principal-page.component.scss'],
})
export class PrincipalPageComponent implements OnInit {
  @Input() user: String = '';
  //Output to loggout and go back for login interface
  @Output() loggout: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.getUserByUsername(this.user);
  }

  //Variables for map information about User
  userData: UserModel | undefined;
  moraCuota: boolean = false;
  moraDeuda: boolean = false;

  getUserByUsername(user: String) {
    this.userService.getUserByUser(user).subscribe(
      {
        next: (data: UserModel[]) => {
          this.userData = data[0];
          this.moraCuota = this.userData?.moraCuota === 'yes' ? true : false;
          this.moraDeuda = this.userData?.moraDeuda === 'yes' ? true : false;
        },
        error: (error) => {
          console.error(error);
        }
      }
    );
  }

  loggoutButton(){
    this.loggout.emit(true);
  }
}
