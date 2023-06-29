import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  sendMessage(msgDetails: any) {
    return this.http.post(`${this.baseUrl}/message`, msgDetails);
  }

  getProfessorAndTAHistory(student: any, profOrTA: any) {
    return this.http.get(`${this.baseUrl}/history/${student}/${profOrTA}`);
  }

  getStudentHistory(student: any) {
    return this.http.get(`${this.baseUrl}/receive?to=${student}`);
  }

  getContacts(){
    return this.http.get(`${this.baseUrl}/professorsAndTas`);
  }

  updateStudentStatus(studentId: string, status: string) {
    const url = `${this.baseUrl}/updateStudentStatus/${studentId}/${status}`;
    return this.http.post(url, {});
  }

  getStudentStatus(studentId:any)
  {
    return this.http.get(`${this.baseUrl}/getStudentStatus/${studentId}`);
  }

  listTAsStudents(){
    return this.http.get(`${this.baseUrl}/listTAsStudents`);
  }

  listProfessorsStudents(){
    return this.http.get(`${this.baseUrl}/listProfessorsStudents`);
  }

  getProfessorDetails(profName: any) {
    return this.http.get(`${this.baseUrl}/professorsDetails?professorName=${profName}`);
  }

  getTADetails(TAName:any){
    return this.http.get(`${this.baseUrl}/TADetails?TAName=${TAName}`);
  }

  getStudentsDetails(StudentName:any){
    return this.http.get(`${this.baseUrl}/getStudentsDetails?studentName=${StudentName}`);
  }
  
}