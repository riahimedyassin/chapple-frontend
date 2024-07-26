import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetFriendDto, GetFriendRequestDto } from '@common/DTO';
import { AuthService } from '@services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FriendService } from '@services/friend.service';
import { FriendRequest } from '@common/models';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss'],
})
export class AsideComponent implements OnInit {
  @Input() current: any;
  @Input() friends: GetFriendDto[] = [];
  addFriend: boolean = false;
  form: FormGroup;
  status: 'added' | 'error' | 'pending' = 'pending';
  requests: { count: number; list: GetFriendRequestDto[] } = {
    count: 0,
    list: [],
  };
  constructor(
    private readonly fb: FormBuilder,
    private readonly friendService: FriendService
  ) {}
  toggleAddFriend() {
    this.addFriend = !this.addFriend;
    this.friendService.getAllRequests().subscribe({
      next: ({ data }) => {
        this.requests.list = data;
      },
    });
  }
  ngOnInit(): void {
    this.form = this.fb.nonNullable.group({
      sent_to: [null, [Validators.required]],
    });
    this.friendService.getAllRequestsCount().subscribe({
      next: ({ data }) => {
        this.requests.count = data;
      },
    });
  }
  addFriendButtonMessage() {
    return this.addFriend ? 'Cancel' : 'Add new friend';
  }
  onSubmuit() {
    if (this.form.invalid) return;
    this.friendService.add(this.form.get('sent_to').value).subscribe({
      next: (_) => {
        this.status = 'added';
      },
      error: (_) => {
        this.status = 'error';
      },
      complete: () => {
        const timeout = setTimeout(() => {
          this.addFriend = false;
          this.status = 'pending';
          clearTimeout(timeout);
        }, 2000);
      },
    });
  }
}
