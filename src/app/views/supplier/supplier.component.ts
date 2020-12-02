import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Supplier, Business } from 'src/app/models/Supplier';
import { SupplierServiceService } from 'src/app/services/supplier/supplier-service.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {

  // View Modal Declarations
  @ViewChild('editPersonalDetailModal') editPersonalDetailModal! : ModalDirective;
  @ViewChild('editBusinessDetailModal') editBusinessDetailModal! : ModalDirective;

  @ViewChild('addProductModal') addProductModal! : ModalDirective;
  @ViewChild('editProductModal') editProductModal! : ModalDirective;
 
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

  login : Boolean


  // Model Variable
  supplierModel =  new Supplier()
  businessModel = new Business()
  editBusinessModel = new Business()

  

  constructor(public supplierServices : SupplierServiceService, private tosterService : ToastrService) { }

  ngOnInit(): void {
    this.login = true
    this.supplierServices.getSupplierBySessionId().subscribe(response =>{
    
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

      if(response['business']['0'] == null){
        this.businessModel.gst = null
      }
      else{
        this.businessModel =  response['business']['0']
        this.editBusinessModel = Object.assign({},  response['business']['0'])
      }
    })
  }

  newproduct(){
    this.addProductModal.show();
  }

  // Non UI calls
  personalDetailFormSubmit(){
    this.supplierServices.updatePersonalDetail(this.supplierModel).subscribe(response =>{
      this.editPersonalDetailModal.hide()
      this.tosterService.success("Personal Details Updated.", "Baliraja", {
        timeOut : 2000, progressBar : true, easing : 'ease-in'
      })
    })
  }

  businessDetailFormSubmit(){
    this.editBusinessModel.id = this.businessModel.id
   
    this.supplierServices.updateBusinessDetail(this.editBusinessModel).subscribe(response =>{
      this.businessModel = Object.assign({}, this.editBusinessModel)
      this.tosterService.success("Business Details Updated.", "Baliraja", {
        timeOut : 2000, progressBar : true, easing : 'ease-in'  
      })
    })
  }

  updateBusinessDetailSubmit(){
    this.editBusinessModel.id = this.businessModel.id
    this.supplierServices.updateBusinessDetail(this.editBusinessModel).subscribe(response =>{
      this.businessModel = Object.assign({}, this.editBusinessModel)
      this.tosterService.success("Business Details Updated.", "Baliraja", {
        timeOut : 2000, progressBar : true, easing : 'ease-in'  
      })
      this.businessModel =  response
      this.editBusinessModel = Object.assign({},  response)

    })
  }

}
