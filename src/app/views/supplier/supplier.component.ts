import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Supplier, Business, Product } from 'src/app/models/Supplier';
import { SupplierServiceService } from 'src/app/services/supplier/supplier-service.service';
import { ToastrService } from 'ngx-toastr';
import { CategroyService } from 'src/app/services/categroy/categroy.service';
import { ProductService } from 'src/app/services/product/product.service';
import { GridOptions } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {

  // View Modal Declarations
  @ViewChild('editPersonalDetailModal') editPersonalDetailModal!: ModalDirective;
  @ViewChild('editBusinessDetailModal') editBusinessDetailModal!: ModalDirective;

  @ViewChild('addProductModal') addProductModal: ModalDirective;
  @ViewChild('editProductModal') editProductModal: ModalDirective;

  @ViewChild('addSpecificationModal') addSpecificationModal: ModalDirective;
  @ViewChild('photoModal') photoModal: ModalDirective;
  @ViewChild('productGridTable') productGridTable: AgGridAngular;

  // Instances
  personalDetailName: String
  personalDetailDesignation: String
  personalDetailPhoneNumber: String
  personalDetailMobileNumber: String
  personalDetailEmail: String
  personalDetailEmailOptional: String
  personalDetailAddress: String
  personalDetailAreaStreet: String
  personalDetailCity: String
  personalDetailDistrict: String
  personalDetailTaluka: String
  personalDetailState: String
  personalDetailPincode: String

  // Model Variable
  supplierModel = new Supplier()
  businessModel = new Business()
  editBusinessModel = new Business()
  productModel = new Product()
  editProductModel = new Product()

  mainCategory: Number = 0
  subCategory
  subCategoryObject
  categroyObject
  offer : Boolean = false
  isLogin : Boolean = true

  totalLeads: Number = 0
  totalProducts: Number = 0
  totalClicks: Number = 0
  productObject = [] // For storing Product
  quotesObject = []
  addednewProduct: {}
  image
  productImage
  savedProductId: Number
  gridOptions: GridOptions = {
  }

  //Table Elements
  columnDefsProduct = [
    { field: 'code', headerName: 'Code'},
    { field: 'name', headerName: 'Name'},
    { field: 'brand', headerName: 'Brand'},
    { field: 'price', headerName: 'Price'},
    { field: 'arrival', headerName: 'Arrival'},
    { field: 'unit', headerName: 'Unit'},
    { field: 'clicks', headerName: 'Clicks'},
    { field: 'created_date', headerName: 'Created Date'}
  ]

  columnDefsQuotes = [
    { field: 'customerName', headerName: 'Customer Name'},
    { field: 'customerMobileNumber', headerName: 'Customer Mobile Number'},
    { field: 'productName', headerName: 'Product Name'},
    { field: 'quantity', headerName: 'Quantity'},
    { field: 'requirement', headerName: 'Requirement'}
  ]

  
  constructor(private router: Router, public supplierServices : SupplierServiceService, private categoryService : CategroyService, private productService : ProductService, private tosterService : ToastrService) { }

  ngOnInit(): void {

    this.supplierServices.getSupplierBySessionId().subscribe(response =>{
      
      if (response['full_name'] == "Session Expired" || localStorage.getItem("sessionId") == null){
        this.isLogin = false
        localStorage.removeItem('sessionId')
        this.tosterService.error("Session Expired.", "Baliraja", {
          timeOut: 2000, progressBar: true, easing: 'ease-in'
        })
        this.router.navigateByUrl('')
      }

      if (this.isLogin){
        this.supplierModel.full_name = response['full_name']
        this.supplierModel.designation = response['designation']
        this.supplierModel.phone_number = response['phone_number']
        this.supplierModel.mobile_number = response['mobile_number']
        this.supplierModel.email = response['email']
        this.supplierModel.email_optional = response['email_optional']
        this.supplierModel.address = response['address']
        this.supplierModel.area_street = response['area_street']
        this.supplierModel.city = response['city']
        this.supplierModel.district = response['district']
        this.supplierModel.taluka = response['taluka']
        this.supplierModel.state = response['state']
        this.supplierModel.pincode = response['pincode']

        if (response['business']['0'] == null) {
          this.businessModel.gst = null
        }
        else {
          this.businessModel = response['business']['0']
          this.editBusinessModel = Object.assign({}, response['business']['0'])
        }

        this.productService.getAllProductOfLoggedSupplier(response['business']['0']['id']).subscribe(response => {
          this.productObject = response
          this.totalProducts = this.productObject.length
        })
        
        // Fetching Products
        this.productService.getAllProductOfLoggedSupplier(response['business']['0']['id']).subscribe(response => {
          this.productObject = response
          this.totalProducts = this.productObject.length
        })
       
        // Fetching Quotes
        this.supplierServices.getQuotesBySessionId().subscribe(response => {
          this.quotesObject = response
          this.totalLeads = this.quotesObject.length
        })

      }// End of this.login

     })


    this.productObject.forEach(function () {
      this.totalClicks = this.productObject['clicks'] + this.totalClicks
    })


    this.gridOptions = <GridOptions>{
      onGridReady: () => {
        this.gridOptions.api.sizeColumnsToFit()
        console.log("Grid Caleed")
      }
    }

  }// End of ngOnInit

  //TO make offer field visible line no 659
  offerField() {
    this.offer = !this.offer
  }

  // Non UI calls
  personalDetailFormSubmit() {
    this.supplierServices.updatePersonalDetail(this.supplierModel).subscribe(response => {
      this.editPersonalDetailModal.hide()
      this.tosterService.success("Personal Details Updated.", "Baliraja", {
        timeOut: 2000, progressBar: true, easing: 'ease-in'
      })
    })
  }

  businessDetailFormSubmit() {
    this.editBusinessModel.id = this.businessModel.id

    this.supplierServices.updateBusinessDetail(this.editBusinessModel).subscribe(response => {
      this.businessModel = Object.assign({}, this.editBusinessModel)
      this.tosterService.success("Business Details Updated.", "Baliraja", {
        timeOut: 2000, progressBar: true, easing: 'ease-in'
      })
    })
  }

  updateBusinessDetailSubmit() {
    this.editBusinessModel.id = this.businessModel.id
    this.supplierServices.updateBusinessDetail(this.editBusinessModel).subscribe(response => {
      this.businessModel = Object.assign({}, this.editBusinessModel)
      this.tosterService.success("Business Details Updated.", "Baliraja", {
        timeOut: 2000, progressBar: true, easing: 'ease-in'
      })
      this.businessModel = response
      this.editBusinessModel = Object.assign({}, response)

    })
  }

  getSubCategory() {
    if (this.mainCategory != 0) {
      this.categoryService.getCategory(this.mainCategory).subscribe(response => {
        this.subCategoryObject = response['subMainCategory']
        console.log(this.subCategoryObject)
      })
    }
  }

  getCategory() {
    this.categroyObject = this.subCategoryObject[this.subCategory].category
    console.log(this.categroyObject)
  }

  getProductBySupplier() {
    this.supplierServices.getSupplierBySessionId().subscribe(response => {
      console.log(response)
      this.supplierModel.full_name = response['full_name']
      this.supplierModel.designation = response['designation']
      this.supplierModel.phone_number = response['phone_number']
      this.supplierModel.mobile_number = response['mobile_number']
      this.supplierModel.email = response['email']
      this.supplierModel.email_optional = response['email_optional']
      this.supplierModel.address = response['address']
      this.supplierModel.area_street = response['area_street']
      this.supplierModel.city = response['city']
      this.supplierModel.district = response['district']
      this.supplierModel.taluka = response['taluka']
      this.supplierModel.state = response['state']
      this.supplierModel.pincode = response['pincode']

      if (response['business']['0'] == null) {
        this.businessModel.gst = null
      }
      else {
        this.businessModel = response['business']['0']
        this.editBusinessModel = Object.assign({}, response['business']['0'])
      }

      // Fetching Products
      this.productService.getAllProductOfLoggedSupplier(response['business']['0']['id']).subscribe(response => {
        this.productObject = response
        this.totalProducts = this.productObject.length
      })
    })
  }

  newProduct(addProduct) {
    if (this.productModel.name) {
      this.productService.newProduct(this.productModel).subscribe(response => {
        this.savedProductId = Number(response);
        this.addProductModal.hide();
        this.getProductBySupplier();
        addProduct.reset();
        this.photoModal.show();
      })
    }
  }

  saveImage() {
    if (this.image.size < 3145728) {
      this.productService.saveProductImage(this.image, this.savedProductId)
        .subscribe(response => {
          console.log("Image Resposne", JSON.stringify(response))
          if (response == true) {
            this.tosterService.success("Image Uploaded.", "Baliraja", {
              timeOut: 2000, progressBar: true, easing: 'ease-in'
            })
            this.photoModal.hide()
            this.addProductModal.hide()

            this.addednewProduct = {
              "arrival": this.productModel.arrival,
              "brand": this.productModel.brand,
              "clicks": "0",
              "code": this.productModel.code,
              "created_date": "Today",
              "name": this.productModel.name,
              "price": this.productModel.price,
              "unit": this.productModel.unit,
            }
            this.productObject.push(this.addednewProduct)
            this.productGridTable.api.setRowData(this.productObject)
          }
        })
    }
    else {
      this.tosterService.error("Image Size Exceeds Limit.", "Baliraja", {
        timeOut: 2000, progressBar: true, easing: 'ease-in'
      })
    }

  }

  onFileChanged(event: any) {
    this.image = event.target.files[0]
    if (this.image.size > 3145728) {
      this.tosterService.error("Image Size Exceeds Limit.", "Baliraja", {
        timeOut: 2000, progressBar: true, easing: 'ease-in'
      })
    }
    if (!this.validateFile(this.image[0].name)) {
      console.log('Selected file format is not supported');
      return false;
    }else{
      return true;
    }
    // this.imageFormat.nativeElement.innerHTML;
    //   var fileName = this.productImage;
    // console.log("file name = " + this.productImage);
    // var idxDot = fileName.lastIndexOf(".") + 1;
    // var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    // console.log("file format = " + extFile);
    // if (extFile == "jpg" || extFile == "jpeg" || extFile == "png") {
    //   console.log("if")
    //   this.tosterService.success("Image uploaded");
    // } else {
    //   console.log("else")
    //   this.tosterService.error("Only jpg/jpeg and png images are allowed!");
    // }
  }

  validateFile(name: String) {
    var ext = name.substring(name.lastIndexOf('.') + 1);
    if (ext.toLowerCase() == 'png' || ext.toLowerCase() == 'jpeg' || ext.toLowerCase() == 'jpg') {
      return true;
    }
    else {
      return false;
    }
  }

  onSpecification(specificationForm) {
    this.addSpecificationModal.hide();
    specificationForm.reset();
  }
}

