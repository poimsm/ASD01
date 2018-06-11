import { Component, OnInit } from '@angular/core';
import { PostService } from '../../providers/post.service';

@Component({
  selector: 'app-land2',
  templateUrl: './land2.component.html',
  styleUrls: ['./land2.component.css']
})
export class Land2Component implements OnInit {

  constructor( public _ps:PostService ) { }

  ngOnInit() {
  }
  navegar(){
    this._ps.goPlaces('land3');
  }

}
