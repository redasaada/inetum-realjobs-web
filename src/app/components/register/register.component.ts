import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Country } from 'src/app/models/country';
import { Gender } from 'src/app/models/gender';
import { Roles } from 'src/app/models/roles.enum';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService]
})
export class RegisterComponent implements OnInit {

  submitted: boolean;

  error: boolean;

  registerForm: FormGroup

  gender: Gender[];

  selectedRole: any = null;

  roles: Roles;

  country: Country[];

  user: User;

  constructor(private authService: AuthenticationService, private router: Router,
    private formBuilder: FormBuilder, private messageService: MessageService) {
    this.gender = [
      { name: 'Male' },
      { name: 'Female' }
    ];
    this.country = [
      { name: 'Belgium', code: 'BE' },
      { name: 'France', code: 'FRA' }
    ];
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      password_repeat: ['', [Validators.required, Validators.minLength(4)]],
      role: ['', Validators.required],
      gender: ['', Validators.required],
      firstName: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$')]],
      dateOfBirth: ['', Validators.required],
      streetName: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$')]],
      houseNumber: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      box: [''],
      city: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9ñÑáéíóúÁÉÍÓÚ ]+$')]],
      postalCode: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      country: ['', Validators.required],
      mobilePhone: ['', [Validators.required]],
    });
    this.error = false;
    this.submitted = false;
  }

  register() {
    if (this.registerForm.valid) {
      this.user = { ... this.registerForm.value };
      this.user.gender = this.user.gender['name'];
      this.user.role = this.getKeyName(this.user.role);
      console.log(this.user);
      this.authService.register(this.user).subscribe(() => {
        this.onSuccess();
      }, error => {
        this.onError();
      });
    } else {
      this.error = true;
    }
  }

  get eRoles(): string[] {
    return Object.values(Roles).map(role => role.toString());
  }

  verify(control: AbstractControl): boolean {
    return control.touched || control.dirty;
  }

  getKeyName(value: string): string {
    return Object.entries(Roles).find(([key, val]) => val === value)?.[0];
  }

  unmatchPassword(): boolean {
    let password = this.registerForm.controls['password'].value;
    let password_repeat = this.registerForm.controls['password_repeat'].value;
    return password !== password_repeat;
  }

  isDateBeforeToday(): boolean {
    let pickedDate = new Date(this.registerForm.controls['dateOfBirth'].value);
    return new Date(pickedDate) > new Date(new Date().toDateString());
  }

  sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  showSuccess() {
    this.messageService.add({ key: 'tl', severity: 'success', summary: 'Success', detail: 'Registration successful' });
  }

  showError() {
    this.messageService.add({ key: 'tl', severity: 'error', summary: 'Error', detail: 'Username is already taken' });
  }

  async onSuccess() {
    this.submitted = true;
    this.showSuccess();
    await this.sleep(1000);
    this.router.navigate(['login']);
    this.error = false;
  }

  onError() {
    this.error = true;
    this.submitted = false;
    this.showError();
  }

  onlyPositive(event: any, controlName: string) {
    if (event.target.value < 1 || !this.hasNumber(event.target.value)) {
      this.registerForm.get(controlName).patchValue(1);
    }
  }

  onlyLetters(event: any, controlName: string) {
    if (this.hasNumber(event.target.value)){
      this.registerForm.get(controlName).patchValue('');
    }
  }

  private hasNumber(myString): boolean{
    return /\d/.test(myString);
    }
}
