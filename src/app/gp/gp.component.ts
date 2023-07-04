
import { StudentsService } from '../students.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-gp',
  templateUrl: './gp.component.html',
  styleUrls: ['./gp.component.css']
})
export class GpComponent implements OnInit {

  idea:any;
  requirements:any;
  member1:any;
  member2:any;
  member3:any;
  member4:any;
  member5:any;
  professor:any;
  TA:any;
  

  error:any;
  professors: any;
  TAs: any;

  constructor(private router: Router,private __StudentsService:StudentsService) {}
  ngOnInit(): void {
    


    this.__StudentsService.returnAllProfessor().subscribe((professors:any ) => {
     this.professors=professors
    
    });
    this.__StudentsService.returnAllTAs().subscribe((TAs:any ) => {
      this.TAs=TAs
     
     });
    
  }

  public GPForm:FormGroup = new FormGroup({  
    idea: new FormControl (null,[Validators.required]),   
    requirements: new FormControl (null,[Validators.required]),         
    member1: new FormControl (null,[Validators.pattern('^([1-9]{1})([0-9]{7})$'),Validators.required]),
    member2: new FormControl (null,[Validators.pattern('^([1-9]{1})([0-9]{7})$'),Validators.required]),
    member3: new FormControl (null,[Validators.pattern('^([1-9]{1})([0-9]{7})$'),Validators.required]),
    member4: new FormControl (null,[Validators.pattern('^([1-9]{1})([0-9]{7})$'),Validators.required]),
    member5: new FormControl (null,[Validators.pattern('^([1-9]{1})([0-9]{7})$'),Validators.required]),
    // professor: new FormControl (null,[Validators.required]),
    // TA: new FormControl (null,[Validators.required]),
    professor: new FormControl (),
    TA: new FormControl (),
   
  })

  

//   onSubmit(GPForm:FormGroup) {
 
//     this.__StudentsService.registerGP(GPForm.value).subscribe(
//       response=> {
//         // if (response && !('error' in response)) {
//           console.log("response=====",response);
//           // alert("response====="+response);  
//           // this.router.navigate(['/home_login']);
//         // }    
//     }
//     ,
//     error => { 
//       console.log(error);
//       // this.error = "Data doesn't inserted";
//       // alert(error);
//       // this.router.navigate(['/home_login']);
//     });

//   //   response => {
//   //     this.snackBar.open('Data successfully inserted!', 'Close', {
//   //       duration: 3000,
//   //       verticalPosition: 'top'
//   //     });
  
 
//   // },
//   // error => {
//   //   console.error(error);
//   //   this.snackBar.open('Error inserting data', 'Close', {
//   //     duration: 3000,
//   //     verticalPosition: 'top'
//   //   });
  
  
//   // }
//   // );
// }
onSubmit(GPForm:FormGroup) {
  this.__StudentsService.registerGP(GPForm.value).subscribe(
    response => {
      console.log("response=====", response);
      if (response && response.message === 'Data has been inserted successfully') {
        alert("Data has been inserted successfully");
        this.router.navigate(['/home_login']);
      } else {
        alert("Error: " + response.message);
        this.router.navigate(['/gpForm']);
        window.location.reload();
      }
    },
    error => {
      console.log(error);
      alert("Error inserting data");
      this.router.navigate(['/home_login']);
      
    }
  );
}

}

