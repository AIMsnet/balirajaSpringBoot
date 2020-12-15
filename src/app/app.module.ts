import { BrowserModule, ɵBROWSER_SANITIZATION_PROVIDERS } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FooterComponent } from './component/footer/footer.component';
import { HomeComponent } from './views/home/home.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { GovernmentComponent } from './views/government/government.component';
import { SubcategoriesComponent } from './views/subcategories/subcategories.component';
import { SupplierComponent } from './views/supplier/supplier.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgImageSliderModule } from 'ng-image-slider';
import { ProductComponent } from './views/product/product.component';
import { ProductdescriptionComponent } from './views/productdescription/productdescription.component';
import { ContactsupplierComponent } from './views/contactsupplier/contactsupplier.component';
import { AgGridModule } from 'ag-grid-angular';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    GovernmentComponent,
    SubcategoriesComponent,
    SupplierComponent,
    ProductComponent,
    ProductdescriptionComponent,
    ContactsupplierComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot(),
    NgImageSliderModule,
    AgGridModule.withComponents([])
  ],
  providers: [ɵBROWSER_SANITIZATION_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
