import { Component, OnInit } from "@angular/core";
import { PostService } from "../../providers/post.service";

declare var jQuery: any;
declare var $: any;

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"]
})
export class ChatComponent implements OnInit {
  element: any;

  constructor(public _ps: PostService) {}

  ngOnInit() {
    this.element = document.getElementById("app-chat");
    this.element.scrollTop = this.element.scrollHeight;
  }

  navegar() {
    this._ps.goPlaces("user");
  }
}
