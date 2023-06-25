import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }  

  public  registerationStatus:any = '0';

  returnAcceptedRequestsGP()
  {
    let url= "http://127.0.0.1:8000/api/returnAcceptedRequestsGP/";
    return this.http.get(url);  
  }

  get_Number_Of_Students_In_Department()
  {
    let url= "http://127.0.0.1:8000/api/get_Number_Of_Students_In_Department/";
    return this.http.get(url);  
  }

  get_GPA_distribution_In_Department()
  {
    let url= "http://127.0.0.1:8000/api/get_GPA_distribution_In_Department/";
    return this.http.get(url);  
  }

  setRegisterationStatus(data: any) {
    this.registerationStatus = data;
  }

  getRegisterationStatus() {
    return this.registerationStatus;
  }


}
