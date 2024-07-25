import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { LandingComponent } from './pages/landing/landing.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LayoutComponent } from './layout/layout.component';
import { icons, LucideAngularModule } from 'lucide-angular';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AboutComponent } from './pages/landing/sections/about/about.component';

@NgModule({
  declarations: [
    LandingComponent,
    NavbarComponent,
    LayoutComponent,
    LoginComponent,
    AboutComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    LucideAngularModule.pick(icons),
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class HomeModule {}
