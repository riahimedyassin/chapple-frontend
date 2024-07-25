import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatEvent } from '@common/enums';
import { MessageGroup } from '@common/models';
import { AuthService } from '@services/auth.service';
import { GroupService } from '@services/group.service';

@Component({
  selector: 'app-selected-group',
  templateUrl: './selected-group.component.html',
  styleUrls: ['./selected-group.component.scss'],
})
export class SelectedGroupComponent implements OnInit {
  private groupID: number;
  content: string;
  messages: MessageGroup[] = [];
  current: any;
  constructor(
    private readonly groupService: GroupService,
    private readonly activated: ActivatedRoute,
    private readonly authService: AuthService
  ) {}
  private randomID() {
    return Math.floor(Math.random() * 100);
  }
  ngOnInit(): void {
    this.groupService.connect();
    this.activated.paramMap.subscribe((map) => {
      this.groupID = +map.get('id');
      this.groupService.emit(ChatEvent.JOIN_GROUP, { group: this.groupID });
      this.groupService.on<MessageGroup>(ChatEvent.MESSAGE).subscribe({
        next: (value) => {
          this.messages.push({
            id: this.randomID(),
            content: value.content,
            from: value.from == this.current.email ? 'me' : value.from,
          });
        },
      });
      this.groupService.on(ChatEvent.ERROR).subscribe({
        next: (value) => console.log(value),
      });
      this.groupService.getMessages(this.groupID).subscribe({
        next: ({ data }) => {
          this.messages = data;
        },
      });
    });
    this.authService.getCurrent().subscribe({
      next: (value) => {
        this.current = value.data;
      },
    });
  }
  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }
  sendMessage() {
    this.groupService.emit(ChatEvent.MESSAGE, {
      content: this.content,
      to: this.groupID,
    });
    this.content = '';
  }
}
