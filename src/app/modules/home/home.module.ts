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
import { RegisterComponent } from './pages/register/register.component';
import { StoreModule } from '@ngrx/store';
import { HomeReducer } from './state/home.reducer';
import { EffectsModule } from '@ngrx/effects';
import { HomeEffects } from './state/home.effects';

@NgModule({
  declarations: [
    LandingComponent,
    NavbarComponent,
    LayoutComponent,
    LoginComponent,
    AboutComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    LucideAngularModule.pick(icons),
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forFeature({ name: 'home', reducer: HomeReducer }),
    EffectsModule.forFeature([HomeEffects]),
  ],
})
export class HomeModule {}
