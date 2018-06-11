import { Component, OnDestroy } from "@angular/core";
import { DataService } from "./providers/data.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnDestroy {
  constructor(public _ds: DataService) {}
  ngOnDestroy() {
    this._ds.logout();
  }
}
