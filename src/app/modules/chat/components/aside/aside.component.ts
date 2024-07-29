import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetFriendDto, GetFriendRequestDto } from '@common/DTO';
import { AuthService } from '@services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FriendService } from '@services/friend.service';
import { FriendRequest } from '@common/models';
import { GetGroupDto } from '@common/DTO/get-group.dto';
import { GroupService } from '@services/group.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
})
export class AsideComponent {
  @Input() current: any;
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}
  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
