import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "../../providers/data.service";
import { OutsideEventModule } from "ng2-events";
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
  showNotes = false;
  showComments = false;
  showChat = false;
  showConfiguraciones = false;
  closeChat: boolean;

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
  close(key) {
    if (key === "comentarios") {
      this.showComments = false;
    }
    if (key === "chat") {
      this.showChat = false;
    }
    if (key === "configuraciones") {
      this.showConfiguraciones = false;
    }
  }
}
