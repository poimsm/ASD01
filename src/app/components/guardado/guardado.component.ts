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
  showResp = false;
  showImg = false;

  show = false;

  comentarios: any = [];
  posts: any = [];
  postt: any;
  likee: any;
  usuarios: any;
  comentarioss: any;

  likeC = 0;
  comentC = 0;
  k = 999;
  l: number;

  constructor(
    public _browserService: BrowserService,
    public _ds: DataService,
    private router: Router
  ) {
    this._ds.get2SavePostId().subscribe(x => console.log(x));
    this._ds.getUser().subscribe(x => (this.usuarios = x));
    this._ds.get2SavePost().subscribe(x => (this.postt = x));
    this._ds.get2Coment().subscribe(x => (this.comentarioss = x));
    this._ds.get2Like().subscribe(x => (this.likee = x));
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

  chao() {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve("holaaaa"), 2000);
    });
  }

  saludos() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        for (let like of this.likee) {
          this.likeC = this.likeC + 1;
        }
        resolve(this.likeC);
      }, 2000);
    });
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
}
