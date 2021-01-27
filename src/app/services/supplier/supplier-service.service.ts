import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output} from '@angular/core';
import { Observable } from 'rxjs';
import { Business, Supplier } from 'src/app/models/Supplier';
import { UrlMappings } from 'src/app/shared/UrlMappings';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupplierServiceService {

  @Output()
  onSupplierLogIn : EventEmitter<boolean> = new EventEmitter(); 

  constructor(public httpClient : HttpClient) { }

  getSupplierBySessionId() : Observable<any>{
    return this.httpClient.get(environment.baseUrl + UrlMappings.getLoggedInSupplier + "/" + localStorage.getItem('sessionId'));
  }

  updatePersonalDetail(supplier :  Supplier){
    return this.httpClient.put(environment.baseUrl + UrlMappings.updateSupplier, supplier, {headers : new HttpHeaders().set('sessionId', localStorage.getItem('sessionId'))})
  }

  updateBusinessDetail(business : Business) : Observable<any>{
    return this.httpClient.post(environment.baseUrl + UrlMappings.updateBusiness, business, {headers : new HttpHeaders().set('sessionId', localStorage.getItem('sessionId'))})
  }

  getQuotesBySessionId() : Observable<any> {
    return this.httpClient.get(environment.baseUrl + UrlMappings.getQuotesBySessionId + localStorage.getItem('sessionId'))
  }

  getSupplierByBusinessId(businessId : String){
    console.log("Service"+businessId)
    return this.httpClient.get(environment.baseUrl + UrlMappings.getSupplierByBusinessId + businessId)
  }
}
