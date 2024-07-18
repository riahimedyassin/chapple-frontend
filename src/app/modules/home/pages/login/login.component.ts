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
    const [email, password] = [
      this.form.get('email').value,
      this.form.get('email').value,
    ];
    this.subscription = this.authService.login(email, password).subscribe({
      next: ({ data }) => {
        this.authService.setToken(data);
        this.router.navigateByUrl('/chat');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
