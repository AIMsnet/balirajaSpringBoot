import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Supplier} from '../models/Supplier';
import { UrlMappings } from '../shared/UrlMappings';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  constructor(public httpClient : HttpClient) { }

  createNewSupplier(supplier : Supplier){
    return this.httpClient.post(environment.baseUrl + UrlMappings.createSupplier, supplier)
  }

  supplierLogin(emailId : String, password : String){
    return this.httpClient.get(environment.baseUrl + UrlMappings.supplierLogIn + emailId + "/" + password)
  }
  
}