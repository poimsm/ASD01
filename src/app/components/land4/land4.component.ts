import { Component, OnInit } from "@angular/core";
import { BrowserService } from "../../providers/browser.service";

@Component({
  selector: "app-land4",
  templateUrl: "./land4.component.html",
  styleUrls: ["./land4.component.css"]
})
export class Land4Component implements OnInit {
  constructor(public _bs: BrowserService) {}

  ngOnInit() {}
  navegar() {
    this._bs.goPlaces("land1");
  }
}
