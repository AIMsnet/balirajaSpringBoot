import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Business, Product } from 'src/app/models/Supplier';
import { UrlMappings } from 'src/app/shared/UrlMappings';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient : HttpClient) { }

  getProduct(id : Number) : Observable<any>{
    return this.httpClient.get(environment.baseUrl + UrlMappings.getProduct + id)
  }
  
  newProduct(product : Product) : Observable<any>{
    return this.httpClient.post(environment.baseUrl + UrlMappings.createProduct, product, {headers : new HttpHeaders().set('sessionId', localStorage.getItem('sessionId'))})
  }

  saveProductImage(productImage, productId : Number){
    var formData = new FormData()
    formData.append('image', productImage)
    formData.append('productId', String(productId))
    console.log("Form data",formData)
    return this.httpClient.post(environment.baseUrl + UrlMappings.uploadProductImage, formData)
  }

  getAllProductOfLoggedSupplier(business : Number) : Observable<any>{
    return this.httpClient.get(environment.baseUrl + UrlMappings.getAllProductByBusiness + business)
  }

  getSearchedProduct(product : String): Observable<any>{
    console.log("Prodcut", product)
    return this.httpClient.get(environment.baseUrl + UrlMappings.getSearchedProduct + product)
  }
}
