import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';
import { SupplierServiceService } from 'src/app/services/supplier/supplier-service.service';

@Component({
  selector: 'app-productdescription',
  templateUrl: './productdescription.component.html',
  styleUrls: ['./productdescription.component.scss']
})
export class ProductdescriptionComponent implements OnInit {

  product
  productId : number
  productImage

  supplier
  business
  businessId : String

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private productService: ProductService, private supplierService: SupplierServiceService) { }

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
}
