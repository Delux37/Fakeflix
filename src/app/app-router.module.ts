import { NgModule } from '@angular/core';
import { RouterModule, CanActivate } from '@angular/router';
import { AuthComponent } from './auth/auth-wrapper/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './core/guards/auth.guard';
import { SearchComponent } from './features/search/search.component';

const routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/catalog/catalog.module').then(
        (m) => m.CatalogModule
      ),
  },
  {
    path: 'tv-series',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/catalog/catalog.module').then(
        (m) => m.CatalogModule
      ),
  },
  {
    path: 'movies',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/catalog/catalog.module').then(
        (m) => m.CatalogModule
      ),
  },
  {
    path: 'new-popular',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/catalog/catalog.module').then(
        (m) => m.CatalogModule
      ),
  },
  {
    path: 'my-list',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/catalog/catalog.module').then(
        (m) => m.CatalogModule
      ),
  },
  {
    path: 'search',
    canActivate: [AuthGuard],
    component: SearchComponent,
  },

  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [AuthGuard],
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
