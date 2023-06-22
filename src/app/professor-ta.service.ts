import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfessorTAService {

  constructor(private http:HttpClient) { }  
  returnProfScheduale(ProfessorID:any)
  {
    let url= "http://127.0.0.1:8000/api/returnProfScheudule/"+ProfessorID;
    return this.http.get(url);
   
  }
  returnTAScheduale(TAID:any)
  {
    let url= "http://127.0.0.1:8000/api/returnTAScheudule/"+TAID;
    return this.http.get(url);
   
  }
  returnAllPlaces()
  {
    let url= "http://127.0.0.1:8000/api/returnAllPlaces";
    return this.http.get(url);
   
  }
  returnSchedualePlace(place:any)
  {
    let url= "http://127.0.0.1:8000/api/returnPlaceScheduale/"+place;
    return this.http.get(url);
   
  }
  
 
  

}
