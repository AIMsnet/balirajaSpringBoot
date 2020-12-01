import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Supplier, Business } from 'src/app/models/Supplier';
import { SupplierServiceService } from 'src/app/services/supplier/supplier-service.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {

  @ViewChild('addPersonalDetailModal') addPersonalDetailModal! : ModalDirective;
  @ViewChild('editPersonalDetailModal') editPersonalDetailModal! : ModalDirective;
  @ViewChild('addBusinessDetailModal') addBusinessDetailModal! : ModalDirective;
  @ViewChild('editBusinessDetailModal') editBusinessDetailModal! : ModalDirective;
  @ViewChild('addProductModal') addProductModal! : ModalDirective;
  @ViewChild('editProductModal') editProductModal! : ModalDirective;
 
  constructor(public supplierServices : SupplierServiceService) { }

  // Instances
  personalDetailName : String
  personalDetailDesignation : String  
  personalDetailPhoneNumber : String
  personalDetailMobileNumber : String
  personalDetailEmail : String
  personalDetailEmailOptional : String
  personalDetailAddress : String
  personalDetailAreaStreet : String
  personalDetailCity : String
  personalDetailDistrict : String
  personalDetailTaluka : String
  personalDetailState : String
  personalDetailPincode : String


  // Model Variable
  supplierModel =  new Supplier()


  ngOnInit(): void {
    this.supplierServices.getSupplierBySessionId().subscribe(response =>{
      this.supplierModel = response
      this.personalDetailName = this.supplierModel.full_name
      this.personalDetailDesignation = this.supplierModel.designation
      this.personalDetailPhoneNumber = this.supplierModel.phone_number
      this.personalDetailMobileNumber = this.supplierModel.mobile_number
      this.personalDetailEmail = this.supplierModel.email
      this.personalDetailEmailOptional = this.supplierModel.email_optional
      this.personalDetailAddress = this.supplierModel.address
      this.personalDetailAreaStreet = this.supplierModel.area_street
      this.personalDetailCity = this.supplierModel.city
      this.personalDetailDistrict = this.supplierModel.district
      this.personalDetailTaluka = this.supplierModel.taluka
      this.personalDetailState = this.supplierModel.state
      this.personalDetailPincode = this.supplierModel.pincode
    })
  }

  addPersonalDetail(){
    this.addPersonalDetailModal.show();
  }

  addBusinessDetail(){
    this.addBusinessDetailModal.show();
  }

  newproduct(){
    this.addProductModal.show();
  }

  // Non UI calls
  personalDetailFormSubmit(){
    console.log("Form Submit")

    
  }

}
