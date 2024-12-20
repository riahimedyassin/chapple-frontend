import { Component, OnInit } from '@angular/core';
import { GetFriendDto } from '@common/DTO';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  isCollapsed = false;
  friends: GetFriendDto[] = [];
  current: any;
  constructor() {}
  ngOnInit(): void {}
}
