import { Component, OnInit, ViewChild } from '@angular/core';
import { resolve } from 'dns';
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
  businessModel = new Business()

  ngOnInit(): void {
    this.supplierServices.getSupplierBySessionId().subscribe(response =>{
      this.businessModel = response['business']
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

      // this.personalDetailName = this.supplierModel.full_name
      // this.personalDetailDesignation = this.supplierModel.designation
      // this.personalDetailPhoneNumber = this.supplierModel.phone_number
      // this.personalDetailMobileNumber = this.supplierModel.mobile_number
      // this.personalDetailEmail = this.supplierModel.email
      // this.personalDetailEmailOptional = this.supplierModel.email_optional
      // this.personalDetailAddress = this.supplierModel.address
      // this.personalDetailAreaStreet = this.supplierModel.area_street
      // this.personalDetailCity = this.supplierModel.city
      // this.personalDetailDistrict = this.supplierModel.district
      // this.personalDetailTaluka = this.supplierModel.taluka
      // this.personalDetailState = this.supplierModel.state
      // this.personalDetailPincode = this.supplierModel.pincode
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
    // this.supplierModel.full_name = this.personalDetailName
    // this.supplierModel.designation = this.personalDetailDesignation
    // this.supplierModel.phone_number = this.personalDetailPhoneNumber
    // this.supplierModel.mobile_number = this.personalDetailMobileNumber
    // this.supplierModel.email = this.personalDetailEmail
    // this.supplierModel.email_optional = this.personalDetailEmailOptional
    // this.supplierModel.address = this.personalDetailAddress
    // this.supplierModel.area_street = this.personalDetailAreaStreet
    // this.supplierModel.city = this.personalDetailCity
    // this.supplierModel.district = this.personalDetailDistrict
    // this.supplierModel.taluka = this.personalDetailTaluka
    // this.supplierModel.state = this.personalDetailState
    // this.supplierModel.pincode = this.personalDetailPincode

    console.log("Designation -> ", this.supplierModel.designation)

    this.supplierServices.updatePersonalDetail(this.supplierModel).subscribe(response =>{
      console.log(JSON.stringify(response))
    })
  }

}
