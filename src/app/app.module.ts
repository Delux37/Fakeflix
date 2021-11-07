import { AppRouterModule } from './app-router.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './auth/auth.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth-wrapper/auth.component';
import { RegisterComponent } from './auth/register/register.component';
import { SearchComponent } from './features/search/search.component';
import { CoreModule } from './core/core.module';

const components = [AppComponent, SearchComponent];
const modules = [
  BrowserModule,
  BrowserAnimationsModule,
  HttpClientModule,
  AppRouterModule,
  RouterModule,
  CoreModule,
  AuthModule,
  SharedModule,
];

@NgModule({
  declarations: [...components],
  imports: [
    ...modules,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
