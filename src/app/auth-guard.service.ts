import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { ProfessorAndTaService } from './professor-and-ta.service';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  isLog: any;

  constructor(private authService: AuthService, private router: Router, private profAndTa:ProfessorAndTaService ) {}

  // 
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const expectedRole = route.data['expectedRole'];
    const token = this.authService.getToken();
    
    if (token) {
      return this.profAndTa.getUserType(token).pipe(
        map((type: any) => {
          const currentUser = type[0].Type;
          
          if (  expectedRole.includes(currentUser)) {
            console.log("enter the condition ");
            return true;
          } else {
            this.router.navigate(['/login']);
            return false;
          }
        })
      );
    } else {
      this.router.navigate(['/login']);
      return of(false);
    }
  }
}
