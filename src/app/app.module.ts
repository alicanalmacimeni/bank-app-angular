import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './services/auth.service';
import { DexieService } from './core/dexie.service';
import { RegisterComponent } from './register/register.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HesaplarComponent } from './hesaplar/hesaplar.component';
import { FormsModule } from '@angular/forms';
import { HesapDetayComponent } from './hesap-detay/hesap-detay.component';
import { HesapHareketleriService } from './services/hesap-hareketleri.service';
import { TransferlerComponent } from './transferler/transferler.component';
import { HesapKartComponent } from './hesap-kart/hesap-kart.component';
import { MyCurrencyPipe } from './pipes/my-currency.pipe';
import { TransferColorDirective } from './transfer-color.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    SidebarComponent,
    HesaplarComponent,
    HesapDetayComponent,
    TransferlerComponent,
    HesapKartComponent,
    MyCurrencyPipe,
    TransferColorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule
  ],
  providers: [
    AuthService,
    DexieService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
