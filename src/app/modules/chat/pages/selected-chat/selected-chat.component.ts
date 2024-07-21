import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetMessageDto } from '@common/DTO/get-message.dto';
import { ChatEvent } from '@common/enums';
import { ChatService } from '@services/chat.service';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-selected-chat',
  templateUrl: './selected-chat.component.html',
  styleUrls: ['./selected-chat.component.scss'],
})
export class SelectedChatComponent implements OnInit {
  messages: GetMessageDto[] = [];
  page: number = 1;
  email: string;
  current: any;
  constructor(
    private readonly chatService: ChatService,
    private readonly activated: ActivatedRoute,
    private readonly userService: UserService
  ) {}
  ngOnInit(): void {
    this.chatService.connect();
    this.chatService.on(ChatEvent.ERROR).subscribe({
      next: (value) => console.log(value),
    });
    this.chatService.on(ChatEvent.MESSAGE).subscribe({
      next: (value) => console.log(value),
    });
    this;
    this.activated.paramMap.subscribe((map) => {
      const username = map.get('username');
      this.chatService.getMessages(username, 1).subscribe({
        next: ({ data }) => {
          this.messages = data;
          this.userService.getEmail(username).subscribe({
            next: ({ data }) => (this.email = data.email),
          });
        },
      });
    });
  }
  content: string;
  sendMessage() {
    console.log(this.email);
    this.chatService.emit(ChatEvent.MESSAGE, {
      content: this.content,
      to: this.email,
    });
    this.messages.push({
      id: this.randomID(),
      content: this.content,
      from: 'me',
      sent_at: new Date(),
    });
    this.content = '';
  }
  private randomID() {
    return Math.floor(Math.random() * 100);
  }
}
