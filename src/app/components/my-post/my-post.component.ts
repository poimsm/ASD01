import { Component, OnInit } from "@angular/core";
import { PostService } from "../../providers/post.service";
import { DataService } from "../../providers/data.service";
import { ActivatedRoute } from "@angular/router";
import { CargaImagenesService } from "../../providers/carga-imagenes.service";
import { FileItem } from "../../models/file-item";
declare var jQuery: any;
declare var $: any;

@Component({
  selector: "app-my-post",
  templateUrl: "./my-post.component.html",
  styleUrls: ["./my-post.component.css"]
})
export class MyPostComponent implements OnInit {
  text = "";
  holder = "";
  topyc = "Solicitar compra";
  topic = "Solicitar compra";
  groupTitle = "";
  keyOne = "";
  keyTwo = "";
  showActions: boolean;
  showTimeOffers: boolean;
  enviado = false;
  showUpload = false;
  payLink = false;
  saveImg = false;
  imgReady = false;
  showGallery = false;
  showGalleryBtn = true;
  showImgOptions = false;
  showSteps = false;
  showBtn = true;
  flagComent = false;
  step = 1;
  array = [];
  id: string;
  action: string;
  start: number;
  end: number;
  imagenes: any;
  sumOptionA = 2;
  sumOptionB = 0;
  sumOptionC = 0;
  callToAction = 1;

  actionSelected = false;
  optionA = true;
  optionB = false;
  optionC = false;
  optionAbtn = true;
  optionBbtn = false;
  optionCbtn = false;
  estaSobreElemento = false;
  archivos: FileItem[] = [];

  poolA = [];
  poolB = [];
  poolC = [];

  titleA = "";
  optionA1 = "";
  optionA2 = "";
  optionA3 = "";
  optionA4 = "";
  optionA5 = "";

  titleB = "";
  optionB1 = "";
  optionB2 = "";
  optionB3 = "";
  optionB4 = "";
  optionB5 = "";

  titleC = "";
  optionC1 = "";
  optionC2 = "";
  optionC3 = "";
  optionC4 = "";
  optionC5 = "";

  constructor(
    public _cargaImagenes: CargaImagenesService,
    public _ds: DataService,
    private activatedRouter: ActivatedRoute
  ) {
    this.activatedRouter.params.subscribe(params => {
      this.action = params["action"];
      this.id = params["id"];
      if (this.action === "post") {
        this.holder = "Comenzar post...";
      }
      if (this.action === "comentar") {
        this.flagComent = true;
        this.holder = "Escribe un comentario";
      }
      if (this.action === "PM") {
        this.holder = "Comenzar post...";
      }
    });

    this._ds.getImgs().subscribe(x => (this.imagenes = x));
  }

  ngOnInit() {
    $(document)
      .one("focus.autoExpand", "textarea.autoExpand", function() {
        const savedValue = this.value;
        this.value = "";
        this.baseScrollHeight = this.scrollHeight;
        this.value = savedValue;
      })
      .on("input.autoExpand", "textarea.autoExpand", function() {
        const minRows = 1;
        this.rows = minRows;
        const rows = Math.ceil(
          (this.scrollHeight - this.baseScrollHeight) / 25
        );
        this.rows = minRows + rows;
      });
  }

  sumador(key) {
    if (key === "sumOptionA") {
      this.sumOptionA += 1;
    }
    if (key === "sumOptionB") {
      this.sumOptionB += 1;
    }
    if (key === "sumOptionC") {
      this.sumOptionC += 1;
    }
    if (key === "callToAction") {
      this.callToAction += 1;
    }
  }

  enviar(action: string) {
    if (this.text.length === 0) {
      return;
    }
    this.sendActions();
    this.start = this.text.indexOf("$");
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
    if (this.archivos.length > 0) {
      this.keyOne = "IMAGEN";
    }

    if (action === "post") {
      this._ds
        .addPost(
          this.payLink,
          this.saveImg,
          this.text,
          this.groupTitle,
          this.array[0],
          this.array[1],
          this.array[2],
          this.archivos,
          this.titleA,
          this.titleB,
          this.titleC,
          this.poolA,
          this.poolB,
          this.poolC,
          this.topic,
          this.keyOne,
          this.keyTwo
        )
        .then(() => {
          this._ds.updateTotalImages(this.archivos.length);
          this._ds.postId = "";
          this.archivos = [];
          this.text = "";
          this.array = [];
          this.keyOne = "";
          this.groupTitle = "";
          this.imgReady = false;
          this.enviado = true;
          this.titleA = "";
          this.titleB = "";
          this.titleC = "";
          this.optionA1 = "";
          this.optionA2 = "";
          this.optionA3 = "";
          this.optionA4 = "";
          this.optionA5 = "";
          this.optionB1 = "";
          this.optionB2 = "";
          this.optionB3 = "";
          this.optionB4 = "";
          this.optionB5 = "";
          this.optionC1 = "";
          this.optionC2 = "";
          this.optionC3 = "";
          this.optionC4 = "";
          this.optionC5 = "";
        });
    }

    if (action === "comentar") {
      this._ds.updateTotalComents(this.id);
      this._ds
        .addComent(
          this.payLink,
          this.saveImg,
          this.text,
          this.groupTitle,
          this.id,
          this.array[0],
          this.array[1],
          this.array[2],
          this.keyOne,
          this.archivos
        )
        .then(() => {
          this.text = "";
          this.array = [];
          this.keyOne = "";
          this.groupTitle = "";
          this.imgReady = false;
        });
    }

    if (action === "PM") {
    }
  }

  sendActions() {
    this.poolA = [
      this.optionA1,
      this.optionA2,
      this.optionA3,
      this.optionA4,
      this.optionA5
    ];
    this.poolB = [
      this.optionB1,
      this.optionB2,
      this.optionB3,
      this.optionB4,
      this.optionB5
    ];
    this.poolC = [
      this.optionC1,
      this.optionC2,
      this.optionC3,
      this.optionC4,
      this.optionC5
    ];

    if (this.check(this.poolA)) {
      this.actionSelected = true;
      this.keyTwo = "CALL_TO_ACTION";
    } else if (this.check(this.poolB)) {
      this.actionSelected = true;
      this.keyTwo = "CALL_TO_ACTION";
    } else if (this.check(this.poolC)) {
      this.actionSelected = true;
      this.keyTwo = "CALL_TO_ACTION";
    } else {
      this.actionSelected = false;
      this.keyTwo = "";
    }
  }
  check(callAction): boolean {
    let dirty = false;
    for (const option of callAction) {
      if (option !== "") {
        dirty = true;
        console.log(option);
        console.log("PASO");
      }
    }
    return dirty;
  }

  cargarImagenes() {}

  selection(id, toggle) {
    if (toggle === "selected") {
      this._ds.updateSelectedImg(id, true);
    } else {
      this._ds.updateSelectedImg(id, false);
    }
  }
  topycToggle() {
    if (this.topyc === "Crear encuesta") {
      this.topic = "Solicitar compra";
      this.topyc = "Solicitar compra";
    } else {
      this.topyc = "Crear encuesta";
      this.topic = "Completar encuesta";
    }
  }
  limpiarArchivos() {
    this.archivos = [];
  }
}
