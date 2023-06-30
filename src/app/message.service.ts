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

  getHistory(from: any, to: any) {
    return this.http.get(`${this.baseUrl}/getHistory/${from}/${to}`);
  }


  getAllContacts(senderID: any, sendertype: any) {
    return this.http.get(`${this.baseUrl}/getAllContacts/${senderID}/${sendertype}`);
  }

  getRecentContacts(senderID: any) {
    return this.http.get(`${this.baseUrl}/getRecentContacts/${senderID}`);
  }

  getUserInfo(token: any) {
    return this.http.get(`${this.baseUrl}/getUserInfo/${token}`);
  }
  
  
}