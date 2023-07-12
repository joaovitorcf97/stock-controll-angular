import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthRequest } from 'src/app/models/interfaces/user/auth/AuthRequest';
import { SignupUserResquest } from 'src/app/models/interfaces/user/signupUserRequest';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  loginCard = true;

  constructor(
    private formbuilder: FormBuilder,
    private userService: UserService,
    private cookieService: CookieService
  ) {}

  loginForm = this.formbuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  signupForm = this.formbuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmitLoginForm(): void {
    if (this.loginForm.value && this.loginForm.valid) {
      this.userService.authUser(this.loginForm.value as AuthRequest).subscribe({
        next: (response) => {
          this.cookieService.set('USER_INFO', response?.token);
          this.loginForm.reset();
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  onSubmitSignupForm(): void {
    if (this.signupForm.value && this.signupForm.valid) {
      this.userService
        .signupUser(this.signupForm.value as SignupUserResquest)
        .subscribe({
          next: (response) => {
            if (response) {
              console.log('Usuario teste criado com sucesso');
              this.signupForm.reset();
              this.loginCard = true;
            }
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }
}
