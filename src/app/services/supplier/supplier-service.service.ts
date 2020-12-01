import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  updatePersonalDetail(Supplier){
    return this.httpClient.post(environment.baseUrl + UrlMappings.updateSupplier, new Headers(sessionId))
  }

}
