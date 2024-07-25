import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BoxDirective } from '@common/directives/box.directive';
import { SelectedChatComponent } from './pages/selected-chat/selected-chat.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { icons, LucideAngularModule } from 'lucide-angular';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { AuthInterceptor } from '@common/interceptors/auth.interceptor';
import { FriendService } from '@services/friend.service';
import { ChatService } from '@services/chat.service';
import { UserService } from '@services/user.service';
import { AsideComponent } from './components/aside/aside.component';
import { SelectedGroupComponent } from './pages/selected-group/selected-group.component';
import { GroupService } from '@services/group.service';

@NgModule({
  declarations: [
    LayoutComponent,
    SelectedChatComponent,
    WelcomeComponent,
    AsideComponent,
    SelectedGroupComponent,
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    NzLayoutModule,
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    HttpClientModule,
    BoxDirective,
    FormsModule,
    LucideAngularModule.pick(icons),
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    FriendService,
    ChatService,
    UserService,
    GroupService,
  ],
})
export class ChatModule {}
