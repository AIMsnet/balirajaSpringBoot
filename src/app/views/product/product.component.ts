import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ProductService } from 'src/app/services/product/product.service';
import { Quotes } from 'src/app/models/Supplier';
import { ToastrService } from 'ngx-toastr';
import { SupplierServiceService } from 'src/app/services/supplier/supplier-service.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
 
  @ViewChild('modalGetQuote') modalGetQuote: ModalDirective;


  quotesObject = new Quotes()
  searchedProduct : String = ""
  productList : any
  prodcutQuoteId : Number = 0
  productQuoteName : String= ""

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private supplierService: SupplierServiceService, private productService: ProductService, private tosterService: ToastrService) { }

  ngOnInit(): void {
    this.searchedProduct = this.activatedRoute.snapshot.paramMap.get("searchedProduct")
    this.productService.getSearchedProduct(this.searchedProduct).subscribe(response => {
      console.log(response)
      this.productList = response
    })
  }

  openGetQuote(id : Number, productName : String){
    this.prodcutQuoteId = id
    this.productQuoteName = productName
    console.log(this.prodcutQuoteId)
    this.modalGetQuote.show();
  }

  openContactSupplier(){
    this.router.navigateByUrl('/contactsupplier')
  }

  productdesc(id){
    this.router.navigateByUrl('/productdesc/' + id);
  }

  saveQuote() {
    if (localStorage.getItem('sessionId') != null) {
      this.quotesObject.customerName = localStorage.getItem('sessionId')
      this.quotesObject.productId = this.prodcutQuoteId

      this.supplierService.newQuotes(this.quotesObject).subscribe(response => {
        if (response['id'] != null) {
          this.tosterService.success("Thank you for quote supplier will contatct you soon.", "Baliraja", {
            timeOut: 2000, progressBar: true, easing: 'ease-in'
          })
        }
      },
        error => {
          console.log(error)
          this.tosterService.error("Failed to save quote please try again.", "Baliraja", {
            timeOut: 2000, progressBar: true, easing: 'ease-in'
          })
        })
    }
    else {
      this.tosterService.error("Please Login to submit quote.", "Baliraja", {
        timeOut: 2000, progressBar: true, easing: 'ease-in'
      })
    }
  }

}
