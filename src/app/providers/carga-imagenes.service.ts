import { Injectable } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import {
  AngularFireStorage,
  AngularFireUploadTask
} from "angularfire2/storage";
import { FileItem } from "../models/file-item";
import { Observable } from "rxjs/Observable";

@Injectable({
  providedIn: "root"
})
export class CargaImagenesService {

  task: AngularFireUploadTask;

  constructor(
    private storage: AngularFireStorage,
    private db: AngularFirestore
  ) {}

  cargarImagenesFirebase(imagenes: FileItem[]) {
    for (const item of imagenes) {
      const path = `imagenes/${new Date().getTime()}_${item.nombreArchivo}`;

      const task = this.storage.upload(path, item.archivo).then(() => {
        const ref = this.storage.ref(path);
        const downloadURL = ref.getDownloadURL().subscribe(url => {
          item.url = url;
          this.guardarImagen({
            nombre: item.nombreArchivo,
            url: item.url
          });
        });
      });
    }
  }

  private guardarImagen(imagen: { nombre: string; url: string }) {
    console.log(imagen);
    this.db.collection("imagenes").add(imagen);
  }
}
