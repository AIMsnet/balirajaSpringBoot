import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('supplierSignUpModal') supplierSignUpModal! : ModalDirective;
  @ViewChild('customerSignUpModal') customerSignUpModal! : ModalDirective;

  constructor() { }

  ngOnInit(): void {
  }

  openSupplierSignUp(){
    this.supplierSignUpModal.show();
  }

  openCustomerSignUp(){
    this.customerSignUpModal.show();
  }

}
