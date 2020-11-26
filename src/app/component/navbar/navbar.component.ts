import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @ViewChild('supplierSignInModal') supplierSignInModal!: ModalDirective;
  @ViewChild('supplierSignUpModal') supplierSignUpModal! : ModalDirective;
  @ViewChild('customerSignInModal') customerSignInModal! : ModalDirective;
  @ViewChild('customerSignUpModal') customerSignUpModal! : ModalDirective;
  constructor(private router: Router) { }

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
    this.router.navigateByUrl('/supplier')
  }
}
