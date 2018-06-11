import { Component, OnInit } from '@angular/core';
import { DataService } from '../../providers/data.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.css']
})
export class LikesComponent implements OnInit {

  constructor( public _ds:DataService ) { }

  ngOnInit() {
  }

}
