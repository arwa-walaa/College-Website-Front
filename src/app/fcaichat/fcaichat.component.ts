
import { MessageService } from '../message.service';
import { map } from 'rxjs';
import { StudentsService } from './../students.service';
import { AuthService } from '../auth.service';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-fcaichat',
  templateUrl: './fcaichat.component.html',
  styleUrls: ['./fcaichat.component.css']
})

export class FCAIChatComponent implements OnInit {
  @ViewChild('fileInput') fileInput:any;
  student: any;
  messages: any;
  profOrTA: any;
  message: any = '';
  messagesOfProfessorAndTA: any;
  messagesOfStudent: any;
  contacts:any;
  professorsDetails:any;
  TADetails:any;
  isTA:boolean=false;
  isProfessor:boolean=false;

  senderData:any;
  searchText='';

  attachement:any;
  selectedFile: any;
  attachmentUrl: any;
 

  constructor(private messageService: MessageService ,private stdService:StudentsService, private _AuthService:AuthService ) { }
 

  ngOnInit() {
    
    this.getSenderDetails();
    this.profOrTA; // Replace with recipient ID
    this.student;
    // this.getProfessorDetails("Ayman");
    this.getAllContacts();
   
  }
  
  loadProfessorAndTAMessages() {
    return this.messageService.getProfessorAndTAHistory(this.student, this.profOrTA);
  }

  loadStudentMessages() {
    //console.log()
    return this.messageService.getStudentHistory(this.student);
  }
  

  // sendMessage() {
  //   const msgDetails = {
  //     from: this.student,
  //     to: this.profOrTA,
  //     message: this.message,
  //     //attachement: this.attachement
  //   };

  //  //formData.add('selectedFile', JSON.stringify(msgDetails));

  //   console.log("msgDetails", msgDetails);
  //   // if (this.selectedFile) {
  //   //   const formData={
  //   //     from: this.student,
  //   //     to: this.profOrTA,
  //   //     message: this.message,
  //   //     selectedFile: this.selectedFile
  //   //   };

  //   // }

  //   // if(this.selectedFile)
  //   // {

  //   // }
   
  //   this.messageService.sendMessage(msgDetails).subscribe(() => {
  //     // this.loadProfessorAndTAMessages().subscribe((history) => {
  //     //   this.messagesOfProfessorAndTA = history;
  //     // });

  //     // this.loadStudentMessages().subscribe((history) => {
  //     //   this.messagesOfStudent = history;
  //     // }
  //     //);

  //     this.message = '';
  //   }
  //   , (error) => {
  //     console.log(error);
  //   });

    
  // }
 
 
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // sendMessage() {
  //   const msgDetails = new FormData();
  //   msgDetails.append('from', this.student);
  //   msgDetails.append('to', this.profOrTA);
  //   msgDetails.append('message', this.message);
  //   if (this.selectedFile) {
  //     msgDetails.append('attachment', this.selectedFile, this.selectedFile.name);
  //   }
  //   this.messageService.sendMessage(msgDetails).subscribe(() => {
  //     // handle success
  //     this.message = '';
  //   }, (error) => {
  //     // handle error
  //     console.log(error);
  //   });
  // }

 

sendMessage() {
  const formData = new FormData();
  formData.append('from', this.student);
  formData.append('to', this.profOrTA);
  formData.append('message', this.message);
  if (this.selectedFile) {
    formData.append('attachment', this.selectedFile, this.selectedFile.name);
  }
  this.messageService.sendMessage(formData).subscribe((response: any) => {
    this.loadProfessorAndTAMessages().subscribe((history) => {
     this.messagesOfProfessorAndTA = history;
    });
    // handle success
    this.message = '';
    // if (response.attachment_url) {
    //   this.attachmentUrl = 'http://127.0.0.1:8000/' + response.attachment_url; // set the attachment URL
    // }

    if (response.attachment_path) {
      this.attachmentUrl = response.attachment_url;
    }
  }, (error) => {
    // handle error
    console.log(error);
  });
}

triggerFileInput() {
  this.fileInput.nativeElement.click();
}


  getAllContacts(){
    this.messageService.getContacts().subscribe(
      response => {
        this.contacts=response;
        console.log(this.contacts);
    
    },
    error => {
      console.error('Error!', error);
      
      
    });
    
  }
  getProfessorDetails(professorName:any){
    this.messageService.getProfessorDetails(professorName)
    .subscribe(
      response => {
        this.professorsDetails=response;
        console.log(this.professorsDetails.professorDtails[0].professorName);
        if( this.professorsDetails!=null){
          this.isProfessor=true;
          this.isTA=false;
          this.profOrTA=this.professorsDetails.professorDtails[0].userID;
          console.log(this.isProfessor);
          console.log(this.profOrTA);
          this.loadProfessorAndTAMessages().subscribe((history) => {
            this.messagesOfProfessorAndTA = history;
            console.log(this.messagesOfProfessorAndTA);
          });

          this.loadStudentMessages().subscribe((studentHistory) => {
            this.messagesOfStudent = studentHistory;
            this.messages = this.messagesOfStudent.messages;
            console.log('all array',this.messagesOfStudent);
             console.log('stdmsg',this.messagesOfStudent.messages[0].message);
          });
      

        }
    
    },
    error => {
      console.error('Error!', error);
      
      
    });
  }
  getTADetails(TAName:string){
    this.messageService.getTADetails(TAName)
    .subscribe(
      response => {
        this.TADetails=response;
        console.log(this.TADetails.TADtails[0].TAName);
        if( this.TADetails!=null){
          this.isTA=true;
          this.isProfessor=false;
          this.profOrTA=this.TADetails.TADtails[0].userID;
          console.log(this.isTA);

          this.loadProfessorAndTAMessages().subscribe((history) => {
            this.messagesOfProfessorAndTA = history;
            console.log(this.messagesOfProfessorAndTA);
          });

          this.loadStudentMessages().subscribe((history) => {
            this.messagesOfStudent = history;
          });
      

        }
        
    },
    error => {
      console.error('Error!', error);
      
      
    });
  }

  // getSenderDetails()
  // { 
  //   const token=this._AuthService.getToken();
  //   this.stdService.getStudentInfo(token).subscribe({
  //     next:(response)=> {this.senderData=response,
      
  //       this.student = this.senderData[0].userID;
  //       console.log(this.student);
  //       console.log(this.senderData);
      
  //     }
     
  //    // StudentData[0].studentId
      
  //   });

    
  // }
//test from sara
  getSenderDetails()
  { 
    const token=this._AuthService.getToken();
    console.log(token);
    this.stdService.getStudentInfo(token).subscribe(
      response=>{ 
        this.senderData=response;
        this.student = this.senderData[0].userID;
        console.log('std id',this.student);
        console.log('sender data',this.senderData);
      
      },
      error => { 
        console.error(error,'cant work');
        
      }
     
     // StudentData[0].studentId
      
    );

    
  }


  // onFileSelected(event: any) {
  //   this.attachement = event.target.files[0];
  //   // do something with the selected file, such as uploading it to a server
  // }
}
