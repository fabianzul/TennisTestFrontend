import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  message;
  title = 'TennisWebPage';
  constructor(){
  }

  ngOnInit(){
    //this.messagingService.requestPermission()
    //this.messagingService.receiveMessage()
    //this.message = this.messagingService.currentMessage
  }
}
