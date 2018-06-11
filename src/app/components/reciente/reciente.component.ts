import { Component, OnInit } from '@angular/core';
import { PostService } from '../../providers/post.service';


@Component({
  selector: 'app-reciente',
  templateUrl: './reciente.component.html',
  styleUrls: ['./reciente.component.css']
})
export class RecienteComponent implements OnInit {

  constructor( public _ps:PostService) { }

  ngOnInit() {
  }
  cambio(){
    this._ps.goPlaces('otro');
  }
}
