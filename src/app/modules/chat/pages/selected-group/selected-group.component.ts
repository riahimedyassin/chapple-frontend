import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetGroupDto } from '@common/DTO/get-group.dto';
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
  @ViewChild('container', { static: false })
  container: ElementRef<HTMLDivElement>;
  private groupID: number;
  content: string;
  messages: MessageGroup[] = [];
  current: any;
  isFirstTime: boolean = true;
  currentGroup: GetGroupDto;
  constructor(
    private readonly groupService: GroupService,
    private readonly activated: ActivatedRoute,
    private readonly authService: AuthService
  ) {}
  private scrollToBottom(): void {
    setTimeout(() => {
      if (this.container && this.container.nativeElement) {
        this.container.nativeElement.scrollBy({
          top: this.container.nativeElement.scrollHeight,
          behavior: 'auto',
        });
      }
    });
  }
  private randomID() {
    return Math.floor(Math.random() * 100);
  }
  ngOnInit(): void {
    this.groupService.connect();
    this.authService.getCurrent().subscribe({
      next: (value) => {
        this.current = value.data;
      },
    });
    this.activated.paramMap.subscribe((map) => {
      if (!this.isFirstTime) {
        this.groupService.emit(ChatEvent.LEAVE_GROUP, { group: this.groupID });
        this.groupService.leaveGroup(this.groupID);
      }
      this.groupID = +map.get('id');
      this.groupService.getOne(this.groupID).subscribe({
        next: ({ data }) => {
          console.log(data);
          this.currentGroup = data;
        },
      });
      this.groupService.emit(ChatEvent.JOIN_GROUP, { group: this.groupID });
      this.isFirstTime = false;
      this.groupService
        .on<MessageGroup>(`group:${this.groupID}:message`)
        .subscribe({
          next: (value) => {
            this.messages.push({
              id: this.randomID(),
              content: value.content,
              from: value.from == this.current.email ? 'me' : value.from,
            });
            this.scrollToBottom();
          },
        });
      this.groupService.on(ChatEvent.ERROR).subscribe({
        next: (value) => console.log(value),
      });
      this.groupService.getMessages(this.groupID).subscribe({
        next: ({ data }) => {
          this.messages = data;
          this.scrollToBottom();
        },
      });
    });
  }
  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }
  sendMessage() {
    if (!this.content) return;
    this.groupService.emit(ChatEvent.MESSAGE, {
      content: this.content,
      to: this.groupID,
    });
    this.content = '';
  }
}
