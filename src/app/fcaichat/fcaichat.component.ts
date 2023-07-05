import { AuthService } from '../auth.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MessageService } from './../message.service';
import { ThisReceiver } from '@angular/compiler';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

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
  chatPartner:any='';
  chatPartnerType:any;
  senderInfo:any;
  chatHistory:any;
  flag: boolean=false;
  flag2: any;
  blockContent:boolean = false;
  receiverStatus:boolean = false;
  blockedUsers:any;
  mailMessage:any;
  chatPartnerId: any;
 
  

  constructor(private router: Router,private messageService: MessageService,
    private _AuthService: AuthService,private datePipe: DatePipe
   ) { }


  ngOnInit() {
    const token = this._AuthService.getToken();
    this._AuthService.getUserInfo(token).subscribe(
      senderInfo=> {
        this.senderInfo=senderInfo;
        console.log('senderInfo',this.senderInfo);
        this.currentSender=this.senderInfo[0].id;
        this.mailMessage='new message from ' + this.senderInfo[0].Type +' '+ this.senderInfo[0].name;
        console.log('mailMessage',this.mailMessage);
        this.getRecentContacts (this.senderInfo[0].id) ;    
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

  // this.getBlockedUsers();
  
}
formatDate(dateString: string): any {
  const offsetMs = new Date().getTimezoneOffset() * 60 * 1000;
  const date = new Date(Date.parse(dateString) - offsetMs);
  return this.datePipe.transform(date, 'dd/MM/yyyy h:mm a');
}

getRecentContacts(senderID:any){
  this.flag2=true;
  this.flag=false;
  this.messageService.getRecentContacts(senderID).subscribe(
    response=> {
      this.recentContacts=response;
      this.recentContacts = this.recentContacts.map((item: { last_contact_time: string }) => {
        return {
          ...item,
         
          last_contact_time: this.formatDate(item. last_contact_time)
        };
      });

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
  this.chatPartnerType= receiver.Type;
  this.receiverStatus=receiver.isblocked;
  console.log('receiverStatus',this.receiverStatus);
  console.log('currentReceiver',this.currentReceiver);
  console.log('student ID:',this.chatPartnerId);
  this.getHistory(this.currentSender,this.currentReceiver).subscribe((history) => {
    this.chatHistory = history;
    console.log('chatHistory',this.chatHistory);
  });
  this.updateSeenStatus(this.currentReceiver,this.currentSender);
}

sendMessage() {
  this.getBlockedUsers();
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

diplayBlockContent()
  {
    this.blockContent = true;
  }

blockUser()
  {
    this.messageService.blockUser(this.currentSender,this.currentReceiver)
    .subscribe(
      response=> {
        console.log('blocked users',response);              
    }
    ,
    error => { 
      console.error(error); 
      this.getAllContacts();
      this.getRecentContacts(this.currentSender);  
      alert("This user has been blocked");   
    }); 

    this.receiverStatus = true;
}

unBlockUser()
{
  this.messageService.unBlockUser(this.currentSender,this.currentReceiver)
  .subscribe(
    response=> {
      console.log('Unblocked users',response);            
  }
  ,
  error => { 
    console.error(error); 
    this.getAllContacts();
    this.getRecentContacts(this.currentSender);  
    alert("This user has been unblocked");   
  }); 
  this.receiverStatus = false; 
}

getBlockedUsers()
{
  this.messageService.getBlockedUsers(this.currentSender,this.currentReceiver)
  .subscribe(
    response=> {
      this.blockedUsers = response;
      console.log('blocked userssssssssss',this.blockedUsers);
      if(this.blockedUsers.length === 0)
  {
    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('attachment', this.selectedFile, this.selectedFile.name);
      formData.append('message', this.selectedFile.name);
      console.log('message body',this.selectedFile.name);
      console.log('found attachment');
    } else {
      formData.append('message', this.message);
    }
    formData.append('from', this.currentSender);
    formData.append('to', this.currentReceiver);
    this.messageService.sendMessage(formData).subscribe((response: any) => {
      this.getHistory(this.currentSender,this.currentReceiver).subscribe((history) => {
        this.chatHistory = history;
      });
      this.getRecentContacts(this.currentSender);
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

  else
  {
    

    alert("You can't send a message to this user");
  }
 
      console.log('Blocked Users' , response);         
  }
  ,
  error => { 
    console.error(error); 
  }); 

  ///don't delete this///
  // this.sendNotification(this.mailMessage);
}

updateSeenStatus(from:any , to:any)
{
  this.messageService.updateSeenStatus(from,to)
  .subscribe(
    response=> {
      console.log('seen status',response);    
      this.getRecentContacts(this.currentSender);        
  }
  ,
  error => { 
    console.error(error); 
  }); 
}

sendNotification(mailMessage:any)
{
  this.messageService.sendNotification(mailMessage)
  .subscribe(
    response=> {
      console.log('sent notification successfully',response);         
  }
  ,
  error => { 
    console.error(error); 
  }); 
}
// goToStudentProfile(studentInfo:any){
//   console.log('studentInfo',studentInfo)
//     this.router.navigate(['ViewStudentProfile'],{ queryParams: studentInfo  });
// }

}