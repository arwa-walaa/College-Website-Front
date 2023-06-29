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
  message: any = '';
  contacts: any;
  recentContacts:any;
  searchText = '';
  attachement: any;
  selectedFile: any;
  attachmentUrl: any;
  currentSender:any;
  currentReceiver :any;
  chatPartner :any='';
  senderInfo:any;
  chatHistory:any;
  flag: boolean=false;
  flag2: any;
  

  constructor(private messageService: MessageService,
    private _AuthService: AuthService,
   ) { }


  ngOnInit() {
    const token = this._AuthService.getToken();
    this.messageService.getUserInfo(token).subscribe(
      senderInfo=> {
        this.senderInfo=senderInfo;
        console.log('senderInfo',this.senderInfo);
        this.currentSender=this.senderInfo[0].id;
        this.getRecentContacts (this.senderInfo[0].id,true) ;    
    }
    ,
    error => { 
      console.error(error);  
    });

    setInterval(() => {
      this.getHistory(this.currentSender,this.currentReceiver).subscribe((history) => {
        this.chatHistory = history;
      });
    }, 2000);

  }

getAllContacts(){
  this.flag2=false;
  this.flag=true;
  this.messageService.getAllContacts(this.senderInfo[0].id,this.senderInfo[0].Type).subscribe(
    response=> {
      this.contacts=response;
      console.log('contacts',this.contacts);  
     
  }
  ,
  error => { 
    console.error(error);  
  });
  
}
getRecentContacts(senderID:any,flage2:any){
  this.flag2=flage2;
  this.messageService.getRecentContacts(senderID).subscribe(
    response=> {
      this.recentContacts=response;
      console.log('recent contacts',this.recentContacts);     
  }
  ,
  error => { 
    console.error(error);  
  });
  
}

setCurrentReceiver(receiver: any) {
  this.flag2=true;
  this.flag=false;
  this.currentReceiver = receiver.userID;
  this.chatPartner= receiver.Type+'. '+receiver.name;
  console.log('currentReceiver',this.currentReceiver);
  this.getHistory(this.currentSender,this.currentReceiver).subscribe((history) => {
    this.chatHistory = history;
    console.log('chatHistory',this.chatHistory);
  });
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
  formData.append('from', this.currentSender);
  formData.append('to', this.currentReceiver);

  this.messageService.sendMessage(formData).subscribe((response: any) => {
    this.getHistory(this.currentSender,this.currentReceiver).subscribe((history) => {
      this.chatHistory = history;
    });
    this.selectedFile = null;
    this.message = '';
    const inputElement = document.querySelector('input[name="message"]') as HTMLInputElement;
    if (inputElement) {
      inputElement.value = '';
    }
    console.log('msg send sucessfully');
  }, (error) => {
    console.log(error);
  });

}
getHistory(currentSender:any,currentReceiver:any) {
    return this.messageService.getHistory(currentSender, currentReceiver);
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    const inputElement = document.querySelector('input[name="message"]');
    if (inputElement instanceof HTMLInputElement) {
      inputElement.value = this.selectedFile.name;
    }
  }
  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }


  openImagePopup(url: string) {
    window.open(url, 'Image', 'width=800,height=600');
  }
  isImage(file: string): boolean {
    return file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png') || file.endsWith('.gif');
  }


}