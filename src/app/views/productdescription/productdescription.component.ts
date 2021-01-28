import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Quotes } from 'src/app/models/Supplier';
import { ProductService } from 'src/app/services/product/product.service';
import { SupplierServiceService } from 'src/app/services/supplier/supplier-service.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-productdescription',
  templateUrl: './productdescription.component.html',
  styleUrls: ['./productdescription.component.scss']
})
export class ProductdescriptionComponent implements OnInit {

  @ViewChild('modalGetQuote') modalGetQuote: ModalDirective;

  product
  prodcutQuoteId: Number = 0
  productId : number
  productImage

  supplier
  business
  businessId : String
  quotesObject = new  Quotes()

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private productService: ProductService, private supplierService: SupplierServiceService, private tosterService: ToastrService) { }

  ngOnInit(): void {
    this.productId = Number(this.activatedRoute.snapshot.paramMap.get("id"))
    this.productService.getProduct(this.productId).subscribe(response => {
      this.product = response
      this.productImage = response['productImages']['0']
      this.businessId = response['businessId']
      console.log(this.businessId)

      this.supplierService.getSupplierByBusinessId(this.businessId).subscribe(response => {
        this.supplier = response
        this.business = response["business"]
        this.business = this.business['0']
      })
    })

  }

  openContactSupplier(){
    this.router.navigateByUrl('/contactsupplier')
  }

  openGetQuote(id:Number){
    this.prodcutQuoteId = id
    console.log(this.prodcutQuoteId)
    this.modalGetQuote.show();
  }


  saveQuote() {
    if(localStorage.getItem('sessionId') != null){
      this.quotesObject.customerName = localStorage.getItem('sessionId')
      this.quotesObject.productId = this.prodcutQuoteId

      this.supplierService.newQuotes(this.quotesObject).subscribe(response => {
        if (response['id'] != null) {
          this.tosterService.success("Thank you for quote supplier will contatct you soon.", "Baliraja", {
            timeOut: 2000, progressBar: true, easing: 'ease-in'
          })
        }
      },
      error =>{
        console.log(error)
        this.tosterService.error("Failed to save quote please try again.", "Baliraja", {
          timeOut: 2000, progressBar: true, easing: 'ease-in'
        })
      })
    }
    else{
      this.tosterService.error("Please Login to submit quote.", "Baliraja", {
        timeOut: 2000, progressBar: true, easing: 'ease-in'
      })
    }
  }
}
