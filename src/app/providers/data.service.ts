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
import { createContentChild } from "@angular/compiler/src/core";
import { isProtractorLocator } from "protractor/built/locators";

export interface Usuario {
  nombre: string;
  fecha: number;
  usuario_id: string;
  email?: string;
  password?: string;
  photoURL: string;
}
export interface Post {
  nombre: string;
  mensaje: string;
  fecha: number;
  usuario_id: string;
  post_id?: string;
  postId?: string;
  start: string;
  value: string;
  end: string;
  totalComentarios?: number;
  totalLikes?: number;
  totalImages: number;
  topic: string;
  imgGroupTitle: string;
  photoURL: string;
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
  photoURL: string;
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
  userId: string;
  nombre: string;
  url: string;
  active: boolean;
  title: string;
  payLink: boolean;
  saveImg: boolean;
  selected: boolean;
  index: number;
}
export interface CallToAction {
  postId: string;
  ownerId: string;
  title: string;
  active: boolean;
  totalReplies: number;
}
export interface Option {
  callId: string;
  active: boolean;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  option5: string;
}

export interface Selection {
  postId: string;
  callId1: string;
  callId2: string;
  callId3: string;
  userId: string;
  value1: string;
  value2: string;
  value3: string;
}
export interface NotificationAction {
  postId: string;
  ownerId: string;
  userId: string;
  title1: string;
  title2: string;
  title3: string;
  value1: string;
  value2: string;
  value3: string;
}
export interface OwnerNotification {
  ownerId: string;
  totalReactions: number;
}
export interface ClientNotification {
  postId: string;
  ownerId: string;
  clientId: string;
  title1: string;
  title2: string;
  title3: string;
  value1: string;
  value2: string;
  value3: string;
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
  userId: any;
  postId: string;

  postGuardadoId: any;

