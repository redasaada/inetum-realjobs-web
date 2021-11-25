import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-user',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class AddUserComponent implements OnInit {
 
  form: FormGroup;

  user: User ={
    username: '',
    password: ''
  }

  submitted=false;
  constructor(private userService : AuthenticationService,
    private router: Router) { 
    this.form = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });
  }

  ngOnInit(): void {
  }

  login() {
    this.userService.login(this.form.getRawValue()).subscribe();
    this.router.navigate(['']);
  }

  logout(){
    this.userService.logout();
  }

  isLoggedIn(): boolean{
    return this.userService.isLoggedIn();
  }

  newUser(): void{
    this.submitted = false;
    this.user = {
      username: '',
      password: ''
    };
  }
}
