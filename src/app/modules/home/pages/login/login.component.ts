import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SetFriends, StartLogin } from '@modules/home/state/home.actions';
import { Store } from '@ngrx/store';
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
    private readonly router: Router,
    private readonly store: Store
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
    this.store.dispatch(StartLogin({ username: email, password: password }));
    // this.store.dispatch(SetFriends());
  }
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
