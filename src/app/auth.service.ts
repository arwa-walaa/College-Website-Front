import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 public Token:any;
  constructor(private _HttpClient:HttpClient) { }
  login(data:any):Observable<any>{
    
    return this._HttpClient.post('http://127.0.0.1:8000/api/auth/login',data);
  }
  sendResetPasswordLink(data:any) {
    return this._HttpClient.post('http://127.0.0.1:8000/api/auth/sendPasswordResetLink', data)
  }
  resetPassword(data:any) {
    return this._HttpClient.post(
      'http://127.0.0.1:8000/api/auth/resetPassword',data
    );
  }
  userData:any = null;
  saveUserData(){
    let encodedToken = JSON.stringify(localStorage.getItem("userToken"));
    let decodedToken = jwtDecode(encodedToken);
    this.userData = decodedToken;
    console.log(this.userData)

  }

  // setToken(token: string): void {
  //   localStorage.setItem('token', token);
  // }
  // getToken(): string | null {
  //   return localStorage.getItem('token');
  // }
  // setToken(token: any): void {
  //   this.Token=token;
  // }
  // public getToken() {
  //   return localStorage.getItem('access_token');
  // }
  setToken(token: string): void {
    // this.Token=token;
    localStorage.setItem('token', token); // store the token in local storage
  }

  getToken()
  {
      return localStorage.getItem('token');
  }

  getType(token:any)
  {
    let url= "http://127.0.0.1:8000/api/getUserType/"+token;
    return this._HttpClient.get(url);
  }

  
  removeToken(): void {
    localStorage.removeItem('token'); // remove the token from local storage on logout
  }
  
}
function jwtDecode(encodedToken: string) {
  throw new Error('Function not implemented.');
}


