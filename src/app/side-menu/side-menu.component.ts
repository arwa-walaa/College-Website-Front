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
  loggedUserInfo: any;
  menuStatus:boolean=false;
  isAdmin: boolean=false;

    constructor(private router: Router,private route: ActivatedRoute,private studentService: StudentsService,
      private _AuthService:AuthService ,private _AdminService:AdminService,private profAndTa:ProfessorAndTaService) {}
    ngOnInit(): void {
      const token=this._AuthService.getToken();
      if(token){
      this.menuStatus=true;
      this.profAndTa.getUserType(token).subscribe((Type:any ) => {
        if(Type){
          if(Type[0].Type === "Admin"){
            this.isAdmin=true;
            console.log("isAdmin", this.isAdmin);
          }
          else{
            this.isAdmin=false;
            console.log("isAdmin", this.isAdmin);
          }
        }
      

      });
      }
      
      this._AuthService.getUserInfo(token).subscribe((loggedUserInfo:any ) => {
        if(loggedUserInfo){
          this.loggedUserInfo=loggedUserInfo;
        console.log("loggedUserInfo", this.loggedUserInfo);
        }
        
      });

      this._AdminService.getAdminControlStatus().subscribe((data: any) => {
        this.gpFormStatus = data[0].GpFormStatus;
        this.evaluationFormStatus = data[0].evaluationStatus;
        console.log("evaluationFormStatus", this.evaluationFormStatus);
      });
    console.log("this.evaluationStatus",this.evaluationStatus)
      
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
    console.log('isMenuOpen', this.isMenuOpen)
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

  navigateToCurrentGPs() {
    this.router.navigate(['/DrTaCurrentGPs'], { queryParams: { teacherId: this.loggedUserInfo[0].logginUserID} });
  }

    ////////Admin///////////////////////////
    navigateToAddAnnouncment() {
      this.router.navigate(['AddAnnouncements']);
    }
    navigateToDashboards() {
      this.router.navigate(['dashboard']);
    }
    navigateToOptions() {
      this.router.navigate(['admin_options']);
    }
    navigateToAcceptedGP() {
      this.router.navigate(['gp_requests']);
    }
    showDepartment(){
      this.router.navigate(['StatisticsDepartment']);
    }
    showCourses(){
      this.router.navigate(['StatisticsCourses']);
    }
    navigateToAddGrades(){
      this.router.navigate(['add_grades']);
    }
    navigateToAddCourse(){
      this.router.navigate(['add_course']);
    }
    navigateToAddGroups(){
      this.router.navigate(['add_groups']);
    }



  
  }

