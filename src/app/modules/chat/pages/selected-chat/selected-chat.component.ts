import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewChildren,
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
    this.chatService
      .on<{ content: string; from: string }>(ChatEvent.MESSAGE)
      .subscribe({
        next: (value) => {
          this.messages.push({
            id: this.randomID(),
            content: value.content,
            from: value.from == 'me' ? 'me' : 'user',
            sent_at: new Date(),
          });
        },
      });
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
  ngAfterViewInit(): void {
    this.scrollToBottom();
  }
  private scrollToBottom(): void {
    setTimeout(() => {
      if (this.container && this.container.nativeElement) {
        this.container.nativeElement.scrollBy({
          top: this.container.nativeElement.scrollHeight,
          behavior: 'smooth',
        });
      } else {
        console.log('NOOOO');
      }
    });
  }
  content: string;
  sendMessage() {
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
}
