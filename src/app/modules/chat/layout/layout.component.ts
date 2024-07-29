import { Component, OnInit } from '@angular/core';
import { GetFriendDto } from '@common/DTO';
import { Friend } from '@common/models';
import { AuthService } from '@services/auth.service';
import { FriendService } from '@services/friend.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  isCollapsed = false;
  friends: GetFriendDto[] = [];
  current: any;
  constructor(private readonly authService: AuthService) {
    this.authService.getCurrent().subscribe({
      next: (value) => {
        this.authService.setCurrentUser(value.data);
        this.current = value.data;
      },
      error: (_) => {
        this.authService.clearToken();
        this.authService.clearCurrentUser();
      },
    });
  }
  ngOnInit(): void {}
}
