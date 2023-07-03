import { Injectable } from '@angular/core';
import {HttpClient,HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
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
  returnTAOfficeHours(TAID:any)
  {
    let url= "http://127.0.0.1:8000/api/returnTAOfficeHours/"+TAID;
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
  returnCourseTAS(coursID:any)
  {
    let url= "http://127.0.0.1:8000/api/returnCourseTAS/"+coursID;
    return this.http.get(url);
  }
  returnCourseStat(coursID:any,Year:any,Dept:any)
  {
    let url= "http://127.0.0.1:8000/api/returnCourseStat/"+coursID+"/"+Year+"/"+Dept;
    return this.http.get(url);
  }
  returnCourseStudent(coursID:any,Year:any,Dept:any)
  {
    let url= "http://127.0.0.1:8000/api/returnCourseStudent/"+coursID+"/"+Year+"/"+Dept;
    return this.http.get(url);
  }
  returnGradeAvg(coursID:any,Year:any,Dept:any)
  {
    let url= "http://127.0.0.1:8000/api/returnGradeAvg/"+coursID+"/"+Year+"/"+Dept;
    return this.http.get(url);
  }
  returnRequestsGP(Type:any,id:any)
  {
    let url= "http://127.0.0.1:8000/api/returnRequestsGP/"+Type+"/"+id;
    return this.http.get(url);
  }
  acceptGP_prof(gpID:any)
  {
    let url= "http://127.0.0.1:8000/api/acceptGP_prof/"+gpID;
    return this.http.put(url,gpID);
  }
  rejectGP_prof(gpID:any)
  {
    let url= "http://127.0.0.1:8000/api/rejectGP_prof/"+gpID;
    return this.http.put(url,gpID);
  }
  acceptGP_TA(gpID:any)
  {
    let url= "http://127.0.0.1:8000/api/acceptGP_TA/"+gpID;
    return this.http.put(url,gpID);
  }
  rejectGP_TA(gpID:any)
  {
    let url= "http://127.0.0.1:8000/api/rejectGP_TA/"+gpID;
    return this.http.put(url,gpID);
  }

  getUserType(token:any)
  {
    let url= "http://127.0.0.1:8000/api/getUserType/"+token;
    return this.http.get(url);
  }
  getStudentData(StudentID:any)
  {
    let url= "http://127.0.0.1:8000/api/getStudentData/"+StudentID;
    return this.http.get(url);
  } 
  getCourseProfYears(ProfId:any,CourseId:any)
  {
    let url= "http://127.0.0.1:8000/api/getCourseProfYears/"+ProfId+"/"+CourseId;
    return this.http.get(url);
  }
  getFeedbacks(courseName:any,professorId:any,year:any)
  {
   let url= "http://127.0.0.1:8000/api/getFeedbacks/"+courseName+"/"+professorId+"/"+year; 
    return this.http.get(url);
  }
  getTAs_Feedbacks_for_specific_course(courseName:any,professorId:any,year:any){
    let url= "http://127.0.0.1:8000/api/getTAs_Feedbacks_for_specific_course/"+courseName+"/"+professorId+"/"+year; 
    return this.http.get(url);
  }
}
