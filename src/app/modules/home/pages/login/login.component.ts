import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  subscription: Subscription;
  error: boolean = false;
  constructor(
    private readonly authService: AuthService,
    private readonly fb: FormBuilder,
    private readonly router: Router
  ) {}
  ngOnInit(): void {
    this.form = this.fb.nonNullable.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }
  onSubmit() {
    if (this.form.invalid) return;
    this.error = false;
    const [email, password] = [
      this.form.get('email').value,
      this.form.get('password').value,
    ];
    this.subscription = this.authService.login(email, password).subscribe({
      next: ({ data }) => {
        this.authService.setToken(data);
        this.router.navigateByUrl('/chat/welcome');
      },
      error: (_) => {
        this.authService.clearToken();
        this.authService.clearCurrentUser();
        this.error = true;
      },
    });
  }
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
