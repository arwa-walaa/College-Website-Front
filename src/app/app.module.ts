import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OfficeHoursComponentComponent } from './office-hours-component/office-hours-component.component';
import { OfficeHoursSearchPipe } from './office-hours-search.pipe';
import { IconComponentComponent } from './icon-component/icon-component.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { ForgetPasswordComponentComponent } from './forget-password-component/forget-password-component.component';
import { NavBarComponentComponent } from './nav-bar-component/nav-bar-component.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RestPasswardComponentComponent } from './rest-passward-component/rest-passward-component.component';
import { MatPasswordStrengthModule } from "@angular-material-extensions/password-strength";
// import {MatProgressBarModule} from '@angular/material/progress-bar';
import { PasswordStrengthComponent } from './password-strength/password-strength.component';
import { Top50Component } from './top50/top50.component';
import { ExamHallsComponent } from './exam-halls/exam-halls.component';
import { ChnagePasswordComponent } from './chnage-password/chnage-password.component';
// import { MatTableModule } from '@angular/material/table';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterdCoursesAndResultsComponent } from './registerd-courses-and-results/registerd-courses-and-results.component';
import { StudentGroupSelectionComponent } from './student-group-selection/student-group-selection.component';
import { CourseEvaluationComponent } from './course-evaluation/course-evaluation.component';
import { CourseFormEvaluationComponent } from './course-form-evaluation/course-form-evaluation.component';
import { ProgramSelectionComponent } from './program-selection/program-selection.component';
import { HomeLoginComponent } from './home-login/home-login.component';
import { InfoBarComponent } from './info-bar/info-bar.component';
import { SearchService } from './search.service';
// import {NgxMatSelectModule} from "./ngx-mat-select/ngx-mat-select.module";

import { HttpClientModule } from '@angular/common/http';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { GpComponent } from './gp/gp.component';
import { ProfessorEvaluationFormComponent } from './professor-evaluation-form/professor-evaluation-form.component';
import { TaEvaluationFormComponent } from './ta-evaluation-form/ta-evaluation-form.component';
// import { FeedbackFormComponent } from './feedback-form/feedback-form.component';
import { RegisterCourseComponent } from './register-course/register-course.component';
import { SchedualeComponent } from './scheduale/scheduale.component';
import { FCAIChatComponent } from './fcaichat/fcaichat.component';
import { MessageService } from './message.service';
import { ProfileComponent } from './profile/profile.component';
import { HomeDrTaComponent } from './home-dr-ta/home-dr-ta.component';
//import { AddOfficeHoursComponent } from './add-office-hours/add-office-hours.component';
//import { AddOfficeHoursComponent } from './add-office-hours/add-office-hours.component';
import { DrTaCoursesComponent } from './dr-ta-courses/dr-ta-courses.component';
import { ViewStudentsComponent } from './view-students/view-students.component';
import { CourseInfoComponent } from './course-info/course-info.component';
import { ViewFeedbacksComponent } from './view-feedbacks/view-feedbacks.component';
import { StudentsInCoursesComponent } from './students-in-courses/students-in-courses.component';
import { ProfessorSchedualeComponent } from './professor-scheduale/professor-scheduale.component';
import { PlaceSchedualeComponent } from './place-scheduale/place-scheduale.component';
import { GpRequestsComponent } from './gp-requests/gp-requests.component';
import { ProfissorProfileComponent } from './profissor-profile/profissor-profile.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewStudentProfileComponent } from './view-student-profile/view-student-profile.component';
import { AddOfficeHoursComponent } from './add-office-hours/add-office-hours.component';
import { StatisticsDepartmentComponent } from './statistics-department/statistics-department.component';
import { StatisticsCoursesComponent } from './statistics-courses/statistics-courses.component';
import { StatisticsCoursesCompareComponent } from './statistics-courses-compare/statistics-courses-compare.component';
// import { AddOfficeHoursComponent } from './add-office-hours/add-office-hours.component';
//import { TaSchedualeComponent } from './ta-scheduale/ta-scheduale.component';
import { EditorModule, TINYMCE_SCRIPT_SRC  } from '@tinymce/tinymce-angular';
import { AddAnnouncementsComponent } from './add-announcements/add-announcements.component'
import { DatePipe } from '@angular/common';
import {BreadcrumbModule} from 'angular-crumbs';
@NgModule({
  declarations: [
    AppComponent,
    OfficeHoursComponentComponent,
    OfficeHoursSearchPipe,
    SearchService,
    IconComponentComponent,
    LoginComponentComponent,
    ForgetPasswordComponentComponent,
    NavBarComponentComponent,
    RestPasswardComponentComponent,
    PasswordStrengthComponent,
    Top50Component,
    ExamHallsComponent,
    ChnagePasswordComponent,
    RegisterdCoursesAndResultsComponent,
    StudentGroupSelectionComponent,
    CourseEvaluationComponent,
    CourseFormEvaluationComponent,
    ProgramSelectionComponent,
    HomeLoginComponent,
    InfoBarComponent,
    AnnouncementsComponent,
    GpComponent,
    RegisterCourseComponent,
    SchedualeComponent,
    FCAIChatComponent,
    ProfileComponent,
    HomeDrTaComponent,
  //  AddOfficeHoursComponent,
    DrTaCoursesComponent,
    ViewStudentsComponent,
    CourseInfoComponent,
    ViewFeedbacksComponent,
    StudentsInCoursesComponent,
    ProfessorSchedualeComponent,
    PlaceSchedualeComponent,
    GpRequestsComponent,
    //TaSchedualeComponent,
    SchedualeComponent,
    ProfissorProfileComponent,
    HomeAdminComponent,
    DashboardComponent,
    ViewStudentProfileComponent,
    AddOfficeHoursComponent,
    StatisticsDepartmentComponent,
    StatisticsCoursesComponent,
    StatisticsCoursesCompareComponent,
    AddAnnouncementsComponent,
    // MessageService,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    
    FormsModule,
    NgxPaginationModule,
    MatPasswordStrengthModule,
    // MatSelectModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // NgModule,
    // MatSelectModule,
    // NgxMatSelectModule,
    EditorModule,
    BreadcrumbModule

  ],
  providers: [DatePipe,
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
  ],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
