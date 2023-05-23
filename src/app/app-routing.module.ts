import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./portfolio/portfolio.module').then(m => m.PortfolioModule),
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },
  { path: '**', redirectTo: 'login' },
  { path: '', redirectTo: 'login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
