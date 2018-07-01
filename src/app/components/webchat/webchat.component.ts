import { Component, OnInit, Output, EventEmitter } from "@angular/core";
declare var jQuery: any;
declare var $: any;

@Component({
  selector: "app-webchat",
  templateUrl: "./webchat.component.html",
  styleUrls: ["./webchat.component.css"]
})
export class WebchatComponent implements OnInit {
  @Output() closeChat = new EventEmitter<boolean>();

  showChat = false;

  constructor() {}

  ngOnInit() {
    $("textarea")
      .each(function() {
        this.setAttribute(
          "style",
          "height:" + this.scrollHeight + "px;overflow-y:hidden;"
        );
      })
      .on("input", function() {
        this.style.height = "auto";
        this.style.height = this.scrollHeight + "px";
      });
  }
  close() {
    this.closeChat.emit(true);
  }
}
