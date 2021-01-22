import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @ViewChild('getQuoteModal') getQuoteModal : ModalDirective;

  searchedProduct : String = ""
  productList : any
  constructor(private router : Router, private activatedRoute : ActivatedRoute, private productService : ProductService) { }

  ngOnInit(): void {
    this.searchedProduct = this.activatedRoute.snapshot.paramMap.get("searchedProduct")
    this.productService.getSearchedProduct(this.searchedProduct).subscribe(response => {
      console.log(response)
      this.productList = response
    })
  }

  openGetQuote(){
    this.getQuoteModal.show();
  }

  openContactSupplier(){
    this.router.navigateByUrl('/contactsupplier')
  }

  productdesc(){
    this.router.navigateByUrl('/productdesc');
  }



}
