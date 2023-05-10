
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

  constructor(private router: Router,private __StudentsService:StudentsService) {}
  ngOnInit(): void {
   
  }

  public GPForm:FormGroup = new FormGroup({  
    idea: new FormControl (null,[Validators.required]),   
    requirements: new FormControl (null,[Validators.required]),         
    member1: new FormControl (null,[Validators.pattern('^([1-9]{1})([0-9]{7})$'),Validators.required]),
    member2: new FormControl (null,[Validators.pattern('^([1-9]{1})([0-9]{7})$'),Validators.required]),
    member3: new FormControl (null,[Validators.pattern('^([1-9]{1})([0-9]{7})$'),Validators.required]),
    member4: new FormControl (null,[Validators.pattern('^([1-9]{1})([0-9]{7})$'),Validators.required]),
    member5: new FormControl (null,[Validators.pattern('^([1-9]{1})([0-9]{7})$'),Validators.required]),
    professor: new FormControl (null,[Validators.required]),
    TA: new FormControl (null,[Validators.required]),
   
  })
  

  onSubmit(GPForm:FormGroup) {
 
    this.__StudentsService.registerGP(GPForm.value).subscribe(
      response=> {
        if (response && !('error' in response)) {

          alert('data has been inserted succefully');  
      this.router.navigate(['/home_login']);
        }    
    }
    ,
    error => { 
      console.error(error);
      this.error = "Data doesn't inserted";
      alert('The form has been submitted successfully');
      this.router.navigate(['/home_login']);
    });

  //   response => {
  //     this.snackBar.open('Data successfully inserted!', 'Close', {
  //       duration: 3000,
  //       verticalPosition: 'top'
  //     });
  
 
  // },
  // error => {
  //   console.error(error);
  //   this.snackBar.open('Error inserting data', 'Close', {
  //     duration: 3000,
  //     verticalPosition: 'top'
  //   });
  
  
  // }
  // );
}}

