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
// import { RegisterGpComponent } from './register-gp/register-gp.component';
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
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewStudentProfileComponent } from './view-student-profile/view-student-profile.component';
import { AddOfficeHoursComponent } from './add-office-hours/add-office-hours.component';
import { AddAnnouncementsComponent } from './add-announcements/add-announcements.component';
import { AdminOptionsComponent } from './admin-options/admin-options.component';
import { AddGradesComponent } from './add-grades/add-grades.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { AuthGuardService } from './auth-guard.service';
import { AddGroupComponent } from './add-group/add-group.component';
import { CourseScheduleComponent } from './course-schedule/course-schedule.component';

// import { AddOfficeHoursComponent } from './add-office-hours/add-office-hours.component';
// import { ProfessorSchedualeComponent } from './professor-scheduale.component';

const routes: Routes = [

{path:'forgetPassword' , component:ForgetPasswordComponentComponent },
{path: 'changePassword',component:ChnagePasswordComponent},
{path: 'officeHours',component:OfficeHoursComponentComponent,canActivate: [AuthGuardService], data: { expectedRole: ['Student','Admin'] }},
{path: 'resetPassword',component:RestPasswardComponentComponent},
{path: 'Top50',component:Top50Component,canActivate: [AuthGuardService], data: { expectedRole:  ['Student', 'Admin', 'TA','Professor'] }},
{path: 'examHalls',component:ExamHallsComponent,canActivate: [AuthGuardService], data: { expectedRole:  ['Student','Admin'] }},
{path: 'registerdCoursesAndResults',component:RegisterdCoursesAndResultsComponent,canActivate: [AuthGuardService], data: { expectedRole:  ['TA','Professor','Student','Admin'] }},
{path: 'studentGroupSelection',component:StudentGroupSelectionComponent,canActivate: [AuthGuardService], data: { expectedRole:  ['Student','Admin'] }},
{path: 'CourseEvaluation',component:CourseEvaluationComponent,canActivate: [AuthGuardService], data: { expectedRole:  ['Student','Admin'] }},
{path: 'CourseFormEvaluation',component:CourseFormEvaluationComponent,canActivate: [AuthGuardService], data: { expectedRole:  ['Student','Admin'] }},
{path: 'ProfessorFormEvaluation',component:ProfessorEvaluationFormComponent,canActivate: [AuthGuardService], data: { expectedRole:  ['Student','Admin'] }},
{path: 'TaFormEvaluation',component:TaEvaluationFormComponent,canActivate: [AuthGuardService], data: { expectedRole:  ['Student','Admin'] }},
//{path:'home',component:HomeComponent,title:'Home'},
{path:'home',component:HomeComponent,title:'Home'},
{path:'home_login',component:HomeLoginComponent,title:'Home',canActivate: [AuthGuardService], data: { expectedRole:  ['Student','Admin'] }},
{path:'home_dr_ta',component:HomeDrTaComponent,title:'Home',canActivate: [AuthGuardService], data: { expectedRole:  ['TA','Professor'] }},
{path:'home_admin',component:HomeAdminComponent,title:'Home',canActivate: [AuthGuardService], data: { expectedRole:  ['Admin'] }},
{path:'Schedules_Bylaw',component:ContentComponent,title:'Bylaw'},
 {path:'Announcements',component:AnnouncementsComponent,title:'Announcements'},
{path:'scheduale',component:SchedualeComponent,title:'scheduale',canActivate: [AuthGuardService], data: { expectedRole:  ['Student','Admin'] }},
{path:'profile',component:ProfileComponent,title:'profile',canActivate: [AuthGuardService], data: { expectedRole:  ['Student', 'Admin'] }},
// {path:'register_gp',component:RegisterGpComponent,title:'register_gp'},
{path:'program_selection',component:ProgramSelectionComponent,title:'program_selection',canActivate: [AuthGuardService], data: { expectedRole:  ['Student', 'Admin'] }},
{path:'register_course',component:RegisterCourseComponent,title:'register_course',canActivate: [AuthGuardService], data: { expectedRole:  ['Student', 'Admin'] }},
{path:'login' , component:LoginComponentComponent },
{path: 'gpForm',component: GpComponent,title:'register_gp',canActivate: [AuthGuardService], data: { expectedRole:  ['Student', 'Admin'] } },
{path: 'Chat', component: ChatComponent,canActivate: [AuthGuardService], data: { expectedRole:  ['Student', 'Admin', 'TA','Professor'] }},
//{path: 'FCAIChat', component: FCAIChatComponent},
// {path:'addOfficeHours',component:AddOfficeHoursComponent,title:'Add Office Hours'},
{path:'view_students',component:ViewStudentsComponent,title:'View Students',canActivate: [AuthGuardService], data: { expectedRole:  ['Admin', 'TA','Professor'] }},
{path:'dr_ta_courses',component:DrTaCoursesComponent,title:'My Courses',canActivate: [AuthGuardService], data: { expectedRole:  ['Admin', 'TA','Professor'] }},
{path:'course_info',component:CourseInfoComponent,title:'Course Info',canActivate: [AuthGuardService], data: { expectedRole:  ['Admin', 'Professor'] }},
{path:'view_feedbacks',component:ViewFeedbacksComponent,title:'View Feedbacks',canActivate: [AuthGuardService], data: { expectedRole:  [ 'Admin', 'TA','Professor'] }},
{path:'gp_requests',component:GpRequestsComponent,title:'Graduation Project Requests',canActivate: [AuthGuardService], data: { expectedRole:  ['Admin', 'TA','Professor'] }},
{path: 'drTaCourses', component: DrTaCoursesComponent,canActivate: [AuthGuardService], data: { expectedRole:  ['Admin', 'TA','Professor'] }},
{path: 'drTaHome', component: HomeDrTaComponent,canActivate: [AuthGuardService], data: { expectedRole:  ['Admin', 'TA','Professor'] }},
//{path: 'courseStatistics', component: CourseInfoComponent},
{path: 'StudentsInCourses', component: StudentsInCoursesComponent,canActivate: [AuthGuardService], data: { expectedRole:  ['Admin','Professor'] }},
{path: 'ViewStudentProfile', component: ViewStudentProfileComponent,canActivate: [AuthGuardService], data: { expectedRole:  ['Admin', 'TA','Professor'] }},

{path: 'FCAIChat', component: FCAIChatComponent,canActivate: [AuthGuardService], data: { expectedRole:  ['Student', 'Admin', 'TA','Professor'] }},


////////////////professor///////
{path: 'Schedule', component: ProfessorSchedualeComponent,canActivate: [AuthGuardService], data: { expectedRole:  ['Admin', 'TA','Professor'] }},
{path: 'PlaceScheduale', component: PlaceSchedualeComponent,canActivate: [AuthGuardService], data: { expectedRole:  ['Admin', 'TA','Professor'] }},
{path: 'CourseSchedule', component: CourseScheduleComponent,canActivate: [AuthGuardService], data: { expectedRole:  ['Admin', 'TA','Professor'] }},
{path: 'ProfProfile', component: ProfissorProfileComponent,canActivate: [AuthGuardService], data: { expectedRole:  ['Admin', 'TA','Professor'] }},
{path: 'gpRequest', component: GpRequestsComponent,canActivate: [AuthGuardService], data: { expectedRole:  ['Admin', 'TA','Professor'] }},
{path: 'addOfficeHours', component: AddOfficeHoursComponent,canActivate: [AuthGuardService], data: { expectedRole:  ['Admin', 'Professor','TA'] }},
{path: 'AddAnnouncements', component: AddAnnouncementsComponent,canActivate: [AuthGuardService], data: { expectedRole:  ['Admin'] }},
////////////ta////////////

{path:'dashboard',component:DashboardComponent,title:'Dashboards',canActivate: [AuthGuardService], data: { expectedRole:  ['Admin'] }},
{path:'admin_options',component:AdminOptionsComponent,title:'Admin Options',canActivate: [AuthGuardService], data: { expectedRole:  [ 'Admin'] }},
{path:'add_grades',component:AddGradesComponent,title:'Add Grades',canActivate: [AuthGuardService], data: { expectedRole:  [ 'Admin'] }},
{path:'add_course',component:AddCourseComponent,title:'Add Course', canActivate: [AuthGuardService], data: { expectedRole:  ['Admin'] }},
{path:'add_groups',component:AddGroupComponent,title:'Add Groups', canActivate: [AuthGuardService], data: { expectedRole:  ['Admin'] }},

{path:'',redirectTo:'home',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  
exports: [RouterModule]
})
export class AppRoutingModule { }
