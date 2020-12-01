import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supplier } from 'src/app/models/Supplier';
import { UrlMappings } from 'src/app/shared/UrlMappings';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupplierServiceService {

  constructor(public httpClient : HttpClient) { }

  getSupplierBySessionId() : Observable<any>{
    return this.httpClient.get(environment.baseUrl + UrlMappings.getLoggedInSupplier + "/" + localStorage.getItem('sessionId'));
  }

  updatePersonalDetail(supplier :  Supplier){
    return this.httpClient.put(environment.baseUrl + UrlMappings.updateSupplier, supplier, {headers : new HttpHeaders().set('sessionId', localStorage.getItem('sessionId'))})
  }


  // return this.httpClient.post(environment.baseUrl + UrlMappings.saveFileEntryUrl, fileEntry, {headers: new HttpHeaders().set('sessionId', localStorage.getItem('sessionId'))})
}
