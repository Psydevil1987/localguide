//Inject Funktionalität
import { Injectable,inject } from '@angular/core';

//Htt-Client
import {HttpClient} from '@angular/common/http'

//Arbeiten mit HTTP-Client
import { Observable } from 'rxjs';

//Api Konfiguration
import {api_config} from '../backend/api_config';
import {ApiRoute} from '../backend/api_enum'

@Injectable({
  providedIn: 'root'
})
//Service, der für das ansprechen der RestApi benutzt werden soll
export class RestService {

  //hole HTTP-Client per DPI
  private httpClient : HttpClient = inject(HttpClient);

  
  //Rest -> GET-Methode
  get$<T>(apiRoute :ApiRoute,params?:any) : Observable<T>
  {
    let url :string = api_config[apiRoute]
    return this.httpClient.get<T>(url,{params:params});
  }

  //Rest -> Put-Methode
  put$<T>(apiRoute :ApiRoute,body:any,params?:any) : Observable<T>
  {
    let url :string = api_config[apiRoute]
    return this.httpClient.put<T>(url,body,{params:params});
  }

  //Rest -> Patch-Methode
  patch$<T>(apiRoute :ApiRoute,body:any,params?:any) : Observable<T>
  {
    let url :string = api_config[apiRoute]
    return this.httpClient.patch<T>(url,body,{params:params});
  }

}
