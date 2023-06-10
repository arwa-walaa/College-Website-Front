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

  getProfessorInfo(token:any)
  {
    let url= "http://127.0.0.1:8000/api/professor_info/"+token;
    return this.http.get(url);
  }
}
