import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GovernmentComponent } from './views/government/government.component';
import { HomeComponent } from './views/home/home.component';
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
        path : "subcategories",
        component : SubcategoriesComponent
      },
      {
        path : "supplier",
        component : SupplierComponent
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
