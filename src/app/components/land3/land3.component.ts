import { Component, OnInit } from "@angular/core";
import { BrowserService } from "../../providers/browser.service";

@Component({
  selector: "app-land3",
  templateUrl: "./land3.component.html",
  styleUrls: ["./land3.component.css"]
})
export class Land3Component implements OnInit {
  constructor(public _bs: BrowserService) {}

  ngOnInit() {}
  navegar() {
    this._bs.goPlaces("land4");
  }
}
