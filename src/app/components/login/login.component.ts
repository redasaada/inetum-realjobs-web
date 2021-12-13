import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from 'src/app/services/authentication.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  badCredentials: boolean = false;

  // empty:boolean;

  constructor(private userService: AuthenticationService,
              private router: Router, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.loginForm.valueChanges.subscribe(() => {
      this.badCredentials = false;
    });
  }

  login() {
    if (this.loginForm.valid) {
      // this.empty=false;
      this.userService.login(this.loginForm.getRawValue()).subscribe(() => {
        this.router.navigate(['']);
        this.badCredentials = false;
      }, error => {
        this.badCredentials = true;
      });
    } else {
      // this.empty= true;
    }

  }

  logout() {
    this.userService.logout();
  }

  isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }

  get form() {
    return this.loginForm.controls;
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
