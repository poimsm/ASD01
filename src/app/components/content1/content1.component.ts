import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content1',
  templateUrl: './content1.component.html',
  styleUrls: ['./content1.component.css']
})
export class Content1Component implements OnInit {
  showVendedor=false;
  showDescription=false;
  showProducto=true;
  h=false;
  showVer=false;
  constructor() { }

  ngOnInit() {
  }

}
