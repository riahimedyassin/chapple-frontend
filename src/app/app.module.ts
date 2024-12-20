import { NgModule } from '@angular/core';

import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthService } from '@services/auth.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GlobalStateReducer } from './state/global.reducer';

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    FormsModule,
    NzButtonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(GlobalStateReducer),
    EffectsModule.forRoot([]),
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
