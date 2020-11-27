import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NavbarService } from 'src/app/services/navbar.service';
import { ToastrService } from 'ngx-toastr';

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
  // customerSignUpTaluka : String
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

  loginSupplier(){
    this.navBarService.supplierLogin(this.supplierLoginEmailId, this.supplierLoginpassword).subscribe(resp =>{
      
      console.log("Login reponse" + resp['sessionId'])
      let sessionId = resp['sessionId']
      let supplier = resp['supplier']
      if(sessionId == "Invalid"){
        this.tosterService.error("Invalid Credentials.", "Baliraja", {
          timeOut : 2000, progressBar : true, easing : 'ease-out'
        })
      }
      else{
        localStorage.setItem("sessionId", sessionId)
        localStorage.setItem("supplier", supplier)
        this.router.navigateByUrl('/supplier')
        this.tosterService.success("Login Sucessfully.", "Baliraja", {
          timeOut : 2000, progressBar : true, easing : 'ease-in'
        })
      }
    })
  }
}
