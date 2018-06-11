import { Component, OnInit } from '@angular/core';
import { PostService } from '../../providers/post.service';

@Component({
  selector: 'app-land1',
  templateUrl: './land1.component.html',
  styleUrls: ['./land1.component.css']
})
export class Land1Component implements OnInit {

  constructor( public _ps:PostService ) { }

  ngOnInit() {
  }
  navegar(){
    this._ps.goPlaces('land2');
  }
}
