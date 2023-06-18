import { Injectable } from '@angular/core';
import {HttpClient,HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProfessorAndTaService {

  constructor(private http:HttpClient) { }

  getMyCourses(professorId:any)
  {
    let url= "http://127.0.0.1:8000/api/myCourses/"+professorId;
    return this.http.get(url);
  }

  getTACourses(TAId:any)
  {
    let url= "http://127.0.0.1:8000/api/getTACourses/"+TAId;
    return this.http.get(url);
  }

getMyStudents(professorId:any)
  {
    let url= "http://127.0.0.1:8000/api/getMyStudents/"+professorId;
    return this.http.get(url);
  }

  getProfessorInfo(token:any)
  {
    let url= "http://127.0.0.1:8000/api/professor_info/"+token;
    return this.http.get(url);
  }
  
  getTAInfo(token:any)
  {
    let url= "http://127.0.0.1:8000/api/ta_info/"+token;
    return this.http.get(url);
  }

  getGrades(professorId:any){
    let url= "http://127.0.0.1:8000/api/getGrades/"+professorId;
    return this.http.get(url);
  }
  selectCourse(course:any)
  {
    let url= "http://127.0.0.1:8000/api/selectCourse/"+course;
    return this.http.get(url);
  }
  selectGrade(grade:any)
  {
    let url= "http://127.0.0.1:8000/api/selectGrade/"+grade;
    return this.http.get(url);
  }
  getProfOfficeHours(profID:any)
  {
    let url= "http://127.0.0.1:8000/api/returnProfOfficeHours/"+profID;
    return this.http.get(url);
  }
  deleteOfficeHour(officeHourId:any)
  {
    let url= "http://127.0.0.1:8000/api/deleteOfficeHours/"+officeHourId;
    return this.http.delete(url);
  }
  updateOfficeHour(officeHourId: any, officeHourData: any) {
    let url = "http://127.0.0.1:8000/api/updateProfOfficeHour/" + officeHourId;
    return this.http.put(url, officeHourData);
  }
}
