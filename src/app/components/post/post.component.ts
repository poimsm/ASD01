import { Component, OnInit } from "@angular/core";
import { PostService } from "../../providers/post.service";
import { DataService } from "../../providers/data.service";
import { ActivatedRoute } from "@angular/router";
import { CargaImagenesService } from "../../providers/carga-imagenes.service";
import { FileItem } from "../../models/file-item";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.css"]
})
export class PostComponent implements OnInit {
  text = "";
  varr = "";
  array = [];
  id: string;
  action: string;
  start: number;
  end: number;

  estaSobreElemento = false;
  archivos: FileItem[] = [];

  constructor(
    public _cargaImagenes: CargaImagenesService,
    public _ds: DataService,
    private activatedRouter: ActivatedRoute
  ) {
    this.activatedRouter.params.subscribe(params => {
      this.action = params["action"];
      this.id = params["id"];
      if (this.action === "post") {
        this.varr = "Comenzar post...";
      }
      if (this.action === "comentar") {
        this.varr = "Comenzar comentario...";
      }
      if (this.action === "PM") {
        this.varr = "Comenzar post...";
      }
    });
  }

  ngOnInit() {}

  enviar(action: string) {
    if (this.text.length === 0) {
      return;
    }
    console.log(this.archivos.length);

    if (action === "post") {
      if (this.archivos.length === 0) {
        this.start = this.text.indexOf("#");
        this.end = this.text.indexOf(" ", this.start);
        this.array = [];
        if (this.start >= 0) {
          this.array[0] = this.text.substring(0, this.start);
          if (this.end === -1) {
            this.array[1] = this.text.substring(this.start);
            this.array[2] = "";
          } else {
            this.array[1] = this.text.substring(this.start, this.end);
            this.array[2] = this.text.substring(this.end);
          }
        } else {
          this.array = [this.text.substring(0), "", ""];
        }

        this._ds
          .add2Post(this.text, this.array[0], this.array[1], this.array[2])
          .then(() => {
            this.text = "";
            this.array = [];
          })
          .catch(err => console.error("Error al enviar", err));
      } else {
        // this._ds.addImgPost(this.archivos, this.text);
        // this.text = "";
        // this.archivos = [];
      }
    }

    if (action === "comentar") {
      if (this.archivos.length === 0) {
        this.start = this.text.indexOf("#");
        this.end = this.text.indexOf(" ", this.start);
        this.array = [];
        if (this.start >= 0) {
          this.array[0] = this.text.substring(0, this.start);
          if (this.end === -1) {
            this.array[1] = this.text.substring(this.start);
            this.array[2] = "";
          } else {
            this.array[1] = this.text.substring(this.start, this.end);
            this.array[2] = this.text.substring(this.end);
          }
        } else {
          this.array = [this.text.substring(0), "", ""];
        }
        this._ds.updateTotalComents(this.id);

        this._ds
          .add2Coment(
            this.text,
            this.id,
            this.array[0],
            this.array[1],
            this.array[2]
          )
          .then(() => {
            this.text = "";
            this.array = [];
          })
          .catch(err => console.error("Error al enviar", err));

        // this._ds
        //   .add2Coment(this.text, this.id)
        //   .then(() => (this.text = ""))
        //   .catch(err => console.error("Error al enviar", err));
      } else {
        this._ds.addImgComent(this.archivos, this.text, this.id);
        this.text = "";
        this.archivos = [];
      }
    }

    if (action === "PM") {
      // this._ds
      //   .add2Post(this.text)
      //   .then(() => (this.text = ""))
      //   .catch(err => console.error("Error al enviar", err));
    }
  }

  cargarImagenes() {
    // this._cargaImagenes.cargarImagenesFirebase(this.archivos);
  }

  limpiarArchivos() {
    this.archivos = [];
  }
}
