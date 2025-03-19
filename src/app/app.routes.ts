import { Routes } from '@angular/router';
import { AppointmentPageComponent } from './pages/appointment-page/appointment-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { authGuard } from './guards/auth/auth.guard';
import { userGuard } from './guards/user/user.guard';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  {
    path: 'appointment',
    component: AppointmentPageComponent,
    canActivate: [userGuard],
  },
  { path: 'sign-up', component: SignUpPageComponent, canActivate: [authGuard] },
  { path: 'sign-in', component: SignInPageComponent, canActivate: [authGuard] },
  { path: 'admin', component: AdminPageComponent },
];
