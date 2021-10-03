import { LoginComponent } from './auth/login/login.component';
import { AuthModule } from './auth/auth.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth-wrapper/auth.component';
import { RegisterComponent } from './auth/register/register.component';
import { CatalogComponent } from './features/catalog/catalog.component';
import { NavbarComponent } from './features/catalog/navbar/navbar.component';
import { BannerComponent } from './features/catalog/banner/banner.component';

@NgModule({
  declarations: [
    AppComponent,
    CatalogComponent,
    NavbarComponent,
    BannerComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    RouterModule.forRoot([
      { path: '', component: CatalogComponent },

      { path: 'auth', component: AuthComponent, children: [
        { path: '', pathMatch: 'full', redirectTo: 'login' },
        { path: 'login', component: LoginComponent },
        { path: 'register', component: RegisterComponent },
      ] }
      
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
