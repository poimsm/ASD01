import { Component, OnInit } from "@angular/core";
import { BrowserService } from "../../providers/browser.service";

@Component({
  selector: "app-land1",
  templateUrl: "./land1.component.html",
  styleUrls: ["./land1.component.css"]
})
export class Land1Component implements OnInit {
  constructor(public _bs: BrowserService) {}

  ngOnInit() {}
  navegar() {
    this._bs.goPlaces("land2");
  }
}
