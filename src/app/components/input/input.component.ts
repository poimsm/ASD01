import { Component, OnInit, Input } from "@angular/core";
declare var jQuery: any;
declare var $: any;
@Component({
  selector: "app-input",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.css"]
})
export class InputComponent implements OnInit {
  @Input() imageId;
  constructor() {}

  ngOnInit() {}
}
