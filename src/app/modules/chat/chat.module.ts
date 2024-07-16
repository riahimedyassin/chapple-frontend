import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { HttpClientModule } from '@angular/common/http';
import { IconsProviderModule } from 'src/app/icons-provider.module';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    ChatRoutingModule,
    NzLayoutModule,
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    HttpClientModule,
    IconsProviderModule,
  ],
})
export class ChatModule {}
