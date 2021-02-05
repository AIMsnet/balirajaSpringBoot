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
import { ContextMenuComponent, ContextMenuService } from 'ngx-contextmenu';
import { HostListener } from '@angular/core';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {

  // View Modal Declarations
  @ViewChild('editPersonalDetailModal') editPersonalDetailModal!: ModalDirective;
  @ViewChild('editBusinessDetailModal') editBusinessDetailModal!: ModalDirective;
  @ViewChild('updateBusinessDetailModal') updateBusinessDetailModal: ModalDirective;
  @ViewChild('logoModal') logoModal: ModalDirective;
  @ViewChild('addProductModal') addProductModal: ModalDirective;
  @ViewChild('updateProductModal') updateProductModal: ModalDirective;
  @ViewChild('addSpecificationModal') addSpecificationModal: ModalDirective;
  @ViewChild('EditSpecificationModal') EditSpecificationModal: ModalDirective;
  @ViewChild('photoModal') photoModal: ModalDirective;
  @ViewChild('editphotoModal') editphotoModal: ModalDirective;
  @ViewChild('productGridTable') productGridTable: AgGridAngular;

  @ViewChild('productTableContext') productTableContext: ContextMenuComponent;

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
  offer: Boolean = false
  isLogin: Boolean = true

  totalLeads: Number = 0
  totalProducts: Number = 0
  totalClicks: Number = 0
  productObject = [] // For storing Product
  quotesObject = []
  addednewProduct: {}
  image
  product_image: boolean = true;
  productImage
  savedProductId: Number
  selectedProduct: Product;
  items: MenuItem[];
  // gridOptions: GridOptions = {
  // }

  private gridApi;
  private gridColumnApi;
  contextRow: any;
  //Table Elements
  // columnDefsProduct = [
  //   { field: 'code', headerName: 'Code' },
  //   { field: 'name', headerName: 'Name' },
  //   { field: 'brand', headerName: 'Brand' },
  //   { field: 'price', headerName: 'Price' },
  //   { field: 'arrival', headerName: 'Arrival' },
  //   { field: 'unit', headerName: 'Unit' },
  //   { field: 'clicks', headerName: 'Clicks' },
  //   { field: 'created_date', headerName: 'Created Date' }
  // ]

  // columnDefsQuotes = [
  //   { field: 'customerName', headerName: 'Customer Name' },
  //   { field: 'customerMobileNumber', headerName: 'Customer Mobile Number' },
  //   { field: 'productName', headerName: 'Product Name' },
  //   { field: 'quantity', headerName: 'Quantity' },
  //   { field: 'requirement', headerName: 'Requirement' }
  // ]


  constructor(private router: Router, public supplierServices: SupplierServiceService,
    private categoryService: CategroyService, private productService: ProductService,
    private tosterService: ToastrService,
    private contextMenuService: ContextMenuService) { }

  @HostListener('window:resize')
  onResize() {
    console.log("onresize methodd")
    if (!this.gridApi) return;

    setTimeout(() => {
      this.gridApi.sizeColumnsToFit();
    });
  }

  ngOnInit(): void {
    this.supplierServices.getSupplierBySessionId().subscribe(response => {

      if (response['full_name'] == "Session Expired" || localStorage.getItem("sessionId") == null) {
        this.isLogin = false
        localStorage.removeItem('sessionId')
        this.tosterService.error("Session Expired.", "Baliraja", {
          timeOut: 2000, progressBar: true, easing: 'ease-in'
        })
        this.router.navigateByUrl('')
      }

      if (this.isLogin) {
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
          console.log("table response"+ this.quotesObject.length);
          this.totalLeads = this.quotesObject.length
          console.log("table response1"+ this.totalLeads);
        })

      }// End of this.login

    })


    this.productObject.forEach(function () {
      this.totalClicks = this.productObject['clicks'] + this.totalClicks
    })

    this.items = [
      { label: 'Edit Product', command: () => this.updateProductModal.show() },
      { label: 'Edit Image', command: () => this.editphotoModal.show() }
    ];
  }// End of ngOnInit

  onGridReady(params) {
    console.log("on ready grid")
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
    window.addEventListener("resize", function () {
      setTimeout(function () {
        params.api.sizeColumnsToFit();
      });
    });
  }

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

  businessDetailFormSubmit(businessDetailForm) {
    this.editBusinessModel.id = this.businessModel.id
    console.log("busineess")
    this.supplierServices.updateBusinessDetail(this.editBusinessModel).subscribe(response => {
      this.businessModel = Object.assign({}, this.editBusinessModel)
      this.tosterService.success("Business Details Updated.", "Baliraja", {
        timeOut: 2000, progressBar: true, easing: 'ease-in'
      })
    })
    businessDetailForm.reset();
    this.editBusinessDetailModal.hide();
  }

  updateBusinessDetailSubmit(updateBusinessDetail) {
    console.log("update business")
    this.editBusinessModel.id = this.businessModel.id
    this.supplierServices.updateBusinessDetail(this.editBusinessModel).subscribe(response => {
      this.businessModel = Object.assign({}, this.editBusinessModel)
      this.tosterService.success("Business Details Updated.", "Baliraja", {
        timeOut: 2000, progressBar: true, easing: 'ease-in'
      })
      this.businessModel = response
      this.editBusinessModel = Object.assign({}, response)
      this.updateBusinessDetailModal.hide();
      updateBusinessDetail.reset();
    })

    console.log("busineess1")
    this.logoModal.show();
  }

  saveLogo(logoUpload) {
    this.logoModal.hide();
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

  updateProduct(updateProductForm) {
    if (this.productModel.name) {
      this.productService.newProduct(this.productModel).subscribe(response => {
        this.savedProductId = Number(response);
        this.updateProductModal.hide();
        this.getProductBySupplier();
        updateProductForm.reset();
        // this.editphotoModal.show();
      })
    }

  }

  saveImage(productImageUpload) {
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
          productImageUpload.reset();
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
    console.log("outside if")
    console.log("product image" + this.productImage)
    if (!this.validateFile(this.productImage)) {
      console.log('Selected file format is not supported');
      this.tosterService.error("Selected file format is not supported");
      return false;
    } else {
      //this.tosterService.success("File Uploaded Successfully");
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
      console.log("image valid")
      this.product_image = false;
      return true;
    }
    else {
      console.log("image invalid")
      this.product_image = true;
      return false;
    }
  }

  onSpecification(specificationForm) {
    this.addSpecificationModal.hide();
    specificationForm.reset();
  }

  onEditSpecification(editspecificationForm) {
    this.EditSpecificationModal.hide();
    editspecificationForm.reset();
  }

  cellRightClickProduct($event) {
    var mouseevent: MouseEvent = $event.event;
    this.contextRow = JSON.parse(JSON.stringify($event.data));
    // this.selectedImportedEnergy = this.contextRow;
    this.productGridTable.api.redrawRows();
    this.contextMenuService.show.next({
      contextMenu: this.productTableContext,
      event: mouseevent,
      item: $event.data

    });
  }

  editProduct() {
    this.updateProductModal.show();
  }

  addImage() {
    this.editphotoModal.show();
  }



}