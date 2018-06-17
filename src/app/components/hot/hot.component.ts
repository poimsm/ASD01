import { Component, OnInit } from "@angular/core";
import { DataService } from "../../providers/data.service";
import { BrowserService } from "../../providers/browser.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

declare var jQuery: any;
declare var $: any;

@Component({
  selector: "app-hot",
  templateUrl: "./hot.component.html",
  styleUrls: ["./hot.component.css"]
})
export class HotComponent implements OnInit {
  showResp = false;
  posts: any;
  likes: any;
  imagenes: any;
  usuarios: any;
  comentarios: any;
  options: any;
  actions: any;
  rayos: any;
  mm = "si";
  optionValue = "";

  l: number;

  constructor(
    public _browserService: BrowserService,
    public _ds: DataService,
    private router: Router
  ) {
    this._ds.getUsers().subscribe(x => (this.usuarios = x));
    this._ds.getPosts().subscribe(x => (this.posts = x));
    this._ds.getComents().subscribe(x => (this.comentarios = x));
    this._ds.getLikes().subscribe(x => (this.likes = x));
    this._ds.getImgs().subscribe(x => (this.imagenes = x));
    this._ds.getActions().subscribe(x => (this.actions = x));
    this._ds.getOptions().subscribe(x => (this.options = x));
    this._ds.getClientNotifications().subscribe(x => (this.rayos = x));
  }

  ngOnInit() {
    $(".dropdown.keep-open").on({
      "shown.bs.dropdown": function() {
        this.closable = false;
      },
      click: function() {
        this.closable = true;
      },
      "hide.bs.dropdown": function() {
        return this.closable;
      }
    });
  }

  remove(dom: string) {
    $("#" + dom + "este").remove();
  }

  navegar(key: string) {
    this._browserService.goPlaces(key);
  }

  agregarLikePost(postId) {
    this._ds.updateTotaLikes(postId, "add");
    this._ds.addLikeByPost(postId);
  }
  quitarLikePost(postId, likeId) {
    this._ds.updateTotaLikes(postId, "");
    this._ds.deleteLikePost(likeId);
  }
  guardar(id: string) {
    this._ds.savePostId(id);
  }
  deletePost(id: string) {
    this._ds.deletePost(id);
  }
  ToggleFalseImg(id) {
    this._ds.updateImg(id, false);
  }
  ToggleTrueImg(id) {
    this._ds.updateImg(id, true);
  }
  change(id, content) {
    $("#" + id).html(content);
  }
  optionToggle(id, flag) {
    this._ds.updateOption(id, flag);
  }
  getSelections(optionId) {
    this.optionValue = $("#" + optionId).html();
  }
  deleteRayo(id) {
    $("#" + id).remove();
  }

  showTopic2(id) {
    $("#" + id + "hunter")
      .mouseover(function() {
        $("#" + id + "target")
          .stop(true, true)
          .show(400);
      })
      .mouseout(function() {
        $("#" + id + "target")
          .stop(true, true)
          .hide(400);
      });
  }

  showTopic(id) {
    $("#" + id + "target").show();
  }
  hideTopic(id) {
    $("#" + id + "target").hide();
  }

  clickRayo(postId, ownerId) {
    const values = [];
    const titles = [];
    for (const action of this.actions) {
      if (action.postId === postId) {
        const optionValue = $("#" + action.id).html();
        values.push(optionValue);
        titles.push(action.title);
      }
    }
    console.log("Values", values);
    console.log("Titles", titles);
    this._ds.addNotificationByClient(postId, ownerId, titles, values);
  }
}
