import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnDestroy, OnInit {
  current: any;
  subscription: Subscription;
  constructor(private readonly authService: AuthService) {}
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.subscription = this.authService.getCurrent().subscribe({
      next: ({ data }) => (this.current = data),
    });
  }
}
