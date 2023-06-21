import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ProfessorAndTaService } from '../professor-and-ta.service';

@Component({
  selector: 'app-gp-requests',
  templateUrl: './gp-requests.component.html',
  styleUrls: ['./gp-requests.component.css']
})
export class GpRequestsComponent {
  gpRequests: any;
  public response2 = false
  constructor(private router: Router,
    private route: ActivatedRoute,
    private profAndTa:ProfessorAndTaService ,
    private http: HttpClient,
    private _AuthService:AuthService) {
  
  }

  public showData = true 
  public response = false
  public message = ""
  selectedGpId: any = null;

 ngOnInit(): void {
  const token=this._AuthService.getToken();
  this.profAndTa.getUserType(token).subscribe((type:any ) => {
    if(type[0].Type==="Professor"){
      this.profAndTa.getProfessorInfo(token).subscribe((ProfessorData:any ) => {
      this.profAndTa.returnRequestsGP(type[0].Type,ProfessorData[0].professorId)
      .subscribe((gpRequests:any ) => {
        this.gpRequests=gpRequests
        console.log("gpRequests",this.gpRequests)
      });
    });
  }
  else if(type[0].Type==="TA"){
    this.profAndTa.getTAInfo(token).subscribe((TaData:any ) => {
      this.profAndTa.returnRequestsGP(type[0].Type,TaData[0].TAId)
      .subscribe((gpRequests:any ) => {
        this.gpRequests=gpRequests
      });
    });

  }

});
 }
  
     

         
  // this.profAndTa.returnCourseTAS(this.courseInfo.courseID).subscribe(TAs => {this.TAs=TAs
  //   // console.log("tas==",this.TAs)
  // })
 




 

 

  navigateToStudent(studentID: any) {
    this.profAndTa.getStudentData(studentID).subscribe((studentData:any ) => {
      console.log('studentData[0]',studentData[0])
     
      this.router.navigate(['/ViewStudentProfile'], { queryParams: studentData[0]} );
      
    });
   
  }

  // acceptGp(id:any){
  //   this.profAndTa.acceptGP(id).subscribe((accept:any ) => {
     
      
  //   });
  //   this.showData = false;
  //   this.response = true;
  //   this.message = "This Graduation Project was Accepted!";

  // }

  // rejectGp(id:any){
  //   this.profAndTa.rejectGP(id).subscribe((reject:any ) => {
     
      
  //   });

  //   this.showData = false;
  //   this.response = true;
  //   this.message = "This Graduation Project was Rejected!";
  // }

  acceptGp(id: any){
    const token=this._AuthService.getToken();
    this.profAndTa.getUserType(token).subscribe((type:any ) => {
      if(type[0].Type==="Professor"){
        this.profAndTa.acceptGP_prof(id).subscribe(() => {
          this.message = "Request accepted successfully.";
          this.response = true;
        }, (error: any) => {
          console.error('Accept request error:', error);
        });

      } else if(type[0].Type==="TA"){
        this.profAndTa.acceptGP_TA(id).subscribe(() => {
          this.message = "Request accepted successfully.";
          this.response = true;
        }, (error: any) => {
          console.error('Accept request error:', error);
        });

      }
    
    
    });
   
    this.selectedGpId = id;
  }
  
  rejectGp(id: any){

    const token=this._AuthService.getToken();
    this.profAndTa.getUserType(token).subscribe((type:any ) => {
      if(type[0].Type==="Professor"){
        this.profAndTa.rejectGP_prof(id).subscribe(() => {
          this.message = "Request rejected successfully.";
          this.response2 = true;
        }, (error: any) => {
          console.error('Reject request error:', error);
        });
      
      } else if(type[0].Type==="TA"){
        this.profAndTa.rejectGP_TA(id).subscribe(() => {
          this.message = "Request rejected successfully.";
          this.response2 = true;
        }, (error: any) => {
          console.error('Reject request error:', error);
        });
      }
    
    });
   
    this.selectedGpId = id;
  }
}
