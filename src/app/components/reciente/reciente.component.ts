import { Component, OnInit } from "@angular/core";
import { DataService } from "../../providers/data.service";
import { BrowserService } from "../../providers/browser.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

declare var jQuery: any;
declare var $: any;

@Component({
  selector: "app-reciente",
  templateUrl: "./reciente.component.html",
  styleUrls: ["./reciente.component.css"]
})
export class RecienteComponent implements OnInit {
  showResp = false;
  posts: any;
  likes: any;
  imagenes: any;
  usuarios: any;
  comentarios: any;

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
  }

  ngOnInit() {}

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
}
