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
  constructor(
    private readonly friendService: FriendService,
    private readonly authService: AuthService
  ) {
    this.friendService.getAll().subscribe({
      next: ({ data }) => (this.friends = data),
    });
    this.authService.getCurrent().subscribe({
      next: (value) => (this.current = value.data),
    });
  }
  ngOnInit(): void {
    console.log(
      this.authService.getCurrent().subscribe((data) => console.log(data))
    );
  }
}
