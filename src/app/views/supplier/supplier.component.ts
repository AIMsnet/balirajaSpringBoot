import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

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
  constructor() { }

  ngOnInit(): void {
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
