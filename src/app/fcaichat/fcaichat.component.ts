import { map } from 'rxjs';
import { StudentsService } from './../students.service';
import { AuthService } from '../auth.service';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ProfessorTAService } from '../professor-ta.service';
import { Router } from '@angular/router';
import { ProfessorAndTaService } from '../professor-and-ta.service';
import { MessageService } from './../message.service';

@Component({
  selector: 'app-fcaichat',
  templateUrl: './fcaichat.component.html',
  styleUrls: ['./fcaichat.component.css']
})

export class FCAIChatComponent implements OnInit {
  @ViewChild('fileInput') fileInput: any;
  student: any;
  messages: any;
  profOrTA: any;
  message: any = '';
  messagesOfProfessorAndTA: any;
  messagesOfStudent: any;
  contacts: any;

  professorsDetails: any;
  TADetails: any;
  StudentChat: any;
  isTA: boolean = false;
  isStudent: boolean = false;
  isProfessor: boolean = false;

  senderData: any;
  searchText = '';

  attachement: any;
  selectedFile: any;
  attachmentUrl: any;
  userTypeValue: any;
  isBlocked: any;

  currentSender = 'profOrTA'; // default sender is professor or TA
  currentReceiver = 'student'; // default receiver is student
  chatPartner :any='';
  constructor(private messageService: MessageService,
    private stdService: StudentsService,
    private _AuthService: AuthService,
    private router: Router,
    private profAndTa: ProfessorAndTaService,
    private ProfService: ProfessorTAService) { }


  ngOnInit() {

    this.getStudentDetails();
    this.profOrTA; // Replace with recipient ID
    this.student;
    // this.getProfessorDetails("Ayman");
    this.getAllContacts();

    /////////////////////
    const token = this._AuthService.getToken();

    this._AuthService.getType(token).subscribe((userType: any) => {
      if (userType && userType.length > 0) {
        this.userTypeValue = userType[0].Type;
        console.log("usertype", this.userTypeValue);

        if (this.userTypeValue === "Student") {
          this.stdService.getStudentInfo(token).subscribe((StudentData: any) => {
            if (StudentData && StudentData.length > 0) {
              this.getAllContacts();
              this.StudentChat = StudentData;
              //console.log('prof data',this.getSchedualeProf(ProfessorData[0].professorId));
            } else {
              console.error("Professor or ta data is empty or null");
            }
          });
        } else if (this.userTypeValue === "Professor") {
          this.profAndTa.getProfessorInfo(token).subscribe((ProfessorData: any) => {
            if (ProfessorData && ProfessorData.length > 0) {
              this.listTAsStudents();
              this.professorsDetails = ProfessorData;
            } else {
              console.error("Students data is empty or null");
            }
          });
        }
        else if (this.userTypeValue === "TA") {
          this.profAndTa.getTAInfo(token).subscribe((TAData: any) => {
            if (TAData && TAData.length > 0) {
              this.listProfessorsStudents();
              this.TADetails = TAData;
            } else {
              console.error("Students data is empty or null");
            }
          });
        }
        else {
          console.error("Unknown userType: " + this.userTypeValue);
        }
      } else {
        console.error("userType is empty or null");
      }
      console.log('students and tas', this.contacts);
    });

///////////////
setInterval(() => {
  this.loadProfessorAndTAMessages().subscribe((history) => {
    this.messagesOfProfessorAndTA = history;
    console.log(this.messagesOfProfessorAndTA);
  });
}, 2000);

this.getStudentStatus(this.StudentChat.StudentDtails[0].userID);
  }
  /////////////////
  BlockStudent(){
    this.messageService.updateStudentStatus(this.StudentChat.StudentDtails[0].userID, '1').subscribe((response) => {
      console.log(response); // log the response message to the console
      this.getStudentStatus(this.StudentChat.StudentDtails[0].userID);
      
       alert("you have blocked this student");
    });
  }

  UnblockStudent(){ 
     this.messageService.updateStudentStatus(this.StudentChat.StudentDtails[0].userID, '0').subscribe((response) => {
      console.log(response); // log the response message to the console
      this.getStudentStatus(this.StudentChat.StudentDtails[0].userID);
      
      alert("you have unblocked this student");
    });
  }

  getStudentStatus(studentID:any)
  {
    this.messageService.getStudentStatus(studentID)
    .subscribe((status: any) => {
        this.isBlocked = status;
        console.log('is blocked or not',this.isBlocked[0].isBlocked);
    });

      
  }

 
  /////////////////

