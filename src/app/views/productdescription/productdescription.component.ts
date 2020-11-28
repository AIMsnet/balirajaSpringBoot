import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productdescription',
  templateUrl: './productdescription.component.html',
  styleUrls: ['./productdescription.component.scss']
})
export class ProductdescriptionComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  openContactSupplier(){
    this.router.navigateByUrl('/contactsupplier')
  }

  openGetQuote(){
    
  }
}
