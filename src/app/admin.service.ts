import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }  

  returnAcceptedRequestsGP()
  {
    let url= "http://127.0.0.1:8000/api/returnAcceptedRequestsGP/";
    return this.http.get(url);  
  }


}
