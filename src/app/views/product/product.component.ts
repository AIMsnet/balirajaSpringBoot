import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @ViewChild('getQuoteModal') getQuoteModal : ModalDirective;

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  openGetQuote(){
    this.getQuoteModal.show();
  }

  openContactSupplier(){
    this.router.navigateByUrl('/contactsupplier')
  }

  productdesc(){
    this.router.navigateByUrl('/productdesc');
  }
}
