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
  showImg = false;

  show = false;

  comentarios: any = [];
  posts: any = [];
  postt: any;
  likee: any;
  imagenes: any;
  usuarios: any;
  comentarioss: any;

  likeC = 0;
  comentC = 0;
  k = 999;
  l: number;
  items = [1, 2, 3];
  fd = true;

  constructor(
    public _browserService: BrowserService,
    public _ds: DataService,
    private router: Router
  ) {
    this._ds.getUser().subscribe(x => (this.usuarios = x));
    this._ds.get2Post().subscribe(x => (this.postt = x));
    this._ds.get2Coment().subscribe(x => (this.comentarioss = x));
    this._ds.get2Like().subscribe(x => (this.likee = x));
    this._ds.getImg().subscribe(x => (this.imagenes = x));
  }

  ngOnInit() {}

  likecounter() {
    this.likeC += 1;
  }
  likereset() {
    this.likeC = 0;
  }
  comentcounter() {
    this.comentC += 1;
  }
  comentreset() {
    this.comentC = 0;
  }

  remove(dom: string) {
    $("#" + dom + "este").remove();
  }
  enviarContador(contador: number, postId: string, dato: string) {
    if (dato === "comentario") {
      console.log(contador);
      // this._ds.postCounterByComent(contador, postId);
    } else {
    }
  }

  navegar(key: string) {
    this._browserService.goPlaces(key);
  }

  agregarLikePost(dom) {
    this._ds.add2LikeByPost(dom);
  }
  quitarLikePost(likeId: string) {
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
