import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "angularfire2/firestore";
// import "rxjs/add/operator/flatMap";
// import "rxjs/add/operator/mergeMap";

import {
  AngularFireStorage,
  AngularFireUploadTask
} from "angularfire2/storage";
import { FileItem } from "../models/file-item";
import { Observable } from "rxjs";
import "rxjs/add/operator/map";

import { take } from "rxjs/operators";
import { AngularFireAuth } from "angularfire2/auth";
import { firebase } from "@firebase/app";

export interface Usuario {
  nombre: string;
  fecha: number;
  active: boolean;
  usuario_id: string;
  email?: string;
  password?: string;
}
export interface Post {
  nombre: string;
  mensaje: string;
  fecha: number;
  usuario_id: string;
  post_id?: string;
  start: string;
  value: string;
  end: string;
  comentarios?: number;
}
export interface SavePost {
  postId: string;
  usuario_id: string;
}
export interface Comentario {
  nombre: string;
  mensaje: string;
  fecha: number;
  usuario_id: string;
  post_id: string;
  comentario_id?: string;
  start?: string;
  value?: string;
  end?: string;
}
export interface Like {
  nombre: string;
  usuario_id: string;
  post_id: string;
  comentario_id?: string;
  likepost?: boolean;
  like_id?: string;
}

export interface Imagen {
  postId?: string;
  comentId?: string;
  nombre: string;
  url: string;
  active: boolean;
}

@Injectable({
  providedIn: "root"
})
export class DataService {
  usr: Usuario;
  usuarios: any = [];
  posts: any = [];
  comentarios: any = [];
  likes: any = [];
  ob: any;
  uid: any;

  postGuardadoId: any;

  private usuariosCollection: AngularFirestoreCollection;
  private postsCollection: AngularFirestoreCollection<Post>;
  private comentariosCollection: AngularFirestoreCollection<Comentario>;
  private likesCollection: AngularFirestoreCollection<Like>;
  private savePostIdCollection: AngularFirestoreCollection;
  private savePostCollection: AngularFirestoreCollection;
  private imgCollection: AngularFirestoreCollection<Imagen>;

  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    public afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe(user => {
      if (!user) {
        return;
      }
      this.usr = {
        nombre: user.displayName,
        fecha: new Date().getTime(),
        usuario_id: user.uid,
        active: true
      };
      console.log("Usuario", this.usr);

      this.uid = user.uid;

      this.afs
        .doc("usuarios/" + this.uid)
        .update({ active: true })
        .then()
        .catch(error => {
          this.afs.doc("usuarios/" + this.uid).set(this.usr);
        });
    });

    // const id = this.afs.createId();
    // this.afs.collection("usuarios").add(this.usr);

