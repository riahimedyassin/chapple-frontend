import { Component, OnInit } from '@angular/core';
import { ChatEvent } from '@common/enums';
import { ChatService } from '@services/chat.service';

@Component({
  selector: 'app-selected-chat',
  templateUrl: './selected-chat.component.html',
  styleUrls: ['./selected-chat.component.scss'],
})
export class SelectedChatComponent implements OnInit {
  constructor(private readonly chatService: ChatService) {}
  ngOnInit(): void {
    this.chatService.connect();
    this.chatService.on(ChatEvent.ERROR).subscribe({
      next: (value) => console.log(value),
    });
    this.chatService.on(ChatEvent.MESSAGE).subscribe({
      next: (value) => console.log(value),
    });
  }
  content: string;
  sendMessage() {
    this.chatService.emit(ChatEvent.MESSAGE, {
      content: 'Hello from angular',
      to: 'farah@gmail.com',
    });
  }
}
