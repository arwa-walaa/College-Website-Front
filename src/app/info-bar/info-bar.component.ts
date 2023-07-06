import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { LoginComponentComponent } from '../login-component/login-component.component';
import { StudentsService } from '../students.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfessorAndTaService } from '../professor-and-ta.service';
  

@Component({
  selector: 'app-info-bar',
  templateUrl: './info-bar.component.html',
  styleUrls: ['./info-bar.component.css']
})
export class InfoBarComponent {
  isLog:boolean=false;
  isLoggedIn :any;
  authenticated:any;
  StudentData: any;
  isStudent: any;
  // , private _LoginComponentComponent:LoginComponentComponent
  constructor(private _AuthService:AuthService,private studendService: StudentsService,
    private router: Router,private route: ActivatedRoute,
    private profAndTa:ProfessorAndTaService ,
    private http: HttpClient,
    ) { 
   
  }
  ngOnInit(): void {
    const token=this._AuthService.getToken();
    // alert(this._AuthService.getToken());
    if(token){
      this.profAndTa.getUserType(token).subscribe((type:any ) => {
        if(type[0].Type==="Professor" ||type[0].Type==="TA"){
          this.isStudent=false;
        }
        else if(type[0].Type==="Student"){
          this.isStudent=true;
        }
      });
      if(this._AuthService.getToken()){
        this.isLog=true;
        
      } else{
        this.isLog=false;
      }
      this.studendService.getStudentInfo(token).subscribe({
        next:(response)=> this.StudentData=response
        
      });
    }
    
 
  }

 
    
  
}
