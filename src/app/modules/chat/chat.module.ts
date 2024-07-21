import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { IconsProviderModule } from 'src/app/icons-provider.module';
import { BoxDirective } from '@common/directives/box.directive';
import { SelectedChatComponent } from './pages/selected-chat/selected-chat.component';
import { FormsModule } from '@angular/forms';
import { icons, LucideAngularModule } from 'lucide-angular';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { AuthInterceptor } from '@common/interceptors/auth.interceptor';
import { FriendService } from '@services/friend.service';

@NgModule({
  declarations: [LayoutComponent, SelectedChatComponent, WelcomeComponent],
  imports: [
    CommonModule,
    ChatRoutingModule,
    NzLayoutModule,
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    HttpClientModule,
    IconsProviderModule,
    BoxDirective,
    FormsModule,
    LucideAngularModule.pick(icons),
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    FriendService,
  ],
})
export class ChatModule {}
