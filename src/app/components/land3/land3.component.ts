import { Component, OnInit } from '@angular/core';
import { PostService } from '../../providers/post.service';

@Component({
  selector: 'app-land3',
  templateUrl: './land3.component.html',
  styleUrls: ['./land3.component.css']
})
export class Land3Component implements OnInit {

  constructor( public _ps:PostService ) { }

  ngOnInit() {
  }
  navegar(){
    this._ps.goPlaces('land1');
  }
}
