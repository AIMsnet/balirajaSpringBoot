import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NavbarService } from 'src/app/services/navbar.service';
import { ToastrService } from 'ngx-toastr';
import { Supplier, CreateSupplier } from '../../models/Supplier'
import { ThrowStmt } from '@angular/compiler';
import { CreateCustomer } from 'src/app/models/Customer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @ViewChild('supplierSignInModal') supplierSignInModal : ModalDirective;
  @ViewChild('supplierSignUpModal') supplierSignUpModal : ModalDirective;
  @ViewChild('customerSignInModal') customerSignInModal : ModalDirective;
  @ViewChild('customerSignUpModal') customerSignUpModal : ModalDirective;

  //Variables
  supplierLoginEmailId : String
  supplierLoginpassword : String

  suppplierSignUpfullname : String
  suppplierSignUpEmail : String
  suppplierSignUpPassword : String
  suppplierSignUpConfirmPassword : String

  customerSignInContact : String

  customerSignUpFullName : String
  customerSignUpMobileNumber : String
  customerSignUpAddress : String
  customerSignUpTaluka : String
  customerSignUpPost : String
  customerSignUpDistrict : String

  sessionId : string

  //Model Variables
  createSupplierModel = new CreateSupplier();

  createCustomerModel = new CreateCustomer();

  constructor(private router: Router, public navBarService : NavbarService, private tosterService : ToastrService) { }

  ngOnInit(): void {
   
  }

  openhome(){
    this.router.navigateByUrl('/home')
  }

  openlistbusiness(){
    this.supplierSignUpModal.show()
  }

  opensuppliersignin(){
    this.supplierSignInModal.show();
  }

  opencustomersignin(){
    this.customerSignInModal.show();
  }

  opengovermentlink(){
    this.router.navigateByUrl('/governmentlink')
  }

  search(){
   /*  var search = $('#navbarSearchInput').val()
    if(search != ""){
      location.href='/product/' + search
    } */
    this.router.navigateByUrl('/product')
  }

  loginSupplier(){
    this.navBarService.supplierLogin(this.supplierLoginEmailId, this.supplierLoginpassword).subscribe(resp =>{
      this.sessionId = resp['sessionId']
      if(this.sessionId == "Invalid"){
        this.tosterService.error("Invalid Credentials.", "Baliraja", {
          timeOut : 2000, progressBar : true, easing : 'ease-out'
        })
      }
      else{
        localStorage.setItem("sessionId", this.sessionId)
        this.router.navigateByUrl('/supplier')
        this.tosterService.success("Login Sucessfully.", "Baliraja", {
          timeOut : 2000, progressBar : true, easing : 'ease-in'
        })
        this.supplierSignInModal.hide();
      }
    })
  }


  createSupplier(){
    console.log("Supplier Name", this.suppplierSignUpfullname)
    if (this.suppplierSignUpPassword == this.suppplierSignUpConfirmPassword){
      this.createSupplierModel.full_name = this.suppplierSignUpfullname
      this.createSupplierModel.email = this.suppplierSignUpEmail
      this.createSupplierModel.password = this.suppplierSignUpPassword
      this.supplierSignUpModal.hide()
      this.navBarService.createNewSupplier(this.createSupplierModel).subscribe(response => {
        this.tosterService.success("Account Created Sucessfully.", "Baliraja", {
          timeOut : 2000, progressBar : true, easing : 'ease-in'
        })
      })
    }
    else{
      this.tosterService.error("Password and Confirm Password does not match.", "Baliraja", {
        timeOut : 2000, progressBar : true, easing : 'ease-out'
      })
    }
  }

  customerSignIn(){
    
  }

  createCustomer(){
    this.createCustomerModel.full_name  = this.customerSignUpFullName
    this.createCustomerModel.mobile_number  = this.customerSignUpMobileNumber
    this.createCustomerModel.address = this.customerSignUpAddress
    this.createCustomerModel.taluka  = this.customerSignUpTaluka
    this.createCustomerModel.pincode = this.customerSignUpPost
    this.createCustomerModel.district = this.customerSignUpDistrict
    this.navBarService.createNewcustomer(this.createCustomerModel).subscribe(response => {
      this.tosterService.success("Account Created.", "Baliraja", {
        timeOut : 2000, progressBar : true, easing : 'ease-in'
      })
    })
  }
}