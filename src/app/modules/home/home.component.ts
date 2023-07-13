import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { AuthRequest } from 'src/app/models/interfaces/user/auth/AuthRequest';
import { SignupUserResquest } from 'src/app/models/interfaces/user/signupUserRequest';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  loginCard = true;

  constructor(
    private formbuilder: FormBuilder,
    private userService: UserService,
    private cookieService: CookieService,
    private messageService: MessageService,
    private router: Router
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
      this.userService
        .authUser(this.loginForm.value as AuthRequest)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            this.cookieService.set('USER_INFO', response?.token);
            this.loginForm.reset();
            this.router.navigate(['/dashboard']);
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: `Bem vindo de volta ${response?.name}`,
              life: 2000,
            });
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: `Erro ao fazer login`,
              life: 2000,
            });
            console.log(error);
          },
        });
    }
  }

  onSubmitSignupForm(): void {
    if (this.signupForm.value && this.signupForm.valid) {
      this.userService
        .signupUser(this.signupForm.value as SignupUserResquest)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            if (response) {
              console.log('Usuario teste criado com sucesso');
              this.signupForm.reset();
              this.loginCard = true;
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: `Usuário ${response?.name} criado com sucesso`,
                life: 2000,
              });
            }
          },
          error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: `Erro ao criar usuário`,
              life: 2000,
            });
            console.log(error);
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
