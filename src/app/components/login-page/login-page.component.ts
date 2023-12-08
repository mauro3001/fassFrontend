import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  constructor(private userService: UsersService, private formBuilder: FormBuilder) {}

  hide: boolean = true;
  //const for manage the loggin and loggout
  loggedIn: boolean = false;
  userForm: FormGroup = new FormGroup({});
  userData: UserModel[] = [];
  user: String = '';

  ngOnInit() {
    this.buildForm();
  }

  /**
   * Build Form for login
   */
  buildForm(){
    this.userForm = this.formBuilder.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    this.getUsers();
  }

  sendLogin(){
    let isValid = this.validateUser(this.userForm.value.user, this.userForm.value.password);
    if(isValid){
      this.loggedIn = true;
      this.user = this.userForm.value.user;
    }else{
      this.loggedIn = false;
    }
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      (data: UserModel[]) => {
        this.userData = data;
      },
      error => {
        console.error(error);
      }
    );
  }

  validateUser(user: String, password: String){
    return this.userData.find((value: UserModel) => value.user === user && value.password === password);

  }

  cleanForm(): void {
    this.userForm.reset();
  }

  getLoggout(event: boolean){
    this.loggedIn = !event;
    this.userForm.reset();
  }
}
