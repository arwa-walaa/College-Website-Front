import { Component } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { StudentsService } from '../students.service';
import { AuthService } from '../auth.service';
import { AdminService } from './../admin.service';
import { ProfessorAndTaService } from '../professor-and-ta.service';
@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})

export class SideMenuComponent {
  StudentData: any;
  registerationStatus: any;
  evaluationStatus: any;
  gpFormStatus: any;
  evaluationFormStatus: any;
  programSelectionStatus:any;
  userTypeValue:any;

    constructor(private router: Router,private route: ActivatedRoute,private studentService: StudentsService,
      private _AuthService:AuthService ,private _AdminService:AdminService,private profAndTa:ProfessorAndTaService) {}
    ngOnInit(): void {
      const token=this._AuthService.getToken();
      this._AuthService.getType(token).subscribe((userType:any ) => {
        if (userType && userType.length > 0) {
           this.userTypeValue = userType[0].Type;
          console.log("usertype", this.userTypeValue);
      
        }
      });

      this._AdminService.getAdminControlStatus().subscribe((data: any) => {
        this.gpFormStatus = data[0].GpFormStatus;
        this.evaluationFormStatus = data[0].evaluationStatus;
        console.log("evaluationFormStatus", this.evaluationFormStatus);
      });
    console.log("this.evaluationStatus",this.evaluationStatus)
      // const token=this._AuthService.getToken();
  
      
      this._AdminService.getAdminControlStatus()
      .subscribe(
        response=> {
          this.registerationStatus = response;
          this.programSelectionStatus = response;
          console.log('registerationStatus',this.registerationStatus[0].registerationStatus);
      }
      ,
      error => { 
        console.error(error);  
      });
    
  
      this.profAndTa.getUserType(token).subscribe((type:any ) => {
        if(type[0].Type==="Professor" || type[0].Type==="TA"|| type[0].Type==="Admin"){
          this.route.queryParams.subscribe(params => {
            this.StudentData=[params]
            
           });
        }
       
        else if(type[0].Type==="Student"){
         
          this.studentService.getStudentInfo(token).subscribe((StudentData:any ) => {
            this.StudentData=StudentData;

          });
        }
      
      });
     
    }
    
    isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
    ///////////////////
    navigateToAnnoucements() {
      this.router.navigate(['Announcements']);
    }
    navigateToTop50()
    {
      this.router.navigate(['Top50']);
    }
    //////////////////
    navigateToLogin() {
      this.router.navigate(['login']);
    }
    navigateToScheduale_Bylaw(){
      this.router.navigate(['Schedules_Bylaw']);
    }
    navigateToChat() {
      this.router.navigate(['FCAIChat']);
    }
    navigateToOfficeHours() {
      this.router.navigate(['officeHours']);
    }
    navigateToExamHalls(){
      this.router.navigate(['examHalls']);
    }
    //////////////////////////////
    navigateToRegisterdCoursesAndResults() {
      this.router.navigate(['registerdCoursesAndResults']);
    }
    navigateToRegisterCourse()
    {
      this.router.navigate(['register_course']);
    }
    navigateToEvaluateCourses(){
      this.router.navigate(['CourseEvaluation']);
    }
    navigateToSelectSpecializationProgram(){
      this.router.navigate(['program_selection']);
    }
    navigateToRegisterGraduationProject(){
      this.router.navigate(['gpForm']);
    }
    /////////////////////
    navigateToScheduale(){
      this.router.navigate(['scheduale']);
    }
    ////////////////////////////////////
    //prof or ta//


  navigateToAddOfficeHours() {
    this.router.navigate(['addOfficeHours']);
  }
  navigateToViewStudents(){
    this.router.navigate(['StudentsInCourses']);
  }
  /////////////////////////////
  navigateToMyCourses() {
    this.router.navigate(['drTaCourses']);
  }
  navigateToGpRequest() {
    this.router.navigate(['gp_requests']);
  }
  ////////////////////////////

  navigateToProfOrTaScheduale(){
    this.router.navigate(['Schedule']);
  }
  navigateToCourseSchedule() {
    this.router.navigate(['CourseSchedule']);
  }
  navigateToPlaceSchedule() {
    this.router.navigate(['PlaceScheduale']);
  }
  ///////////////////////////////////

 


    ///////////////////////////////////



  
  }

