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
// import { Observable } from "rxjs";
import "rxjs/add/operator/map";

import { take } from "rxjs/operators";
import { AngularFireAuth } from "angularfire2/auth";
import { firebase } from "@firebase/app";

export interface Usuario {
  nombre: string;
  fecha: number;
  userId: string;
  email?: string;
  password?: string;
  photoURL: string;
  lastPostTime?: number;
  firstPostTime?: number;
  TotalSavePosts?: number;
}
export interface Post {
  nombre: string;
  mensaje: string;
  fecha: number;
  userId: string;
  postId: string;
  start: string;
  value: string;
  end: string;
  totalComentarios: number;
  totalLikes: number;
  totalImages: number;
  topic: string;
  imgGroupTitle: string;
  photoURL: string;
  totalComentarios_fecha: string;
}
export interface SavePost {
  nombre: string;
  mensaje: string;
  fecha: number;
  userId: string;
  saveUserId: string;
  postId: string;
  start: string;
  value: string;
  end: string;
  totalComentarios: number;
  totalLikes: number;
  totalImages: number;
  topic: string;
  imgGroupTitle: string;
  photoURL: string;
  saveUserId_Time: string;
}
export interface Comentario {
  nombre: string;
  mensaje: string;
  fecha: number;
  userId: string;
  postId: string;
  comentId?: string;
  start?: string;
  value?: string;
  end?: string;
  photoURL: string;
}
export interface Like {
  nombre: string;
  userId: string;
  postId: string;
  comentId?: string;
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
  postId: string;
  ownerId_postId: string;
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
  private savedPostCollection: AngularFirestoreCollection<SavePost>;
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
      this.usr = {
        nombre: user.displayName,
        fecha: new Date().getTime(),
        userId: user.uid,
        photoURL: user.photoURL
      };
      this.userId = user.uid;

