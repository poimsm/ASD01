import { Component, OnInit } from "@angular/core";
import { BrowserService } from "../../providers/browser.service";

@Component({
  selector: "app-land2",
  templateUrl: "./land2.component.html",
  styleUrls: ["./land2.component.css"]
})
export class Land2Component implements OnInit {
  constructor(public _bs: BrowserService) {}

  ngOnInit() {}
  navegar() {
    this._bs.goPlaces("land3");
  }
}
