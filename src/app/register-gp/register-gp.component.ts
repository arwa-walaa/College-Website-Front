import { StudentsService } from '../students.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register-gp',
  templateUrl: './register-gp.component.html',
  styleUrls: ['./register-gp.component.css']
})
export class RegisterGpComponent implements OnInit {

  // idea:any;
  // member1:any;
  // member2:any;
  // member3:any;
  // member4:any;
  // member5:any;
  // professor:any;
  // TA:any;
  constructor(private router: Router,private __StudentsService:StudentsService) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  public GPForm:FormGroup = new FormGroup({              
    member1: new FormControl (null,[Validators.required]),
    member2: new FormControl (null,[Validators.required]),
    member3: new FormControl (null,[Validators.required]),
    member4: new FormControl (null,[Validators.required]),
    member5: new FormControl (null,[Validators.required]),
    professor: new FormControl (null,[Validators.required]),
    TA: new FormControl (null,[Validators.required]),
    idea: new FormControl (null,[Validators.required]),
  })
  

  onSubmit(GPForm:FormGroup) {
 

    this.__StudentsService.registerGP(GPForm.value).subscribe(
  
      response => {
        alert('The form has been submitted successfully');
      }
  
    
  );
  }
}
