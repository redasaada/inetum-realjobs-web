import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
 
  form: FormGroup;

  user: User ={
    username: '',
    password: ''
  }

  submitted=false;
  constructor(private userService : AuthenticationService) { 
    this.form = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });
  }

  ngOnInit(): void {
  }

  // saveUser(): void {
  //   const data = {
  //     username: this.user.username,
  //     email: this.user.email
  //   };
    

  //   this.userService.create(data)
  //     .subscribe({
  //       next: (res) => {
  //         console.log(res);
  //         this.submitted=true;
  //       },
  //       error:(e) => console.error(e)
  //     });
  // }

  login() {
    this.userService.login(this.form.getRawValue()).subscribe(user => {
        console.log(user);
    });
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