    // const comentario: Comentario = {
    //   nombre: this.usr.nombre,
    //   mensaje: text,
    //   fecha: new Date().getTime(),
    //   usuario_id: this.usr.usuario_id,
    //   post_id: postId
    // };
    // this.afs
    //   .collection("comentarios")
    //   .doc(id)
    //   .set(comentario);
  }

  // ----------------------------------------------------
  //            AUTENTIFICACION
  // ----------------------------------------------------

  login(proveedor: string) {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afs
      .doc("usuarios/" + this.uid)
      .update({ active: false })
      .then(() => {
        console.log("si pasoo");

        this.usuarios = null;
        // this.afAuth.auth.signOut();
      });
  }

  // ----------------------------------------------------
  //                ADD
  // ----------------------------------------------------

  addUser() {
    // const usuario: Usuario = {
    //   nombre: this.usr.nombre,
    //   fecha: this.usr.fecha,
    //   usuario_id: this.usr.usuario_id
    // };
    // console.log(usuario);
    // return this.afs.collection("usuarios").add(usuario);
  }

  add2Post(mensaje: string, start, value, end) {
    const post: Post = {
      nombre: this.usr.nombre,
      mensaje: mensaje,
      fecha: new Date().getTime(),
      usuario_id: this.usr.usuario_id,
      start: start,
      value: value,
      end: end
    };
    return this.afs.collection("posts").add(post);
  }

  savePostId(id: string) {
    const savePost: SavePost = {
      postId: id,
      usuario_id: this.usr.usuario_id
    };
    return this.afs.collection("guardados").add(savePost);
  }

  add2Coment(mensaje: string, postId: string, start, value, end) {
    const comentario: Comentario = {
      nombre: this.usr.nombre,
      mensaje: mensaje,
      fecha: new Date().getTime(),
      usuario_id: this.usr.usuario_id,
      post_id: postId,
      start: start,
      value: value,
      end: end
    };
    return this.afs.collection("comentarios").add(comentario);
  }

  add2LikeByPost(postId: string) {
    const like: Like = {
      nombre: this.usr.nombre,
      usuario_id: this.usr.usuario_id,
      post_id: postId
    };
    return this.afs.collection("likes").add(like);
  }

  add2LikeByComent(comentId: string) {
    const like: Like = {
      nombre: this.usr.nombre,
      usuario_id: this.usr.usuario_id,
      post_id: comentId
    };
    return this.afs.collection("likes").add(like);
  }

  addComent(mensaje: string) {
    this.comentarios.comentario_id = this.afs.createId();
    const comentario: Comentario = {
      nombre: this.usr.nombre,
      mensaje: mensaje,
      fecha: new Date().getTime(),
      usuario_id: this.usr.usuario_id,
      post_id: this.posts.post_id,
      comentario_id: this.comentarios.comentario_id
    };
    return this.afs.collection("comentarios").add(comentario);
  }

  addLikeByPost(postId: string) {
    const likeId = this.afs.createId();
    const like: Like = {
      nombre: this.usr.nombre,
      usuario_id: this.usr.usuario_id,
      post_id: postId,
      like_id: likeId
    };
    return this.afs.collection("likes").add(like);
  }

  addLikeByComent() {
    const like: Like = {
      nombre: this.usr.nombre,
      usuario_id: this.usr.usuario_id,
      post_id: this.posts.post_id,
      comentario_id: this.comentarios.comentario_id
    };
    return this.afs.collection("likes").add(like);
  }

  // ----------------------------------------------------
  //                GETS
  // ----------------------------------------------------

  getUser() {
    this.usuariosCollection = this.afs.collection("usuarios", ref =>
      ref.orderBy("fecha", "desc").limit(5)
    );
    return this.usuariosCollection.valueChanges().map((usuarios: Usuario[]) => {
      this.usuarios = [];
      for (const usuario of usuarios) {
        this.usuarios.push(usuario);
      }
      return this.usuarios;
    });
  }

  get2Like() {
    this.likesCollection = this.afs.collection<Like>("likes");
    return this.likesCollection.snapshotChanges().map(docArray => {
      const likes = docArray.map(doc => {
        return {
          id: doc.payload.doc.id,
          ...doc.payload.doc.data()
        };
      });
      const data = [];
      for (const like of likes) {
        if (like.usuario_id !== this.uid) {
          data.push(like);
        }
      }
      for (const like of likes) {
        if (like.usuario_id === this.uid) {
          data.push(like);
        }
      }
      return data;
    });
  }

  getImg() {
    this.imgCollection = this.afs.collection<Imagen>("imagenes");
    return this.imgCollection.snapshotChanges().map(docArray => {
      return docArray.map(doc => {
        return {
          id: doc.payload.doc.id,
          ...doc.payload.doc.data()
        };
      });
    });
  }

  get2Post() {
    this.postsCollection = this.afs.collection<Post>("posts", ref =>
      ref.orderBy("fecha", "desc").limit(15)
    );
    return this.postsCollection.snapshotChanges().map(docArray => {
      return docArray.map(doc => {
        return {
          id: doc.payload.doc.id,
          ...doc.payload.doc.data()
        };
      });
    });
  }

  get2SavePostId() {
    this.savePostIdCollection = this.afs.collection<SavePost>("guardados");
    return this.savePostIdCollection.snapshotChanges().map(docArray => {
      this.postGuardadoId = docArray.map(doc => {
        return {
          id: doc.payload.doc.id,
          ...doc.payload.doc.data()
        };
      });
    });
  }

  get2SavePost() {
    this.savePostCollection = this.afs.collection<SavePost>("posts", ref =>
      ref.orderBy("fecha", "desc").limit(15)
    );
    return this.savePostCollection.snapshotChanges().map(docArray => {
      const savePosts: any = docArray.map(doc => {
        return {
          id: doc.payload.doc.id,
          ...doc.payload.doc.data()
        };
      });
      const postGuardado = [];
      for (const post of savePosts) {
        for (const postId of this.postGuardadoId) {
          if (post.id === postId.postId) {
            if (post.usuario_id === this.uid) {
              postGuardado.push(post);
            }
          }
        }
      }
      return postGuardado;
    });
  }

  get2Coment() {
    this.comentariosCollection = this.afs.collection<Comentario>(
      "comentarios",
      ref => ref.orderBy("fecha", "desc").limit(15)
    );
    return this.comentariosCollection.snapshotChanges().map(docArray => {
      return docArray.map(doc => {
        return {
          id: doc.payload.doc.id,
          ...doc.payload.doc.data()
        };
      });
    });
  }

  // ----------------------------------------------------
  //                DELETE
  // ----------------------------------------------------

  deleteLikePost(likeId: string) {
    this.afs.doc("likes/" + likeId).delete();
  }
  deletePost(postId: string) {
    this.afs.doc("posts/" + postId).delete();
  }

  // ----------------------------------------------------
  //                UPDATES
  // ----------------------------------------------------

  updateImg(imgId: string, flag: boolean) {
    this.afs.doc("imagenes/" + imgId).update({ active: flag });
  }

  updateTotalComents(postId: string) {
    this.postsCollection = this.afs.collection<Post>("posts");
    this.postsCollection
      .snapshotChanges()
      .map(docArray => {
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            ...doc.payload.doc.data()
          };
        });
      })
      .pipe(take(1))
      .subscribe(posts => {
        let contador: number;
        for (const item of posts) {
          if (item.id === postId) {
            if (isNaN(item.comentarios)) {
              contador = 1;
            } else {
              contador = item.comentarios + 1;
            }
            this.afs.doc("posts/" + postId).update({ comentarios: contador });
          }
        }
      });
  }

  // ----------------------------------------------------
  //           CARGA DE IMAGENES
  // ----------------------------------------------------

  addImgPost(imagenes: FileItem[], text: string) {
    const id = this.afs.createId();
    const post: any = {
      nombre: this.usr.nombre,
      mensaje: text,
      fecha: new Date().getTime(),
      usuario_id: this.usr.usuario_id
    };
    this.afs
      .collection("posts")
      .doc(id)
      .set(post);

    for (const item of imagenes) {
      const path = `imagenes/${new Date().getTime()}_${item.nombreArchivo}`;

      const task = this.storage.upload(path, item.archivo).then(() => {
        const ref = this.storage.ref(path);
        const downloadURL = ref.getDownloadURL().subscribe(url => {
          item.url = url;
          this.guardarImagenPost({
            postId: id,
            nombre: item.nombreArchivo,
            url: item.url,
            active: false
          });
        });
      });
    }
  }

  guardarImagenPost(imagen: Imagen) {
    this.afs.collection("imagenes").add(imagen);
  }

  addImgComent(imagenes: FileItem[], text: string, postId: string) {
    const id = this.afs.createId();
    const comentario: Comentario = {
      nombre: this.usr.nombre,
      mensaje: text,
      fecha: new Date().getTime(),
      usuario_id: this.usr.usuario_id,
      post_id: postId
    };
    this.afs
      .collection("comentarios")
      .doc(id)
      .set(comentario);

    for (const item of imagenes) {
      const path = `imagenes/${new Date().getTime()}_${item.nombreArchivo}`;

      const task = this.storage.upload(path, item.archivo).then(() => {
        const ref = this.storage.ref(path);
        const downloadURL = ref.getDownloadURL().subscribe(url => {
          item.url = url;
          this.guardarImagenComent({
            comentId: id,
            nombre: item.nombreArchivo,
            url: item.url,
            active: false
          });
        });
      });
    }
  }

  guardarImagenComent(imagen: Imagen) {
    this.afs.collection("imagenes").add(imagen);
  }
}
