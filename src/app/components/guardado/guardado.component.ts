import { Component, OnInit } from "@angular/core";
import { DataService } from "../../providers/data.service";
import { BrowserService } from "../../providers/browser.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

declare var jQuery: any;
declare var $: any;

@Component({
  selector: "app-guardado",
  templateUrl: "./guardado.component.html",
  styleUrls: ["./guardado.component.css"]
})
export class GuardadoComponent implements OnInit {
  constructor() {}
  ngOnInit() {}
}
