import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from 'src/app/guards/auth.guard'

import { StockDetailComponent } from './components/stock-detail/stock-detail.component'
import { StockEditComponent } from './components/stock-edit/stock-edit.component'
import { StockCreateComponent } from './components/stock-create/stock-create.component'

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/singup/singup.module').then( m => m.SingupPageModule)
  },
  {
    path: 'forgotpassword',
    loadChildren: () => import('./pages/forgotpassword/forgotpassword.module').then( m => m.ForgotpasswordPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  { path: 'stock-detail/:id', component: StockDetailComponent },
  { path: 'stock-edit/:id', component: StockEditComponent },
  { path: 'stock-create', component: StockCreateComponent },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, 
    { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
