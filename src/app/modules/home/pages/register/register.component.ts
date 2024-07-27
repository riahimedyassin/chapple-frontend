import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
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
      username: [null, [Validators.required]],
    });
  }
  onSubmit() {
    if (this.form.invalid) return;
    this.error = false;
    const [email, password, username] = [
      this.form.get('email').value,
      this.form.get('password').value,
      this.form.get('username').value,
    ];
    this.subscription = this.authService
      .register({ email, password, username })
      .subscribe({
        next: (_) => {
          this.router.navigateByUrl('/login');
        },
        error: (_) => {
          this.error = true;
        },
      });
  }
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
