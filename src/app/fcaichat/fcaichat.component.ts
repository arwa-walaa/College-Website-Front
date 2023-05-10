
import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-fcaichat',
  templateUrl: './fcaichat.component.html',
  styleUrls: ['./fcaichat.component.css']
})
export class FCAIChatComponent implements OnInit {
  user1: any ;
  user2: any ;
  message: any = '';
  messages: any;
  contacts:any;
  professorsDetails:any;
 TADetails:any;
 isTA:boolean=false;
 isProfessor:boolean=false;
 

  constructor(private messageService: MessageService) { }
 

  ngOnInit() {
    
    // this.user2 = 2; // Replace with recipient ID
    this.user1 = 3;
  
    // this.getProfessorDetails("Ayman");
    this.getAllContacts();
  
    this.loadMessages().subscribe((history) => {
      this.messages = history;
      console.log(this.messages);
    });
  }
  
  loadMessages() {
    return this.messageService.getMessages(this.user1, this.user2);
  }
  

  sendMessage() {
    const msgDetails = {
      from: this.user1,
      to: this.user2,
      message: this.message
    };

    this.messageService.sendMessage(msgDetails).subscribe(() => {
      this.loadMessages().subscribe((history) => {
        this.messages = history;
      });
      this.message = '';
    }, (error) => {
      console.log(error);
    });
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
          this.user2=this.professorsDetails.professorDtails[0].professorId;
          console.log(this.isProfessor);

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
          this.user2=this.TADetails.TADtails[0].TAId
          console.log(this.isTA);

        }
        
    
    },
    error => {
      console.error('Error!', error);
      
      
    });
    

  }
}
