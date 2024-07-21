import { Component } from '@angular/core';
import { Friend } from '@common/models';
import { FriendService } from '@services/friend.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  isCollapsed = false;
  contacts: any = [];
  friends: Friend[] = [];
  constructor(private readonly friendService: FriendService) {
    this.friendService.getAll().subscribe({
      next: ({ data }) => (this.friends = data),
    });
  }
}