  private usuariosCollection: AngularFirestoreCollection;
  private postsCollection: AngularFirestoreCollection<Post>;
  private comentariosCollection: AngularFirestoreCollection<Comentario>;
  private likesCollection: AngularFirestoreCollection<Like>;
  private savePostIdCollection: AngularFirestoreCollection;
  private savePostCollection: AngularFirestoreCollection;
  private imgCollection: AngularFirestoreCollection<Imagen>;
  private callToActionCollection: AngularFirestoreCollection<CallToAction>;
  private optionCollection: AngularFirestoreCollection<Option>;
  private selectionCollection: AngularFirestoreCollection<Selection>;
  private clientNotificationCollection: AngularFirestoreCollection<
    ClientNotification
  >;
  private ownerNotificationCollection: AngularFirestoreCollection<
    OwnerNotification
  >;

  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    public afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe(user => {
      if (!user) {
        return;
      }
      console.log("HOOOOOOLAAAA");
      console.log(user);

      this.usr = {
        nombre: user.displayName,
        fecha: new Date().getTime(),
        usuario_id: user.uid,
        photoURL: user.photoURL
      };
      this.userId = user.uid;

      this.afs.doc("usuarios/" + this.userId).set(this.usr);
      // .catch(error => {
      //   this.afs.doc("usuarios/" + this.uid).set(this.usr);
      // });
    });
  }

  // ----------------------------------------------------
  //            AUTENTIFICACION
  // ----------------------------------------------------

  login(proveedor: string) {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
    // this.afs
    //   .doc("usuarios/" + this.uid)
    //   .update({ active: false })
    //   .then(() => {
    //     console.log("si pasoo");

    //     this.usuarios = null;
    //     // this.afAuth.auth.signOut();
    //   });
  }

  // ----------------------------------------------------
  //                ADD
  // ----------------------------------------------------

  addUser() {
    const usuario: Usuario = {
      nombre: this.usr.nombre,
      fecha: this.usr.fecha,
      usuario_id: this.usr.usuario_id,
      photoURL: this.usr.photoURL
    };
    this.afs.collection("usuarios").add(usuario);
  }

  addPost(
    payLink,
    saveImg,
    mensaje: string,
    imgGroupTitle,
    start,
    value,
    end,
    archivo,
    titleA,
    titleB,
    titleC,
    optionsA,
    optionsB,
    optionsC,
    topic,
    keyOne,
    keyTwo
  ) {
    const post: Post = {
      nombre: this.usr.nombre,
      mensaje: mensaje,
      fecha: new Date().getTime(),
      usuario_id: this.usr.usuario_id,
      start: start,
      value: value,
      end: end,
      totalComentarios: 0,
      totalLikes: 0,
      totalImages: 0,
      topic: "",
      imgGroupTitle: "",
      photoURL: this.usr.photoURL
    };

    this.postId = this.afs.createId();
    if (keyOne === "IMAGEN") {
      post.imgGroupTitle = imgGroupTitle;
      this.addImgPost(archivo, this.postId, imgGroupTitle, payLink, saveImg);
    }
    if (keyTwo === "CALL_TO_ACTION") {
      post.topic = topic;
      this.addNotificationByOwner();
      if (titleA !== "") {
        this.addCallToActionByPost(this.postId, titleA, optionsA);
      }
      if (titleB !== "") {
        this.addCallToActionByPost(this.postId, titleB, optionsB);
      }
      if (titleC !== "") {
        this.addCallToActionByPost(this.postId, titleC, optionsC);
      }
    }
    return this.afs
      .collection("posts")
      .doc(this.postId)
      .set(post);
  }

  savePostId(id: string) {
    const savePost: SavePost = {
      postId: id,
      usuario_id: this.usr.usuario_id
    };
    return this.afs.collection("posts_guardados").add(savePost);
  }

  addComent(
    payLink,
    saveImg,
    mensaje: string,
    imgTitle: string,
    postId: string,
    start,
    value,
    end,
    action,
    archivo
  ) {
    const comentario: Comentario = {
      nombre: this.usr.nombre,
      mensaje: mensaje,
      fecha: new Date().getTime(),
      usuario_id: this.usr.usuario_id,
      post_id: postId,
      start: start,
      value: value,
      end: end,
      photoURL: this.usr.photoURL
    };
    const comentId = this.afs.createId();
    if (action === "IMAGEN") {
      this.addImgComent(archivo, comentId, imgTitle, payLink, saveImg);
    }
    return this.afs
      .collection("comentarios")
      .doc(comentId)
      .set(comentario);
  }

  addLikeByPost(postId: string) {
    const like: Like = {
      nombre: this.usr.nombre,
      usuario_id: this.usr.usuario_id,
      post_id: postId
    };
    return this.afs.collection("likes").add(like);
  }

  addLikeByComent(comentId: string) {
    const like: Like = {
      nombre: this.usr.nombre,
      usuario_id: this.usr.usuario_id,
      post_id: comentId
    };
    return this.afs.collection("likes").add(like);
  }

  addCallToActionByPost(postId, title, options) {
    const action: CallToAction = {
      active: false,
      title: title,
      ownerId: this.usr.usuario_id,
      postId: postId,
      totalReplies: 0
    };
    const callId = this.afs.createId();
    this.addOption(callId, options);
    return this.afs
      .collection("call_to_actions")
      .doc(callId)
      .set(action);
  }

  addOption(callId, options) {
    const option: Option = {
      active: false,
      callId: callId,
      option1: options[0],
      option2: options[1],
      option3: options[2],
      option4: options[3],
      option5: options[4]
    };
    this.afs.collection("options").add(option);
  }

  addNotificationByOwner() {
    const notification: OwnerNotification = {
      ownerId: this.usr.usuario_id,
      totalReactions: 0
    };
    this.afs.collection("owner_notifications").add(notification);
  }

  addNotificationByClient(postId, ownerId, titles, values) {
    const selection: ClientNotification = {
      postId: postId,
      ownerId: ownerId,
      clientId: this.usr.usuario_id,
      title1: "",
      title2: "",
      title3: "",
      value1: "",
      value2: "",
      value3: ""
    };
    let contador = 0;
    for (const callId of titles) {
      if (contador === 0) {
        selection.title1 = titles[contador];
        selection.value1 = values[contador];
      } else if (contador === 1) {
        selection.title2 = titles[contador];
        selection.value2 = values[contador];
      } else {
        selection.title3 = titles[contador];
        selection.value3 = values[contador];
      }
      contador += 1;
    }
    return this.afs.collection("client_notifications").add(selection);
  }

  addSelectionByPost(postId, callIds, values) {
    const selection: Selection = {
      userId: this.usr.usuario_id,
      postId,
      callId1: "",
      callId2: "",
      callId3: "",
      value1: "",
      value2: "",
      value3: ""
    };
    let contador = 0;
    for (const callId of callIds) {
      if (contador === 0) {
        selection.callId1 = callIds[contador];
        selection.value1 = values[contador];
      } else if (contador === 1) {
        selection.callId2 = callIds[contador];
        selection.value2 = values[contador];
      } else {
        selection.callId3 = callIds[contador];
        selection.value3 = values[contador];
      }
      contador += 1;
    }
    return this.afs.collection("selections").add(selection);
  }

  // ----------------------------------------------------
  //                GETS
  // ----------------------------------------------------

  getOwnerAction() {
    this.callToActionCollection = this.afs.collection<CallToAction>(
      "notificaciones",
      ref => ref.where("ownwerId", "==", this.usr.usuario_id)
    );
    return this.callToActionCollection.snapshotChanges().map(docArray => {
      return docArray.map(doc => {
        return {
          id: doc.payload.doc.id,
          ...doc.payload.doc.data()
        };
      });
    });
  }

  clickRayo() {
    // creo documento con uid y ownerId, actualizo contador
    // .then(()=>)
    this.getUserAction("hola").subscribe(id => {
      this.postsCollection = this.afs.collection<Post>("posts", ref =>
        ref.where("ownwerId", "==", id)
      );
    });
  }
  clickNuevoPost(postId, title, pool) {
    this.addCallToActionByPost(postId, title, pool);
    // creo documento con ownerId y contador .then(()=>)
    // obtengo la data filtrada por ownerId
    // y quedo atento a
    // cambios en el contador
  }

  getUserAction(ownerId) {
    this.postsCollection = this.afs.collection<Post>("posts", ref =>
      ref.where("userId", "==", ownerId)
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

  getUsers() {
    this.usuariosCollection = this.afs.collection<Usuario>("usuarios");
    return this.usuariosCollection.snapshotChanges().map(docArray => {
      return docArray.map(doc => {
        return {
          id: doc.payload.doc.id,
          ...doc.payload.doc.data()
        };
      });
    });
  }

  getPosts() {
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

  getBestPosts() {
    this.postsCollection = this.afs.collection<Post>("posts", ref =>
      ref.where("totalComentarios", ">", 5)
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

  getSavePostId() {
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

  getSavePosts() {
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
            if (post.usuario_id === this.userId) {
              postGuardado.push(post);
            }
          }
        }
      }
      return postGuardado;
    });
  }

  getComents() {
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

  getLikes() {
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
        if (like.usuario_id !== this.userId) {
          data.push(like);
        }
      }
      for (const like of likes) {
        if (like.usuario_id === this.userId) {
          data.push(like);
        }
      }
      return data;
    });
  }

  getImgs() {
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

  getActions() {
    this.callToActionCollection = this.afs.collection<CallToAction>(
      "call_to_actions"
    );
    return this.callToActionCollection.snapshotChanges().map(docArray => {
      return docArray.map(doc => {
        return {
          id: doc.payload.doc.id,
          ...doc.payload.doc.data()
        };
      });
    });
  }

  getOptions() {
    this.optionCollection = this.afs.collection<Option>("options");
    return this.optionCollection.snapshotChanges().map(docArray => {
      return docArray.map(doc => {
        return {
          id: doc.payload.doc.id,
          ...doc.payload.doc.data()
        };
      });
    });
  }

  getClientNotifications() {
    this.clientNotificationCollection = this.afs.collection<ClientNotification>(
      "client_notifications",
      ref => ref.where("clientId", "==", this.usr.usuario_id)
    );
    return this.clientNotificationCollection.snapshotChanges().map(docArray => {
      return docArray.map(doc => {
        return {
          id: doc.payload.doc.id,
          ...doc.payload.doc.data()
        };
      });
    });
  }

  getOwnerNotifications() {
    console.log(this.usr.usuario_id);

    this.ownerNotificationCollection = this.afs.collection<OwnerNotification>(
      "owner_notifications",
      ref => ref.where("ownerId", "==", this.usr.usuario_id)
    );
    return this.ownerNotificationCollection.snapshotChanges().map(docArray => {
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
  updateOption(optionId: string, flag: boolean) {
    this.afs.doc("pool/" + optionId).update({ active: flag });
  }
  updateSelectedImg(imgId: string, flag: boolean) {
    this.afs.doc("imagenes/" + imgId).update({ selected: flag });
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
            if (isNaN(item.totalComentarios)) {
              contador = 1;
            } else {
              contador = item.totalComentarios + 1;
            }
            this.afs
              .doc("posts/" + postId)
              .update({ totalComentarios: contador });
          }
        }
      });
  }

  updateTotaLikes(postId: string, key) {
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
            if (key === "add") {
              contador = item.totalLikes + 1;
            } else {
              contador = item.totalLikes - 1;
            }
            this.afs.doc("posts/" + postId).update({ totalLikes: contador });
          }
        }
      });
  }

  // updadteTotalImages() {
  //   this.postsCollection = this.afs.collection<Post>("posts", ref =>
  //   ref.where("postId", "==", this.postId));
  //   this.postsCollection
  //     .valueChanges()
  //     .pipe(take(1))
  //     .subscribe(post => {
  //       let contador: number;
  //       contador = post.totalLikes + 1;
  //           this.afs
  //             .doc("posts/" + this.postId)
  //             .update({ totalComentarios: contador });

  //     });
  // }

  updateTotalImages(total) {
    this.afs.doc("posts/" + this.postId).update({ totalImages: total });
  }

  // ----------------------------------------------------
  //           CARGA DE IMAGENES
  // ----------------------------------------------------

  addImgPost(imagenes: FileItem[], postId, imgTitle, payLink, saveImg) {
    let contador = 0;
    for (const item of imagenes) {
      const path = `imagenes/${new Date().getTime()}_${item.nombreArchivo}`;
      const task = this.storage.upload(path, item.archivo).then(() => {
        const ref = this.storage.ref(path);
        const downloadURL = ref.getDownloadURL().subscribe(url => {
          item.url = url;
          contador += 1;
          this.guardarImagenPost({
            postId: postId,
            nombre: item.nombreArchivo,
            url: item.url,
            title: imgTitle,
            active: false,
            payLink,
            saveImg,
            userId: this.usr.usuario_id,
            selected: false,
            index: contador
          });
        });
      });
    }
  }

  guardarImagenPost(imagen: Imagen) {
    this.afs.collection("imagenes").add(imagen);
  }

  addImgComent(
    imagenes: FileItem[],
    comentId: string,
    imgTitle,
    payLink,
    saveImg
  ) {
    let contador = 0;
    for (const item of imagenes) {
      const path = `imagenes/${new Date().getTime()}_${item.nombreArchivo}`;
      const task = this.storage.upload(path, item.archivo).then(() => {
        const ref = this.storage.ref(path);
        const downloadURL = ref.getDownloadURL().subscribe(url => {
          item.url = url;
          contador += 1;
          this.guardarImagenComent({
            comentId: comentId,
            nombre: item.nombreArchivo,
            url: item.url,
            title: imgTitle,
            active: false,
            payLink,
            saveImg,
            userId: this.usr.usuario_id,
            selected: false,
            index: contador
          });
        });
      });
    }
  }

  guardarImagenComent(imagen: Imagen) {
    this.afs.collection("imagenes").add(imagen);
  }
}
