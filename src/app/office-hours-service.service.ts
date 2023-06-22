import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OfficeHoursServiceService {

  constructor(private _HttpClient:HttpClient) { }
  getOfficeHours():Observable<any>{
    return this._HttpClient.get('http://127.0.0.1:8000/api/data');
  }
  returnAllDepartments():Observable<any>{
    return this._HttpClient.get('http://127.0.0.1:8000/api/returnAllDepartments');
  }
  returnAllLocations():Observable<any>{
    return this._HttpClient.get('http://127.0.0.1:8000/api/returnAllLocations');
  }
  returnAllProfessore()
  {
    return this._HttpClient.get("http://127.0.0.1:8000/api/returnAllProfessor/");
  }
  returnAllTAs()
  {
    return this._HttpClient.get("http://127.0.0.1:8000/api/returnAllTAs/");
  }
}
