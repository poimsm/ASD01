import { Component, OnInit } from '@angular/core';
import { PostService } from '../../providers/post.service';
import { Router } from '@angular/router';
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showBar = false;
  constructor( public _ps: PostService, private router: Router) {
    this._ps.getPost().subscribe( ()=>{
      // setTimeout( ()=>{this.elemento.style.backgroundColor="white"},40);
    });

    console.log(this._ps);
    // this.router.navigate(['/', 'landing', 'land1']);

  }



  ngOnInit() {
  }

}
