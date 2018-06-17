import { Component, OnInit } from "@angular/core";
import { DataService } from "../../providers/data.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
  showProducts = false;
  usuario: any;

  constructor(public _ds: DataService) {
    // this._ds.getUser().subscribe(x => (this.usuarios = x));
  }

  ngOnInit() {}
}
