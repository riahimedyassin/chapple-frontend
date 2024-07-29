import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { GetFriendDto } from '@common/DTO';
import { GetGroupDto } from '@common/DTO/get-group.dto';
import { FriendService } from '@services/friend.service';
import { GroupService } from '@services/group.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit {
  form: FormGroup;
  status: 'added' | 'error' | 'pending' = 'pending';
  groups: GetGroupDto[] = [];
  addGroup: boolean = false;
  friends: GetFriendDto[] = [];
  constructor(
    private readonly groupService: GroupService,
    private readonly fb: FormBuilder,
    private readonly friendService: FriendService
  ) {}
  ngOnInit(): void {
    this.form = this.fb.nonNullable.group({
      name: [null, [Validators.required]],
      users: [[], [Validators.required]],
    });
    this.groupService.getAllGroups().subscribe({
      next: ({ data }) => {
        this.groups = data;
      },
    });
    this.friendService.getAll().subscribe({
      next: ({ data }) => (this.friends = data),
    });
  }
  addUser(email: string) {
    (this.form.get('users') as FormControl<string[]>).patchValue([
      ...this.form.get('users').value,
      email,
    ]);
  }
  onSubmit() {
    if (this.form.invalid) return;
    const name = this.form.get('name').value;
    const users = this.form.get('users').value;
    this.groupService.create(name, users).subscribe({
      next: (_) => {
        this.addGroup = false;
      },
      error: (error) => console.log(error),
    });
  }
  toggleAddGroup() {
    this.addGroup = !this.addGroup;
  }
  addGroupMessage() {
    return this.addGroup ? 'Cancel' : 'Add new friend';
  }
}
