import {
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
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
  @ViewChild('container', { static: false })
  container: ElementRef<HTMLDivElement>;
  messages: { date: Date; messages: GetMessageDto[] }[] = [
    {
      date: new Date(),
      messages: [],
    },
  ];
  page: number = 1;
  email: string;
  current: any;
  loaded: boolean = false;
  targetUsername: string;
  constructor(
    private readonly chatService: ChatService,
    private readonly activated: ActivatedRoute,
    private readonly userService: UserService
  ) {}
  ngOnInit(): void {
    console.log("HERE")
    this.chatService.connect();
    this.chatService.on(ChatEvent.ERROR).subscribe({
      next: (value) => console.log(value),
    });
    this.chatService
      .on<{ content: string; from: string }>(ChatEvent.MESSAGE)
      .subscribe({
        next: (value) => {
          this.messages[this.messages.length - 1].messages.push({
            id: this.randomID(),
            content: value.content,
            from: value.from == 'me' ? 'me' : 'user',
            sent_at: new Date(),
          });
        },
      });
    this.activated.paramMap.subscribe((map) => {
      const username = map.get('username');
      this.targetUsername = username;
      this.getMessages(username).subscribe({
        next: ({ data }) => {
          this.messages = data;
          this.scrollToBottom();
          this.loaded = true;
          this.userService.getEmail(username).subscribe({
            next: ({ data }) => (this.email = data.email),
          });
        },
      });
    });
  }
  trackScroll() {
    const currentHeight = this.container.nativeElement.scrollTop;
    if (currentHeight == 0 && this.loaded) {
      this.loaded = false;
      this.page++;
      this.getMessages(this.targetUsername).subscribe({
        next: ({ data }) => {
          this.messages = data;
          this.loaded = true;
          this.container.nativeElement.scrollBy({
            top: 10,
            behavior: 'smooth',
          });
        },
      });
    }
  }
  private getMessages(username: string) {
    return this.chatService.getMessages(username, this.page);
  }
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
  content: string;
  sendMessage() {
    if (!this.content) return;
    this.chatService.emit(ChatEvent.MESSAGE, {
      content: this.content,
      to: this.email,
    });
    this.content = '';
  }
  private randomID() {
    return Math.floor(Math.random() * 100);
  }
  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }
  deleteMessage(date: Date, id: number) {
    this.chatService.deleteMessage(id).subscribe({
      next: (_) => {
        let index = 0;
        while (index++ < this.messages.length) {
          if (
            new Date(this.messages[index].date).getTime() ===
            new Date(date).getTime()
          ) {
            this.messages[index].messages = this.messages[
              index
            ].messages.filter((message) => message.id != id);
            return;
          }
        }
      },
    });
  }
}
