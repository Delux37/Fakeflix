import { LoginComponent } from './auth/login/login.component';
import { AuthModule } from './auth/auth.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth-wrapper/auth.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    RouterModule.forRoot([
      { path: 'auth', component: AuthComponent, children: [
        
        { path: 'login', component: LoginComponent }
      ] }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
