
import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('supplierSignUpModal') supplierSignUpModal : ModalDirective;
  @ViewChild('customerSignUpModal') customerSignUpModal : ModalDirective;

  image : any
  imageByte
  retrievedImage: any;
  base64Data: any;
  retrieveResponse: any;
  imageUrl
  constructor(private productService : ProductService, private domSanitizer: DomSanitizer) { }


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
    thumbImage: 'assets/categories/shovel-svgrepo-com.svg',
    title : 'Farming Tools Equipment & Machines'
}, {
    image: 'assets/categories/tractor.svg',
    thumbImage: 'assets/categories/tractor.svg',
    title : 'Tractor, Tractor Parts & Assemblies'
}, {
    image: 'assets/categories/seed.svg',
    thumbImage: 'assets/categories/seed.svg',
    title : 'Seeds, Plant & Sapling'
},{
    image: 'assets/categories/plant.svg',
    thumbImage: 'assets/categories/plant.svg',
    title : 'Flowers, Plants & Trees'
}, {
    image: 'assets/categories/cow.svg',
    thumbImage: 'assets/categories/cow.svg'
}, {
    image: 'assets/categories/harvester.svg',
    thumbImage: 'assets/categories/harvester.svg'

}];

}
