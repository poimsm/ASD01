import { Component, OnInit } from "@angular/core";
import { DataService } from "../../providers/data.service";
import { BrowserService } from "../../providers/browser.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { TouchEventModule } from "ng2-events/lib/touch";

declare var jQuery: any;
declare var $: any;

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
  options: any;
  actions: any;
  rayos: any;
  mm = "";
  newprogress = 0;
  optionValue = "";
  interval: any;
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
    setTimeout(() => {
      const self = this;
      for (const post of this.posts) {
        $("#" + post.id + "rayo").on("touchstart mousedown", function(e) {
          e.preventDefault();
          console.log("ENTER");
          self.progress(post.id, post.userId, 0);
        });
        $("#" + post.id + "rayo").on("touchend mouseup mouseleave", function(
          e
        ) {
          e.preventDefault();
          console.log("LEAVE");

          self.progress(post.id, post.userId, 100);
        });
      }
    }, 2000);
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
    const savePost = [];
    let postDate = "";
    for (const post of this.posts) {
      if (post.id === id) {
        savePost.push(post);
        postDate = post.fecha;
      }
    }
    this._ds.addSavePost(savePost, postDate);
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

  progress(postId, postUserId, value) {
    if (value === 0) {
      this.interval = setInterval(() => {
        this.newprogress += 1;
        const self = this;
        $("#" + postId + "rayoBar")
          .width(self.newprogress + "%")
          .attr("aria-valuenow", self.newprogress + "")
          .parent()
          .show();
      }, 10);
    }
    // if (value === 100) {
    //   clearInterval(this.interval);
    //   console.log("PASOO");
    // }
    if (this.newprogress >= 100 && value === 100) {
      clearInterval(this.interval);
      this.newprogress = 0;
      const self = this;
      this.clickRayo(postId, postUserId);

      $("#" + postId + "rayoBar")
        .width(self.newprogress + "%")
        .attr("aria-valuenow", self.newprogress + "")
        .parent()
        .hide();
    }
    if (this.newprogress < 100 && value === 100) {
      clearInterval(this.interval);
      this.newprogress = 0;
      const self = this;

      $("#" + postId + "rayoBar")
        .width(self.newprogress + "%")
        .attr("aria-valuenow", self.newprogress + "")
        .parent()
        .hide();
    }

    //  else if (this.newprogress < 100) {
    //   setTimeout(() => {
    //     $("#" + postId + "rayoBar")
    //       .width("0%")
    //       .attr("aria-valuenow", "0")
    //       .parent()
    //       .hide();
    //   }, 1000);
    // } else if (this.newprogress === 100) {
    //   setTimeout(() => {
    //     $("#" + postId + "rayoBar")
    //       .width("0%")
    //       .attr("aria-valuenow", "0")
    //       .parent()
    //       .show();
    //   }, 1000);
    // }
    // if (value === 0) {
    //   const interval = setInterval(() => {
    //     this.newprogress += 100;
    //     $("#" + postId + "rayoBar")
    //       .width("100%")
    //       .attr("aria-valuenow", "100")
    //       .parent()
    //       .show();
    //     if (this.newprogress === 100) {
    //       clearInterval(interval);
    //     }
    //   }, 700);
    // } else {
    //   setTimeout(() => {
    //     $("#" + postId + "rayoBar")
    //       .width("0%")
    //       .attr("aria-valuenow", "0")
    //       .parent()
    //       .hide();
    //   }, 1000);
    //   if (this.newprogress === 100) {
    //     this.clickRayo(postId, postUserId);
    //   }
    //   this.newprogress = 0;
    // }
  }

  showTopic(id) {
    $("#" + id + "target").show();
  }
  hideTopic(id) {
    $("#" + id + "target").hide();
  }

  comentarioToggle(postId, flag) {
    this._ds.updateShowComentario(postId, flag);
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
    this._ds.addNotificationByClient(postId, ownerId, titles, values);
  }
}
