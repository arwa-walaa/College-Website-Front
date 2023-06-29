import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
 

  constructor(private http:HttpClient) { }  

  public  registerationStatus:any = '0';
  public EvaluationFormStatus:any = 0;
  public GPFormStatus:any = '0';
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
  setDepatmentToStudent()
  {
    let url= "http://127.0.0.1:8000/api/setDepatmentToStudent/";
    return this.http.get(url);  
  }

  setRegisterationStatus(data: any) {
    this.registerationStatus = data;
  }

  getRegisterationStatus() {
    return this.registerationStatus;
  }
  setEvaluationFormStatus(data: any) {
    this.EvaluationFormStatus = data;
  }

  getEvaluationFormnStatus() {
    return this.EvaluationFormStatus;
  }
  setGPFormStatus(data: any) {
    this.GPFormStatus = data;
  }

  getGPFormStatus() {
    return this.GPFormStatus;
  }


}
