import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FooterComponent } from './component/footer/footer.component';
import { HomeComponent } from './views/home/home.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { GovernmentComponent } from './views/government/government.component';
import { SubcategoriesComponent } from './views/subcategories/subcategories.component';
import { SupplierComponent } from './views/supplier/supplier.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    GovernmentComponent,
    SubcategoriesComponent,
    SupplierComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
