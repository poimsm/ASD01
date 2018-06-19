import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "../../providers/data.service";
declare var jQuery: any;
declare var $: any;
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  showBar = false;
  ownerData: any;
  notificador = 0;

  constructor(public _ds: DataService, private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this._ds.getOwnerNotifications(this._ds.userId).subscribe(ownerData => {
        let counter = 0;
        for (const data of ownerData) {
          counter = counter + data.totalReactions;
        }
        this.notificador = counter;
      });
    }, 3000);
  }
}
