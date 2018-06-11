import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user2',
  templateUrl: './user2.component.html',
  styleUrls: ['./user2.component.css']
})
export class User2Component implements OnInit {
  showPhotos=false;
  showD="gallery";
  showEnvios=false;
  i:number=1;
  constructor() { }

  ngOnInit() {
  }

  toggle(){
    if (this.i===1){
      this.i=this.i+1;
      return this.showD="profile"
    }
    if (this.i===2){
      this.i=this.i+1;
      return this.showD="upload"
    }
    if (this.i===3){
      this.i=1;
      return this.showD="gallery"
    }
  }

  toggleEnvios(){
    if (this.showEnvios) {
      return this.showEnvios=false;
    }
    if (!this.showEnvios) {
      return this.showEnvios=true;
    }
  }
}
