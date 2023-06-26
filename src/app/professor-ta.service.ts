import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfessorTAService {

  constructor(private http:HttpClient) { }  
  returnProfScheduale(ProfessorID:any,Semester:any)
  {
    let url= "http://127.0.0.1:8000/api/returnProfScheudule/"+ProfessorID+"/"+Semester;
    return this.http.get(url);
   
  }
  returnTAScheduale(TAID:any,Semeter:any)
  {
    let url= "http://127.0.0.1:8000/api/returnTAScheudule/"+TAID+"/"+Semeter;
    return this.http.get(url);
   
  }
  returnAllPlaces()
  {
    let url= "http://127.0.0.1:8000/api/returnAllPlaces";
    return this.http.get(url);
   
  }
  returnSchedualePlace(place:any,Semeter:any)
  {
    let url= "http://127.0.0.1:8000/api/returnPlaceScheduale/"+place+"/"+Semeter;
    return this.http.get(url);
   
  }
  getCourseProfYears(ProfId:any,CourseId:any)
  {
    let url= "http://127.0.0.1:8000/api/getCourseProfYears/"+ProfId+"/"+CourseId;
    return this.http.get(url);
  }
 
  

}
