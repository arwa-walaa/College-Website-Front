import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChnagePasswordComponent } from './chnage-password/chnage-password.component';
import { CourseEvaluationComponent } from './course-evaluation/course-evaluation.component';
import { CourseFormEvaluationComponent } from './course-form-evaluation/course-form-evaluation.component';
import { ExamHallsComponent } from './exam-halls/exam-halls.component';
import { ForgetPasswordComponentComponent } from './forget-password-component/forget-password-component.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { OfficeHoursComponentComponent } from './office-hours-component/office-hours-component.component';
import { RegisterdCoursesAndResultsComponent } from './registerd-courses-and-results/registerd-courses-and-results.component';
import { RestPasswardComponentComponent } from './rest-passward-component/rest-passward-component.component';
import { StudentGroupSelectionComponent } from './student-group-selection/student-group-selection.component';
import { Top50Component } from './top50/top50.component';
import { ChatComponent } from './chat/chat.component';
import { FCAIChatComponent } from './fcaichat/fcaichat.component';


import { ContentComponent } from './content/content.component';
import { HomeComponent } from './home/home.component';
import { SchedualeComponent } from './scheduale/scheduale.component';

import { ProfileComponent } from './profile/profile.component';
import { RegisterGpComponent } from './register-gp/register-gp.component';
// import { ProgramSelectionComponent } from './program-selection/program-selection.component';
import { RegisterCourseComponent } from './register-course/register-course.component';
import { ProgramSelectionComponent } from './program-selection/program-selection.component';
import { HomeLoginComponent } from './home-login/home-login.component';
import { InfoBarComponent } from './info-bar/info-bar.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { GpComponent } from './gp/gp.component';
import { ProfessorEvaluationFormComponent } from './professor-evaluation-form/professor-evaluation-form.component';
import { TaEvaluationFormComponent } from './ta-evaluation-form/ta-evaluation-form.component';
import { HomeDrTaComponent } from './home-dr-ta/home-dr-ta.component';
//import { AddOfficeHoursComponent } from './add-office-hours/add-office-hours.component';
import { ViewStudentsComponent } from './view-students/view-students.component';
import { DrTaCoursesComponent } from './dr-ta-courses/dr-ta-courses.component';
import { CourseInfoComponent } from './course-info/course-info.component';
import { ViewFeedbacksComponent } from './view-feedbacks/view-feedbacks.component';

import { StudentsInCoursesComponent } from './students-in-courses/students-in-courses.component';
//import { ProfessorSchedualeComponent } from './professor-scheduale/professor-scheduale.component';
import { PlaceSchedualeComponent } from './place-scheduale/place-scheduale.component';
//import { StudentsInCoursesComponent } from './students-in-courses/students-in-courses.component';


import { ProfessorSchedualeComponent } from './professor-scheduale/professor-scheduale.component';
//import { AddOfficeHoursComponent } from './add-office-hours/add-office-hours.component';
import { GpRequestsComponent } from './gp-requests/gp-requests.component';
import { ProfissorProfileComponent } from './profissor-profile/profissor-profile.component';
import { ViewStudentProfileComponent } from './view-student-profile/view-student-profile.component';
import { AddOfficeHoursComponent } from './add-office-hours/add-office-hours.component';
// import { AddOfficeHoursComponent } from './add-office-hours/add-office-hours.component';
// import { ProfessorSchedualeComponent } from './professor-scheduale.component';

const routes: Routes = [

{path:'forgetPassword' , component:ForgetPasswordComponentComponent },
{path: 'changePassword',component:ChnagePasswordComponent},
{path: 'officeHours',component:OfficeHoursComponentComponent},
{path: 'resetPassword',component:RestPasswardComponentComponent},
{path: 'Top50',component:Top50Component},
{path: 'examHalls',component:ExamHallsComponent},
{path: 'registerdCoursesAndResults',component:RegisterdCoursesAndResultsComponent},
{path: 'studentGroupSelection',component:StudentGroupSelectionComponent},
{path: 'CourseEvaluation',component:CourseEvaluationComponent},
{path: 'CourseFormEvaluation',component:CourseFormEvaluationComponent},
{path: 'ProfessorFormEvaluation',component:ProfessorEvaluationFormComponent},
{path: 'TaFormEvaluation',component:TaEvaluationFormComponent},
{path:'home',component:HomeComponent,title:'Home'},
{path:'home_login',component:HomeLoginComponent,title:'Home'},
{path:'home_dr_ta',component:HomeDrTaComponent,title:'Home'},
{path:'Schedules_Bylaw',component:ContentComponent,title:'Bylaw'},
{path:'Announcements',component:AnnouncementsComponent,title:'Announcements'},
{path:'scheduale',component:SchedualeComponent,title:'scheduale'},
{path:'profile',component:ProfileComponent,title:'profile'},
// {path:'register_gp',component:RegisterGpComponent,title:'register_gp'},
{path:'program_selection',component:ProgramSelectionComponent,title:'program_selection'},
{path:'register_course',component:RegisterCourseComponent,title:'register_course'},
{path:'login' , component:LoginComponentComponent },
{path: 'gpForm',component: GpComponent,title:'register_gp' },
{path: 'Chat', component: ChatComponent},
//{path: 'FCAIChat', component: FCAIChatComponent},
// {path:'addOfficeHours',component:AddOfficeHoursComponent,title:'Add Office Hours'},
{path:'view_students',component:ViewStudentsComponent,title:'View Students'},
{path:'dr_ta_courses',component:DrTaCoursesComponent,title:'My Courses'},
{path:'course_info',component:CourseInfoComponent,title:'Course Info'},
{path:'view_feedbacks',component:ViewFeedbacksComponent,title:'View Feedbacks'},
{path:'gp_requests',component:GpRequestsComponent,title:'Graduation Project Requests'},
{path: 'drTaCourses', component: DrTaCoursesComponent},
{path: 'drTaHome', component: HomeDrTaComponent},
{path: 'courseStatistics', component: CourseInfoComponent},
{path: 'StudentsInCourses', component: StudentsInCoursesComponent},
{path: 'ViewStudentProfile', component: ViewStudentProfileComponent},

{path: 'FCAIChat', component: FCAIChatComponent},


////////////////professor///////
{path: 'Schedule', component: ProfessorSchedualeComponent},
{path: 'PlaceScheduale', component: PlaceSchedualeComponent},
{path: 'ProfProfile', component: ProfissorProfileComponent},
{path: 'gpRequest', component: GpRequestsComponent},
{path: 'AddOfficeHours', component: AddOfficeHoursComponent},
////////////ta////////////

{path:'',redirectTo:'home',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  
exports: [RouterModule]
})
export class AppRoutingModule { }
