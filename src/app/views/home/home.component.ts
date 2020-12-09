
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

  @ViewChild('supplierSignUpModal') supplierSignUpModal! : ModalDirective;
  @ViewChild('customerSignUpModal') customerSignUpModal! : ModalDirective;

  image : any
  imageByte
  retrievedImage: any;
  base64Data: any;
  retrieveResponse: any;
  imageUrl
  constructor(private productService : ProductService, private domSanitizer: DomSanitizer) { }


  ngOnInit(): void {
    this.productService.getProduct(1).subscribe(response => {
      this.image = response['productImages']['0']['image']
      console.log("Product Response" + this.image)
    

      this.retrievedImage = "data:image/jpeg;base64," + this.image
      this.retrievedImage = this.domSanitizer.bypassSecurityTrustUrl(this.retrievedImage)
      
    })
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
