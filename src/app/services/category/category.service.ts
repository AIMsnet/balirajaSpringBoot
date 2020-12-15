import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlMappings } from 'src/app/shared/UrlMappings';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient : HttpClient) { }

  getByMainCategory(id : Number): Observable<any> {
    return this.httpClient.get(environment.baseUrl + UrlMappings.getMainCategory + id)
  }
}