      this.afs.doc("usuarios/" + this.userId).set(this.usr);
      this.savedPostInit(user.uid).subscribe();
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
      userId: this.usr.userId,
      photoURL: this.usr.photoURL
    };
    this.afs.collection("usuarios").add(usuario);
  }

  addPost(
    payLink,
    saveImg,
    mensaje,
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
    const fecha = new Date().getTime();
    this.postId = this.afs.createId();
    const post: Post = {
      nombre: this.usr.nombre,
      mensaje: mensaje,
      fecha: fecha,
      userId: this.usr.userId,
      postId: this.postId,
      start: start,
      value: value,
      end: end,
      totalComentarios: 0,
      totalLikes: 0,
      totalImages: 0,
      topic: "",
      imgGroupTitle: "",
      photoURL: this.usr.photoURL,
      totalComentarios_fecha: "0_" + fecha
    };

    if (keyOne === "IMAGEN") {
      post.imgGroupTitle = imgGroupTitle;
      this.addImgPost(archivo, this.postId, imgGroupTitle, payLink, saveImg);
    }
    if (keyTwo === "CALL_TO_ACTION") {
      post.topic = topic;
      this.addNotificationByOwner(this.postId);
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

  // savePostId(id: string) {
  //   const savePost: SavePost = {
  //     postId: id,
  //     userId: this.usr.userId
  //   };
  //   return this.afs.collection("posts_guardados").add(savePost);
  // }

  addSavePost(PostArray, date) {
    const fecha = 2553476400000 - date;
    const PostObj = {
      saveUserId: this.usr.userId,
      saveUserId_Time: this.usr.userId + "_" + fecha
    };
    const savePost: SavePost = Object.assign(PostObj, ...PostArray);
    return this.afs.collection("saved_posts").add(savePost);
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
      userId: this.usr.userId,
      postId: postId,
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
      userId: this.usr.userId,
      postId: postId
    };
    return this.afs.collection("likes").add(like);
  }

  addLikeByComent(comentId: string) {
    const like: Like = {
      nombre: this.usr.nombre,
      userId: this.usr.userId,
      postId: comentId
    };
    return this.afs.collection("likes").add(like);
  }

  addCallToActionByPost(postId, title, options) {
    const action: CallToAction = {
      active: false,
      title: title,
      ownerId: this.usr.userId,
      postId: postId,
      totalReplies: 0
    };
    const callId = this.afs.createId();
    this.addOption(callId, options);
    return this.afs
      .collection("calls_to_action")
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

  addNotificationByOwner(postId) {
    const notification: OwnerNotification = {
      ownerId: this.usr.userId,
      postId: postId,
      ownerId_postId: this.usr.userId + "_" + postId,
      totalReactions: 0
    };
    this.afs.collection("owner_notifications").add(notification);
  }

  addNotificationByClient(postId, ownerId, titles, values) {
    const selection: ClientNotification = {
      postId: postId,
      ownerId: ownerId,
      clientId: this.usr.userId,
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
    this.afs
      .collection("client_notifications")
      .add(selection)
      .then(() => {
        this.updateNotificationByOwner(ownerId, postId);
      });
  }

  addNotificationByClient2(postId, ownerId, titles, values) {
    const selection: ClientNotification = {
      postId: postId,
      ownerId: ownerId,
      clientId: this.usr.userId,
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
      userId: this.usr.userId,
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
      ref => ref.where("ownwerId", "==", this.usr.userId)
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

  savedPostInit(uid) {
    const usuario: any = this.afs.doc("usuarios/" + uid);
    return usuario.valueChanges().map(doc => {
      const targetDate = new Date(2050, 11);
      const futureTime = targetDate.getTime();
      if (doc.totalSavedPost === undefined) {
        const startTime = {
          saveUserId_Time: uid + "_0000000000000"
        };
        const endTime = {
          saveUserId_Time: uid + "_2553476400000"
        };
        this.afs.collection("saved_posts").add(startTime);
        this.afs.collection("saved_posts").add(endTime);
        this.afs.doc("usuarios/" + uid).update({
          totalSavedPost: "Inicializado"
        });
      }
    });
  }

  getSavedPosts() {
    this.savedPostCollection = this.afs.collection<SavePost>(
      "saved_posts",
      ref =>
        ref
          .orderBy("saveUserId_Time")
          .startAfter(this.usr.userId + "_0000000000000")
          .endBefore(this.usr.userId + "_2553476400000")
          .limit(4)
    );
    return this.savedPostCollection.snapshotChanges().map(docArray => {
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
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() - 1);
    const yesterday = targetDate.getTime();
    console.log("Fecha", yesterday);

    this.postsCollection = this.afs.collection<Post>("posts", ref =>
      ref.where("fecha", ">", yesterday)
    );
    return this.postsCollection.snapshotChanges().map(docArray => {
      const posts: any = docArray.map(doc => {
        return {
          id: doc.payload.doc.id,
          ...doc.payload.doc.data()
        };
      });
      const BestPosts = [];
      for (const post of posts) {
        if (post.totalComentarios > 1) {
          BestPosts.push(post);
        }
      }
      return BestPosts;
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
        if (like.userId !== this.userId) {
          data.push(like);
        }
      }
      for (const like of likes) {
        if (like.userId === this.userId) {
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
      "calls_to_action"
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
      ref => ref.where("clientId", "==", this.usr.userId)
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

  getOwnerNotifications(ownerId) {
    this.ownerNotificationCollection = this.afs.collection<OwnerNotification>(
      "owner_notifications",
      ref => ref.where("ownerId", "==", ownerId)
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
  updateNotificationByOwner(ownerId, postId) {
    this.ownerNotificationCollection = this.afs.collection<OwnerNotification>(
      "owner_notifications",
      ref => ref.where("ownerId_postId", "==", ownerId + "_" + postId)
    );
    this.ownerNotificationCollection
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
      .subscribe(notes => {
        let contador: number;
        for (const item of notes) {
          contador = item.totalReactions + 1;
          this.afs.doc("owner_notifications/" + item.id).update({
            totalReactions: contador
          });
        }
      });
  }

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
            const contadorInverso = 10000 - contador;
            this.afs.doc("posts/" + postId).update({
              totalComentarios: contador,
              totalComentarios_fecha: contadorInverso + "_" + item.fecha
            });
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
            userId: this.usr.userId,
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
            userId: this.usr.userId,
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
