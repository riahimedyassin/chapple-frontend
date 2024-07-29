import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GetFriendDto, GetFriendRequestDto } from '@common/DTO';
import { FriendService } from '@services/friend.service';
import { GroupService } from '@services/group.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss'],
})
export class FriendComponent implements OnInit {
  friends: GetFriendDto[] = [];
  addFriend: boolean = false;
  form: FormGroup;
  requests: { count: number; list: GetFriendRequestDto[] } = {
    count: 0,
    list: [],
  };
  constructor(
    private readonly fb: FormBuilder,
    private readonly friendService: FriendService,
    private readonly groupService: GroupService
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
    this.friendService.getAll().subscribe({
      next: ({ data }) => (this.friends = data),
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
        }, 1500);
      },
    });
  }
  respondRequest(request: GetFriendRequestDto, respond: boolean) {
    this.friendService.respond(request.id, respond).subscribe({
      next: (_) => {
        if (respond) {
          this.friends.push({
            friend: request.sent_by,
            sent_at: request.sent_at,
            id: request.id,
          });
        }
        this.requests.count--;
        this.requests.list = this.requests.list.filter(
          (req) => req.id != request.id
        );
      },
    });
  }
  status: 'added' | 'error' | 'pending' = 'pending';
}
