import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactsupplierComponent } from './views/contactsupplier/contactsupplier.component';
import { GovernmentComponent } from './views/government/government.component';
import { HomeComponent } from './views/home/home.component';
import { ProductComponent } from './views/product/product.component';
import { ProductdescriptionComponent } from './views/productdescription/productdescription.component';
import { SubcategoriesComponent } from './views/subcategories/subcategories.component';
import { SupplierComponent } from './views/supplier/supplier.component';

const routes: Routes = [
  {
    path : '',
    redirectTo : '/home',
    pathMatch : 'full'
  },
  {
    path : '',
    children: [
      {
        path : 'home',
        component : HomeComponent
      },
      {
        path : "governmentlink",
        component : GovernmentComponent
      },
      {
        path : "subCategories/:id",
        pathMatch : 'full',
        component : SubcategoriesComponent
      },
      {
        path : "supplier",
        component : SupplierComponent
      },
      {
        path : "product/:searchedProduct",
        component : ProductComponent
      },
      {
        path : "productdesc/:id",
        component : ProductdescriptionComponent
      },
      {
        path : "contactsupplier",
        component : ContactsupplierComponent
      }
    ]
  }
  
  /* {
    path : "home", 
    component : HomeComponent
  },
  {
    path : "governmentlink",
    component : GovernmentComponent
  } */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
