import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './auth/login/login.component';
import { AuthModule } from './auth/auth.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth-wrapper/auth.component';
import { RegisterComponent } from './auth/register/register.component';
import { SearchComponent } from './features/search/search.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule,
    SharedModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadChildren: () => import('./features/catalog/catalog.module').then(m => m.CatalogModule)
      },
      {
        path: 'tv-series',
        loadChildren: () => import('./features/catalog/catalog.module').then(m => m.CatalogModule)
      },
      {
        path: 'movies',
        loadChildren: () => import('./features/catalog/catalog.module').then(m => m.CatalogModule)
      },
      {
        path: 'new-popular',
        loadChildren: () => import('./features/catalog/catalog.module').then(m => m.CatalogModule)
      },
      {
        path: 'my-list',
        loadChildren: () => import('./features/catalog/catalog.module').then(m => m.CatalogModule)
      },
      {
        path: 'search',
        component: SearchComponent
      },

      { path: 'auth', component: AuthComponent, children: [
        { path: '', pathMatch: 'full', redirectTo: 'login' },
        { path: 'login', component: LoginComponent },
        { path: 'register', component: RegisterComponent },
      ] },

      { path: '**', redirectTo: 'auth' }
      
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
