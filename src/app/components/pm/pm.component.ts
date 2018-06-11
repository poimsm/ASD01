import { Component, OnInit } from '@angular/core';
import { PostService } from '../../providers/post.service';

@Component({
  selector: 'app-pm',
  templateUrl: './pm.component.html',
  styleUrls: ['./pm.component.css']
})
export class PmComponent implements OnInit {

  constructor( public _ps:PostService ) { }

  ngOnInit() {
  }

  navegar(){
    this._ps.goPlaces('chat');
  }
}
