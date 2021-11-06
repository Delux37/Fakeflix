import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth-wrapper/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { SearchComponent } from './features/search/search.component';

const routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('./features/catalog/catalog.module').then(
        (m) => m.CatalogModule
      ),
  },
  {
    path: 'tv-series',
    loadChildren: () =>
      import('./features/catalog/catalog.module').then(
        (m) => m.CatalogModule
      ),
  },
  {
    path: 'movies',
    loadChildren: () =>
      import('./features/catalog/catalog.module').then(
        (m) => m.CatalogModule
      ),
  },
  {
    path: 'new-popular',
    loadChildren: () =>
      import('./features/catalog/catalog.module').then(
        (m) => m.CatalogModule
      ),
  },
  {
    path: 'my-list',
    loadChildren: () =>
      import('./features/catalog/catalog.module').then(
        (m) => m.CatalogModule
      ),
  },
  {
    path: 'search',
    component: SearchComponent,
  },

  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },

  { path: '**', redirectTo: 'auth' },
]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRouterModule { }
