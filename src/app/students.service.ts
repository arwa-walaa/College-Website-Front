import { Injectable } from '@angular/core';
import {HttpClient,HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  private baseUrl = "http://127.0.0.1:8000/api/updateProfile";
  constructor(private http:HttpClient) { }
  
  getAllAnnouncemets(){
   
    return this.http.get("http://127.0.0.1:8000/api/getAllAnnouncemets");
  }

  getAllCourses(){
   
    return this.http.get("http://127.0.0.1:8000/api/getAllCourses");
  }

  getCourseID(courseName:any)
  {
    let url= "http://127.0.0.1:8000/api/getCourseID/"+courseName;
    return this.http.get(url);
  }

  getProfessorDetailsToEvaluate(studId:any,courseID:any)
  {
    let url= "http://127.0.0.1:8000/api/getProfessorDetails/"+studId+"/"+courseID;
    return this.http.get(url);
  }

  getTADetailsToEvaluate(studId:any,courseID:any)
  {
    let url= "http://127.0.0.1:8000/api/getTADetails/"+studId+"/"+courseID;
    return this.http.get(url);
  }
  
  getAllDepartments(){
    return this.http.get("http://127.0.0.1:8000/api/getAllDepartments");
  }
  
  getDeptTopbyParam50(dept:any)
  {
    let url= "http://127.0.0.1:8000/api/getTopDept50/"+dept;
    return this.http.get(url);
  }

  
  getCourseTopbyParam50(course:any)
  {
    let url= "http://127.0.0.1:8000/api/getTopCourse50/"+course;
    return this.http.get(url);
  }

  getLevelTopbyParam50(level:any)
  {
    let url= "http://127.0.0.1:8000/api/getTopLevel50/"+level;
    return this.http.get(url);
  }

  getExamHalls(Student_id:any)
  {
    let url= "http://127.0.0.1:8000/api/getexamHall/"+Student_id;
    return this.http.get(url);
  }

  getCourseDetails(courseID:any)
  {
    let url= "http://127.0.0.1:8000/api/courseEvaluationDetails/"+courseID;
    return this.http.get(url);
  }

  getStudentInfo(token:any)
  {
    let url= "http://127.0.0.1:8000/api/student_info/"+token;
    return this.http.get(url);
  }
  getCoursesForStudent(level:any,StudendID:any,semester:any)
  {
    let url= "http://127.0.0.1:8000/api/CourseeForSemester/"+level+"/"+semester+"/"+StudendID;
    
    return this.http.get(url);
  }
  getTAId(GroupNmber:any,CousreId:any)
  {
    let url= "http://127.0.0.1:8000/api/getTAId/"+GroupNmber+"/"+CousreId;
    
    return this.http.get(url);
  }
  getCourseGroup(CourseId:any){
    let url= "http://127.0.0.1:8000/api/getCourseGroup/"+CourseId;
    return this.http.get(url);
  }

  registerGP(formData:any)
  {
    return this.http.post('http://127.0.0.1:8000/api/registerGP/',formData);
  }
  evaluateCourse(formData:any)
  {
    return this.http.post('http://127.0.0.1:8000/api/courseEvaluation/',formData);
  }

  evaluateProfessor(formData:any)
  {
    return this.http.post('http://127.0.0.1:8000/api/professorEvaluation/',formData);
   //return 'helo';
  }
  evaluateTA(formData:any)
  {
    return this.http.post('http://127.0.0.1:8000/api/TAEvaluation/',formData);
   //return 'helo';
  }
  returnCourseResult(studentId:any)
  {
    let url= "http://127.0.0.1:8000/api/returnCourseResult/"+studentId;
    return this.http.get(url);
   
  }
  returnScheduale(studentId:any)
  {
    let url= "http://127.0.0.1:8000/api/returnScheudule/"+studentId;
    return this.http.get(url);
   
  }
  returnAllDepartments()
  {
    let url= "http://127.0.0.1:8000/api/getAllDepartments";
    return this.http.get(url);
  }
  update(id: any, data: any) {
    return this.http.post(`${this.baseUrl}/${id}`, data);
  }
  getStudentCourses(studId:any)
  {
    let url= "http://127.0.0.1:8000/api/getStudentCourses/"+studId;
    return this.http.get(url);
  }
  returnAllTAs()
  {
    let url= "http://127.0.0.1:8000/api/returnAllTAs/";
    return this.http.get(url);
  }
  returnAllProfessor()
  {
    let url= "http://127.0.0.1:8000/api/returnAllProfessor/";
    return this.http.get(url);
  }
  updateAnnouncmentStatus(annID: number) {
    const url = `http://127.0.0.1:8000/api/updateAnnouncmentStatus/${annID}`;
    return this.http.post(url, {});}
    getCourseYears()
    {
      let url= "http://127.0.0.1:8000/api/getCourseYears/";
      return this.http.get(url);
    }
  getCourseProfYears(ProfId:any,CourseId:any)
  {
    let url= "http://127.0.0.1:8000/api/getCourseProfYears/"+ProfId+"/"+CourseId;
    return this.http.get(url);
  }

}


