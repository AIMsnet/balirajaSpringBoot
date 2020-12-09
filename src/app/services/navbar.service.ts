import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Supplier, CreateSupplier} from '../models/Supplier';
import {Customer, CreateCustomer} from '../models/Customer';
import { UrlMappings } from '../shared/UrlMappings';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  constructor(public httpClient : HttpClient) { }

  createNewSupplier(createSupplier : CreateSupplier){
    return this.httpClient.post(environment.baseUrl + UrlMappings.createSupplier, createSupplier)
  }

  supplierLogin(emailId : String, password : String){
    return this.httpClient.get(environment.baseUrl + UrlMappings.supplierLogIn + emailId + "/" + password)
  }

  supplierLogout() : Observable<any>{
    return this.httpClient.get(environment.baseUrl + UrlMappings.supplierLogout + "/" +  localStorage.getItem('sessionId'))
  }
  
  createNewcustomer(createCustomer: CreateCustomer){
    return this.httpClient.post(environment.baseUrl + UrlMappings.createcustomer, createCustomer)
  }

  customerLogin(mobileNumber : Number){
    return this.httpClient.get(environment.baseUrl + UrlMappings.customerLogin + mobileNumber)
  }

}