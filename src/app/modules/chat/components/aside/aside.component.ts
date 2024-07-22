import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetFriendDto } from '@common/DTO';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
})
export class AsideComponent {
  @Input() current: any;
  @Input() friends: GetFriendDto[] = [];
}