  //enter as a student
  loadProfessorAndTAMessages() {
    return this.messageService.getProfessorAndTAHistory(this.currentSender, this.currentReceiver);
  }


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];


    const inputElement = document.querySelector('input[name="message"]');
    if (inputElement instanceof HTMLInputElement) {
      inputElement.value = this.selectedFile.name;
    }


  }
  sendMessage() {
    const formData = new FormData();
  
    if (!this.message) {
      return;
    }
  
    if (this.selectedFile) {
      formData.append('attachment', this.selectedFile, this.selectedFile.name);
      formData.append('message', this.selectedFile.name);
    } else {
      formData.append('message', this.message);
    }
  
    // this.messageService.getStudentStatus(this.currentReceiver).subscribe((status: any) => {
    //   const isBlocked = status[0].isBlocked;
    //   console.log('isBlocked', isBlocked);
  
      if (this.userTypeValue === "Professor") {
        console.log('ta det',this.TADetails);
        formData.append('from', this.professorsDetails[0].userID);
        this.setCurrentSender(this.professorsDetails[0].userID);
        console.log('sending from prof');
       // if (this.StudentChat != null && isBlocked == '0') 
        if (this.StudentChat != null ) {
          formData.append('to', this.StudentChat.StudentDtails[0].userID);
          this.setCurrentReceiver(this.StudentChat.StudentDtails[0].userID);
          // console.log('if1 returning from sendMessage()');
          // alert('You can send a message to this student.');
  
        } 
        // else if (this.StudentChat != null && isBlocked == '1') {
        //   formData.append('to', this.StudentChat.StudentDtails[0].userID);
        //   alert('You cannot send a message to this student.');
        //   console.log('if 2 returning from sendMessage()');
        //   return;
  
        // } 
        // else if (this.TADetails != null && this.StudentChat == null) {
        //   formData.append('to', this.TADetails.TADtails[0].userID);
        //   this.setCurrentReceiver(this.TADetails.TADtails[0].userID);
        //   console.log('if 3 returning from sendMessage()');
  
        // }
         else {
          // If there is an active chat with a student, send the message to the TA
          formData.append('to', this.TADetails.TADtails[0].userID);
          this.setCurrentReceiver(this.TADetails.TADtails[0].userID);
          console.log('else returning from sendMessage()');
        }
  
      } else if (this.userTypeValue === "TA") {
        console.log('StudentChat');
        formData.append('from', this.TADetails[0].userID);
        this.setCurrentSender(this.TADetails[0].userID);
     
        console.log('StudentChat');
         
        // if (this.StudentChat != null && isBlocked == '0') 
       if (this.StudentChat != null) {
          formData.append('to', this.StudentChat.StudentDtails[0].userID);
          this.setCurrentReceiver(this.StudentChat.StudentDtails[0].userID);
          // console.log('if1 returning from sendMessage()');
          // alert('You can send a message to this student.');
          // this.StudentChat = null;

        }  
        else{
          formData.append('to', this.professorsDetails.professorDtails[0].userID);
          this.setCurrentReceiver(this.professorsDetails.professorDtails[0].userID);
        }
        // else if (this.StudentChat != null && isBlocked == '1'){
        //   formData.append('to', this.StudentChat.StudentDtails[0].userID);
        //   this.setCurrentReceiver(this.StudentChat.StudentDtails[0].userID);
        //   alert('You cannot send a message to this student.');
        //   console.log('if 2 returning from sendMessage()');
        //   this.StudentChat = null;
        //   return;
        // }
     
      } else {
        formData.append('from', this.StudentChat[0].userID);
        this.setCurrentSender(this.StudentChat[0].userID);
  
        if (this.professorsDetails != null) {
          formData.append('to', this.professorsDetails.professorDtails[0].userID);
          this.setCurrentReceiver(this.professorsDetails.professorDtails[0].userID);
        } else {
          formData.append('to', this.TADetails.TADtails[0].userID);
          this.setCurrentReceiver(this.TADetails.TADtails[0].userID);
        }
      }
  
      this.messageService.sendMessage(formData).subscribe((response: any) => {
        this.loadProfessorAndTAMessages().subscribe((history) => {
          this.messagesOfProfessorAndTA = history;
        });
  
        this.selectedFile = null;
        this.message = '';
        const inputElement = document.querySelector('input[name="message"]') as HTMLInputElement;
        if (inputElement) {
          inputElement.value = '';
        }
      }, (error) => {
        console.log(error);
      });
  //  });
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  getAllContacts() {
    this.messageService.getContacts().subscribe(
      response => {
        this.contacts = response;
        console.log(this.contacts);
      },
      error => {
        console.error('Error!', error);
      });
  }

  listProfessorsStudents() {
    this.messageService.listProfessorsStudents().subscribe(
      response => {
        this.contacts = response;
        console.log(this.contacts);
      },
      error => {
        console.error('Error!', error);
      });
  }

  listTAsStudents() {
    this.messageService.listTAsStudents().subscribe(
      response => {
        this.contacts = response;
        console.log(this.contacts);
      },
      error => {
        console.error('Error!', error);
      });
  }

  getProfessorDetails(professorName: any) {
    this.messageService.getProfessorDetails(professorName)
      .subscribe(
        response => {
          this.professorsDetails = response;
          console.log(this.professorsDetails.professorDtails[0].professorName);
          if (this.professorsDetails != null) {
            // this.isProfessor = true;
            // this.isTA = false;
            this.currentReceiver = this.professorsDetails.professorDtails[0].userID;
            this.chatPartner= 'Prof. '+this.professorsDetails.professorDtails[0].professorName;
            if (this.userTypeValue === "TA") {
              this.currentSender = this.TADetails[0].userID;
            }
            else {
              this.currentSender = this.StudentChat[0].userID;
            }

            console.log(this.isProfessor);
            console.log(this.profOrTA);
            this.loadProfessorAndTAMessages().subscribe((history) => {
              this.messagesOfProfessorAndTA = history;
              console.log(this.messagesOfProfessorAndTA);
            });
          
          }

        },
        error => {
          console.error('Error!', error);


        });
  }
  getTADetails(TAName: string) {
    this.messageService.getTADetails(TAName)
      .subscribe(
        response => {
          this.TADetails = response;
          console.log(this.TADetails.TADtails[0].TAName);
          if (this.TADetails != null) {
            // this.isTA = true;
            // this.isProfessor = false;
            //this.isStudent=false;
            this.currentReceiver = this.TADetails.TADtails[0].userID;
            this.chatPartner= 'TA. '+this.TADetails.TADtails[0].TAName;
            if (this.userTypeValue === "Professor") {
              this.currentSender = this.professorsDetails[0].userID;
            }
            else {
              this.currentSender = this.StudentChat[0].userID;
            }
            console.log(this.isTA);

            this.loadProfessorAndTAMessages().subscribe((history) => {
              this.messagesOfProfessorAndTA = history;
              console.log('iman to dina: ', this.messagesOfProfessorAndTA);
            });

          }

        },
        error => {
          console.error('Error!', error);

        });
  }

  getStudentDetails() {
    const token = this._AuthService.getToken();
    console.log(token);
    this.stdService.getStudentInfo(token).subscribe(
      response => {
        this.senderData = response;
        this.student = this.senderData[0].userID;

        console.log('std id', this.student);
        console.log('sender data', this.senderData);

      },
      error => {
        console.error(error, 'cant work');

      }
    );
  }

  getStudentChat(studentName: any) {
    this.messageService.getStudentsDetails(studentName)
      .subscribe(
        response => {
          this.StudentChat = response;
          console.log('fist', this.StudentChat.StudentDtails[0].studentName);
          if (this.StudentChat != null) {
            // this.isStudent = true;
            // this.isProfessor = false;
            // this.isTA=false;
            this.currentReceiver = this.StudentChat.StudentDtails[0].userID;
            this.chatPartner= this.StudentChat.StudentDtails[0].studentName;
            if (this.userTypeValue === "Professor") {
              this.currentSender = this.professorsDetails[0].userID;
            }
            else {
              this.currentSender = this.TADetails[0].userID;
            }
            // this.student = this.StudentChat.StudentDtails[0].userID;

            this.loadProfessorAndTAMessages().subscribe((history) => {
              this.messagesOfProfessorAndTA = history;
              console.log('iman to ahmed msg1 ', this.messagesOfProfessorAndTA);
            });


          }

          console.log(this.isStudent);
        },
        error => {
          console.error('Error!', error);
        });
    console.log(this.isStudent);
    console.log("cahhhhhhhhhhhhh", this.StudentChat);
    console.log("heloo");

  }
  setCurrentSender(sender: any) {
    this.currentSender = sender;
  }
  setCurrentReceiver(receiver: any) {
    this.currentReceiver = receiver;
  }

  openImagePopup(url: string) {
    window.open(url, 'Image', 'width=800,height=600');
  }
  isImage(file: string): boolean {
    return file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png') || file.endsWith('.gif');
  }


}
