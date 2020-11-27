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

  imageObject = [{
    image: 'assets/categories/shovel-svgrepo-com.svg',
    thumbImage: 'assets/categories/shovel-svgrepo-com.svg'
}, {
    image: 'assets/categories/tractor.svg',
    thumbImage: 'assets/categories/tractor.svg'
}, {
    image: 'assets/categories/seed.svg',
    thumbImage: 'assets/categories/seed.svg'
},{
    image: 'assets/categories/plant.svg',
    thumbImage: 'assets/categories/plant.svg'
}, {
    image: 'assets/categories/cow.svg',
    thumbImage: 'assets/categories/cow.svg'
}, {
    image: 'assets/categories/harvester.svg',
    thumbImage: 'assets/categories/harvester.svg'

}];

}
