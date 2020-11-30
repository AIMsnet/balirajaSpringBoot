import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Supplier, Business } from 'src/app/models/Supplier';
import { SupplierServiceService } from 'src/app/services/supplier/supplier-service.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {

  @ViewChild('addPersonalDetailModal') addPersonalDetailModal! : ModalDirective;
  @ViewChild('editPersonalDetailModal') editPersonalDetailModal! : ModalDirective;
  @ViewChild('addBusinessDetailModal') addBusinessDetailModal! : ModalDirective;
  @ViewChild('editBusinessDetailModal') editBusinessDetailModal! : ModalDirective;
  @ViewChild('addProductModal') addProductModal! : ModalDirective;
  @ViewChild('editProductModal') editProductModal! : ModalDirective;
 
  constructor(public supplierServices : SupplierServiceService) { }


  supplierModel =  new Supplier()
  login : Boolean
  ngOnInit(): void {
    this.login = true
    this.supplierServices.getSupplierBySessionId().subscribe(response =>{
      this.supplierModel = response
      console.log(response)
      console.log(this.supplierModel)
    })
  }

  addPersonalDetail(){
    this.addPersonalDetailModal.show();
  }

  addBusinessDetail(){
    this.addBusinessDetailModal.show();
  }

  newproduct(){
    this.addProductModal.show();
  }

}
