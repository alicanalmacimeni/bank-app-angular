import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HesaplarComponent } from './hesaplar/hesaplar.component';
import { HesapDetayComponent } from './hesap-detay/hesap-detay.component';
import { TransferlerComponent } from './transferler/transferler.component';

const routes: Routes = [
  { path: 'anasayfa', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'hesaplar', component: HesaplarComponent },
  { path: 'hesap-detay/:id', component: HesapDetayComponent },
  { path: 'transferler', component: TransferlerComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
