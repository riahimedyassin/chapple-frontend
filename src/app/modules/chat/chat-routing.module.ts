import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { SelectedChatComponent } from './pages/selected-chat/selected-chat.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { SelectedGroupComponent } from './pages/selected-group/selected-group.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'welcome',
        pathMatch: 'full',
      },
      {
        path: 'welcome',
        component: WelcomeComponent,
      },
      {
        path: ':username',
        component: SelectedChatComponent,
      },
      {
        path: 'group/:id',
        component: SelectedGroupComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatRoutingModule {}
